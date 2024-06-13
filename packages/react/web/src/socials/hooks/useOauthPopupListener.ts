import { useCallback, useEffect, useState } from 'react'

import { OauthResponse } from '../types/callback'

/**
 * @category Socials
 *
 * OAuth 팝업에서 전달된 메시지를 수신하는 React Hook입니다.
 * 이 Hook은 OAuth 인증 후 팝업에서 전달된 메시지를 수신하여 처리합니다.
 *
 * @returns {object} - OAuth 응답 데이터와 로딩 상태를 반환합니다.
 * @returns {OauthResponse | null} data - OAuth 응답 데이터입니다. 초기값은 `null`입니다.
 * @returns {boolean} isLoading - OAuth 콜백 처리 상태를 나타냅니다. 처리 중이면 `true`, 아니면 `false`입니다.
 */

export const useOauthPopupListener = () => {
  const [oAuthResponse, setOauthResponse] = useState<OauthResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const oAuthCodeListener = useCallback((event: MessageEvent) => {
    if (event.origin !== window.location.origin) return
    const res = event.data as OauthResponse
    if (!res?.token) return
    setOauthResponse(res)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (window.opener) return

    window.addEventListener('message', oAuthCodeListener, false)

    return () => {
      window.removeEventListener('message', oAuthCodeListener)
    }
  }, [oAuthCodeListener])

  return {
    data: oAuthResponse,
    isLoading,
  }
}
