import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useCallbackRef } from '@toktokhan-dev/react-universal'
import { isNotNullish, isNullish } from '@toktokhan-dev/universal'

import SocialOauthInit from '../modules/SocialOauthInit'
import { OauthResponse, useOauthCallbackParams } from '../types/callback'
import { extractOAuthParams } from './utils/extract-oauth-params'

/**
 * `useOauthPopupCallback` 훅의 반환 타입을 정의합니다.
 */
export interface PopupReturnType<T> {
  /**
   * OAuth 응답 데이터를 나타냅니다.
   */
  data: OauthResponse<T> | null

  /**
   * OAuth 콜백 처리 상태를 나타냅니다. 처리 중이면 `true`, 아니면 `false`입니다.
   */
  isLoading: boolean

  /**
   * 팝업을 닫는 함수를 나타냅니다.
   * 팝업이 닫힐때 부모 창에 OAuth 응답 데이터를 전달합니다.
   * `useOauthPopupListener` 훅을 사용하여 부모 창에서 OAuth 응답 데이터를 수신할 수 있습니다.
   *
   * @param extra - 모달을 닫을때 부모 창에게 추가적인 데이터를 전달할 수 있습니다.
   */
  closePopup(extra?: any): void
}

export interface PopupResponse<T> extends OauthResponse<T> {
  /**
   * 팝업을 닫는 함수를 나타냅니다.
   * 팝업이 닫힐때 부모 창에 OAuth 응답 데이터를 전달합니다.
   * `useOauthPopupListener` 훅을 사용하여 부모 창에서 OAuth 응답 데이터를 수신할 수 있습니다.
   *
   * @param extra - 모달을 닫을때 부모 창에게 추가적인 데이터를 전달할 수 있습니다.
   */
  closePopup(extra?: any): void
}

/**
 * @category Socials
 *
 * OAuth 팝업 콜백을 처리하는 React Hook입니다.
 * 이 Hook은 OAuth 인증 후 팝업에서 사용됩니다.
 *
 * @param params 콜백 함수 파라미터. `onSuccess`와 `onFail` 콜백 함수를 포함할 수 있습니다.
 * @returns  OAuth 응답 데이터, 로딩 상태, 팝업을 닫는 함수를 반환합니다.
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
export const useOauthPopupCallback = <State>(
  cb?: useOauthCallbackParams<PopupResponse<State>, PopupResponse<State>>,
) => {
  const [oAuthResponse, setOauthResponse] =
    useState<OauthResponse<State> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isCalled = useRef<boolean>(false)

  const onSuccess = useCallbackRef(cb?.onSuccess || (() => {}))
  const onFail = useCallbackRef(cb?.onFail || (() => {}))

  const createClosePopup = useCallback(
    (params: OauthResponse<State> | null) => (extra?: any) => {
      if (!window.opener) throw new Error('No popup')
      const openerURL = window.opener.location.href
      window.close()
      window.opener.postMessage({ type: 'oauth', ...params, extra }, openerURL)
    },
    [],
  )

  const closePopup = useMemo(
    () => createClosePopup(oAuthResponse),
    [createClosePopup, oAuthResponse],
  )

  useEffect(() => {
    if (!window.opener) return
    if (isCalled.current) return
    const { access_token, code, state, error, errorDescription } =
      extractOAuthParams(window.location.search)

    const decoded =
      isNotNullish(state) ?
        SocialOauthInit.decodeOAuthState<State>(state)
      : null

    const response: OauthResponse<State> = {
      code: code || access_token,
      error,
      errorDescription,
      state: decoded,
    }

    const closePopup = createClosePopup(response)
    isCalled.current = true

    if (response.error || response.errorDescription) {
      console.error(`social login error: ${response.errorDescription}`)
      onFail({ ...response, closePopup })
      setIsLoading(false)
      setOauthResponse(response)
      return
    }

    if (isNullish(response.code)) {
      console.error('No authorization code or access token')
      onFail({ ...response, closePopup })
      setIsLoading(false)
      setOauthResponse(response)
      return
    }

    onSuccess({ ...response, closePopup })
    setIsLoading(false)
    setOauthResponse(response)
  }, [createClosePopup, onFail, onSuccess])

  return {
    data: oAuthResponse,
    isLoading,
    closePopup,
  }
}
