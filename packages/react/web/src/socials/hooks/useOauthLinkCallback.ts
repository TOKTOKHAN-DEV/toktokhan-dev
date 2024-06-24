import { useCallback, useEffect, useRef, useState } from 'react'

import { OauthResponse, useOauthCallbackParams } from '../types/callback'
import { decodeOAuthState } from '../utils/decode-oauth-state'
import { extractOAuthParams } from './utils/extract-oauth-params'
import { handleOauthErrors } from './utils/handle-oauth-error'

/**
 * `useOauthLinkCallback` 훅의 반환 타입을 정의합니다.
 */
export type LinkReturnType = {
  /**
   * OAuth 응답 데이터를 나타냅니다.
   */
  data: OauthResponse | null

  /**
   * OAuth 콜백 처리 상태를 나타냅니다. 처리 중이면 `true`, 아니면 `false`입니다.
   */
  isLoading: boolean
}

/**
 * `useOauthLinkCallback` 훅의 callback 파라미터 타입입니다.
 */
export type LinkCallBackParamType = {
  /**
   * OAuth 응답 데이터를 나타냅니다.
   */
  data: OauthResponse | null
}

/**
 * @category Socials
 *
 * OAuth 링크 콜백을 처리하는 React Hook입니다.
 * 이 Hook은 OAuth 인증 후 리다이렉트된 페이지에서 사용됩니다.
 *
 * @param cb 콜백 함수 파라미터. `onSuccess`와 `onFail` 콜백 함수를 포함할 수 있습니다.
 * @returns {LinkReturnType} OAuth 응답 데이터와 로딩 상태를 반환합니다.
 */
export const useOauthLinkCallback = (
  cb?: useOauthCallbackParams<LinkCallBackParamType>,
) => {
  const [oAuthResponse, setOauthResponse] = useState<OauthResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const onSuccessRef = useRef(cb?.onSuccess)
  const onFailRef = useRef(cb?.onFail)
  onSuccessRef.current = cb?.onSuccess
  onFailRef.current = cb?.onFail

  const handleOAuthCallback = useCallback(() => {
    const urlParams = extractOAuthParams(window.location.search)
    const parsedState = decodeOAuthState(urlParams.state)
    const { state, ...restParams } = urlParams
    if (
      handleOauthErrors({
        onFail: onFailRef.current,
        params: { ...restParams, parsedState },
      })
    )
      return
    if (!parsedState) {
      return onFailRef.current?.()
    }
    const result = {
      token: urlParams.code || urlParams.access_token,
      socialType: parsedState.type,
      returnUrl: parsedState.returnUrl,
    }
    setOauthResponse(result)
    onSuccessRef.current?.({ data: result })
  }, [])

  useEffect(() => {
    if (window.opener) return
    handleOAuthCallback()
  }, [handleOAuthCallback])

  useEffect(() => {
    if (!!oAuthResponse) setIsLoading(false)
  }, [oAuthResponse])

  return {
    data: oAuthResponse,
    isLoading,
  }
}
