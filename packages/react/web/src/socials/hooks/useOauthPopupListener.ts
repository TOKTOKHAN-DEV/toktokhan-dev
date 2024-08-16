import { useCallback, useEffect, useState } from 'react'

import { useCallbackRef } from '@toktokhan-dev/react-universal'
import { isNullish } from '@toktokhan-dev/universal'

import { OauthResponse, useOauthCallbackParams } from '../types/callback'

export interface ExtraState<T> {
  extra: T
}

/**
 * @category Socials
 *
 * OAuth 팝업에서 전달된 메시지를 수신하는 React Hook입니다.
 * 이 Hook은 OAuth 인증 후 팝업에서 전달된 메시지를 수신하여 처리합니다.
 *
 * @returns - OAuth 응답 데이터와 로딩 상태를 반환합니다.
 * @returns data - OAuth 응답 데이터입니다. 초기값은 `null`입니다. `useOauthPopupCallback` 애서 `closePopup` 함수에서 인자로 추가적인 데이터를 전달했다면, extra 프로퍼티에 추가적인 데이터가 포함됩니다.
 * @returns isLoading - OAuth 콜백 처리 상태를 나타냅니다. 처리 중이면 `true`, 아니면 `false`입니다.
 *
 * @example
 * ```tsx
 * // pages/login.tsx (parents window)
 *
 * const kakao = new Kakao(ENV.CLIENT_ID)
 * const Login = () => {
 *   const { data } = useOauthPopupListener()
 *   console.log(data, data.state.returnUrl, data.extra) // { code: '...', state: { returnUrl: '/my', type: 'kakao' }, extra: 'hello parents' }
 *
 *      <KakaoButton
 *        onClick={() =>
 *          kakao.loginToPopup({
 *            redirect_uri: `${window.origin}/social/callback`,
 *            state: {
 *              returnUrl: '/my',
 *              type: 'kakao',
 *            },
 *          })
 *        }
 *      />
 * }
 *
 * // pages/social/callback.tsx (popup window)
 *
 * const { data, isLoading } = useOauthPopupCallback<{type: string; returnUrl:string}>({
 *    onSuccess: (response) => {
 *      console.log(response.state.returnUrl)
 *      response.closePopup({ extra: 'hello parents' })
 *    },
 * })
 * ```
 */

export const ERROR_MESSAGES = {
  NO_RESPONSE: 'No Response from popup',
  ORIGIN_MISMATCH: 'Received message from different origin',
  NO_AUTH_CODE: 'No authorization code or access token',
}

export const useOauthPopupListener = <State, Extra = unknown>(
  params?: useOauthCallbackParams<
    OauthResponse<State> & ExtraState<Extra>,
    Partial<OauthResponse<State> & ExtraState<Extra> & { msg?: string }>
  >,
) => {
  const [oAuthResponse, setOauthResponse] = useState<Partial<
    OauthResponse<State> & ExtraState<Extra>
  > | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const onSuccess = useCallbackRef(params?.onSuccess || (() => {}))
  const onFail = useCallbackRef(params?.onFail || (() => {}))

  const handleFailure = useCallback(
    <T extends OauthResponse<State> & ExtraState<Extra>>({
      msg,
      data,
    }: {
      msg: string
      data: T | null
    }) => {
      setIsLoading(false)
      onFail(
        data ? { ...data, errorDescription: msg } : { errorDescription: msg },
      )
      setOauthResponse((prev) => {
        if (!data) return { errorDescription: msg }
        if (!prev) return { ...data, errorDescription: msg }
        return {
          ...prev,
          ...data,
          errorDescription: msg,
        }
      })
    },
    [onFail],
  )
  useEffect(() => {
    if (window.opener) return

    const oAuthCodeListener = (event: MessageEvent) => {
      const response = event.data as OauthResponse<State> & ExtraState<Extra>
      if (event.data.type !== 'oauth') return
      if (event.origin !== window.location.origin) {
        handleFailure({
          data: null,
          msg: ERROR_MESSAGES.ORIGIN_MISMATCH,
        })
        return
      }

      if (!response) {
        handleFailure({
          data: null,
          msg: ERROR_MESSAGES.NO_RESPONSE,
        })
        return
      }

      if (!!response.error || !!response.errorDescription) {
        handleFailure({
          data: null,
          msg: `${response?.error}: ${response?.errorDescription}`,
        })
        return
      }

      if (isNullish(response.code)) {
        handleFailure({
          data: response,
          msg: ERROR_MESSAGES.NO_AUTH_CODE,
        })
        return
      }

      onSuccess(response)
      setOauthResponse(response)
      setIsLoading(false)
    }

    window.addEventListener('message', oAuthCodeListener, false)

    return () => {
      window.removeEventListener('message', oAuthCodeListener)
    }
  }, [handleFailure, onFail, onSuccess])

  return {
    data: oAuthResponse,
    isLoading,
  }
}
