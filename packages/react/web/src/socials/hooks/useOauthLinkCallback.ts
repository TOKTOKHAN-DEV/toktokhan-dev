import { useEffect, useRef, useState } from 'react'

import { useCallbackRef } from '@toktokhan-dev/react-universal'
import { isNotNullish, isNullish } from '@toktokhan-dev/universal'

import SocialOauthInit from 'socials/modules/SocialOauthInit'

import { OauthResponse, useOauthCallbackParams } from '../types/callback'
import { extractOAuthParams } from './utils/extract-oauth-params'

/**
 * `useOauthLinkCallback` 훅의 반환 타입을 정의합니다.
 */
export interface LinkReturnType<T> {
  /**
   * OAuth 응답 데이터를 나타냅니다.
   */
  data: OauthResponse<T> | null

  /**
   * OAuth 콜백 처리 상태를 나타냅니다. 처리 중이면 `true`, 아니면 `false`입니다.
   */
  isLoading: boolean
}

/**
 * @category Socials
 *
 * OAuth 링크 콜백을 처리하는 React Hook입니다.
 * 이 Hook은 OAuth 인증 후 리다이렉트된 페이지에서 사용됩니다.
 *
 * @param params 콜백 함수 파라미터. `onSuccess`와 `onFail` 콜백 함수를 포함할 수 있습니다.
 * @returns {LinkReturnType} OAuth 응답 데이터와 로딩 상태를 반환합니다.
 *
 * @example
 *
 * ```tsx
 * // pages/login.tsx
 *
 * const kakao = new Kakao(ENV.CLIENT_ID)
 * const Login = () =>
 *      <KakaoButton
 *        onClick={() =>
 *          kakao.loginToLink({
 *            redirect_uri: `${window.origin}/social/callback`,
 *            state: {
 *              returnUrl: returnUrl || '/login',
 *              type: 'kakao',
 *            },
 *          })
 *        }
 *      />
 * }
 *
 *
 * // pages/social/callback.tsx
 *
 * const { data, isLoading } = useOauthLinkCallback<{type: string; returnUrl:string}>({
 *    onSuccess: (response) => {
 *      console.log(response.state.returnUrl)
 *    },
 * })
 * ```
 */
export const useOauthLinkCallback = <State>(
  params?: useOauthCallbackParams<OauthResponse<State>, OauthResponse<State>>,
) => {
  const [oAuthResponse, setOauthResponse] =
    useState<OauthResponse<State> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const isCalled = useRef(false)

  const onSuccess = useCallbackRef(params?.onSuccess || (() => {}))
  const onFail = useCallbackRef(params?.onFail || (() => {}))

  useEffect(() => {
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

    isCalled.current = true

    if (response.error || response.errorDescription) {
      console.error(`social login error: ${response.errorDescription}`)
      onFail(response)
      setIsLoading(false)
      setOauthResponse(response)
      return
    }

    if (isNullish(response.code)) {
      console.error('No authorization code or access token')
      onFail(response)
      setIsLoading(false)
      setOauthResponse(response)
      return
    }

    onSuccess(response)
    setIsLoading(false)
    setOauthResponse(response)
  }, [onFail, onSuccess])

  useEffect(() => {
    if (oAuthResponse) setIsLoading(false)
  }, [oAuthResponse])

  return {
    data: oAuthResponse,
    isLoading,
  }
}
