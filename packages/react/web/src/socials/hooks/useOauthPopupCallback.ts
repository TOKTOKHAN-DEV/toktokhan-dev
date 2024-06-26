import { useCallback, useEffect, useRef, useState } from 'react'

import { OauthResponse, useOauthCallbackParams } from '../types/callback'
import { decodeOAuthState } from '../utils/decode-oauth-state'
import { extractOAuthParams } from './utils/extract-oauth-params'
import { handleOauthErrors } from './utils/handle-oauth-error'

/**
 * `useOauthPopupCallback` 훅의 반환 타입을 정의합니다.
 */
export type PopupReturnType = {
  /**
   * OAuth 응답 데이터를 나타냅니다.
   */
  data: OauthResponse | null

  /**
   * OAuth 콜백 처리 상태를 나타냅니다. 처리 중이면 `true`, 아니면 `false`입니다.
   */
  isLoading: boolean

  /**
   * 팝업을 닫는 함수를 나타냅니다.
   */
  closePopup: () => void
}
/**
 * `useOauthPopupCallback` 훅의 callback 파라미터 console.error('타입입니다',타입입니다)
 */
export type PopupCbSuccessParamType = {
  /**
   * OAuth 응답 데이터를 나타냅니다.
   */
  data: OauthResponse | null

  /**
   * 팝업을 닫는 함수를 나타냅니다.
   */
  closePopup: () => void
}
export type PopupCbFailParamType = {
  /**
   * OAuth state에 담은 returnUrl입니다.
   */
  returnUrl?: OauthResponse['returnUrl']

  /**
   * 팝업을 닫는 함수를 나타냅니다.
   */
  closePopup: () => void
}

/**
 * @category Socials
 *
 * OAuth 팝업 콜백을 처리하는 React Hook입니다.
 * 이 Hook은 OAuth 인증 후 팝업에서 사용됩니다.
 *
 * @param cb 콜백 함수 파라미터. `onSuccess`와 `onFail` 콜백 함수를 포함할 수 있습니다.
 * @returns {PopupReturnType} OAuth 응답 데이터, 로딩 상태, 팝업을 닫는 함수를 반환합니다.
 */
export const useOauthPopupCallback = (
  cb?: useOauthCallbackParams<PopupCbSuccessParamType, PopupCbFailParamType>,
) => {
  const [oAuthResponse, setOauthResponse] = useState<OauthResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isOpenedPopup, setIsOpenedPopup] = useState(true)

  const onSuccessRef = useRef(cb?.onSuccess)
  const onFailRef = useRef(cb?.onFail)
  onSuccessRef.current = cb?.onSuccess
  onFailRef.current = cb?.onFail

  const createClosePopup = useCallback(
    (params: OauthResponse | null) => () => {
      if (!window.opener) throw new Error('No popup')
      if (!params?.code)
        onFailRef?.current?.({
          returnUrl: params?.returnUrl,
          closePopup: window.close,
        })

      if (!params) onFailRef?.current?.({ closePopup: window.close })
      const openerURL = window.opener.location.href
      window.opener.postMessage(params, openerURL)
      window.close()
    },
    [],
  )

  const closePopup = useCallback(
    () => createClosePopup(oAuthResponse),
    [oAuthResponse],
  )

  const handleOAuthCallback = useCallback(() => {
    const urlParams = extractOAuthParams(window.location.search)
    const parsedState = decodeOAuthState(urlParams.state)
    const { state, ...restParams } = urlParams

    if (!parsedState) {
      return onFailRef?.current?.({ closePopup: window.close })
    }

    const isOauthError = handleOauthErrors({
      params: { ...restParams, parsedState },
    })
    if (isOauthError)
      return onFailRef?.current?.({
        closePopup: window.close,
        returnUrl: parsedState?.returnUrl,
      })

    const result = {
      code: urlParams.code || urlParams.access_token,
      socialType: parsedState.type,
      returnUrl: parsedState.returnUrl,
    }
    setOauthResponse(result)

    setIsLoading(false)

    const closePopup = createClosePopup(result)
    onSuccessRef.current?.({ data: result, closePopup })
  }, [createClosePopup])

  useEffect(() => {
    setIsOpenedPopup(!!window.opener)
  }, [])

  useEffect(() => {
    if (!window.opener) return
    handleOAuthCallback()
  }, [handleOAuthCallback])

  return {
    data: oAuthResponse,
    isLoading,
    closePopup,
    isOpenedPopup,
  }
}
