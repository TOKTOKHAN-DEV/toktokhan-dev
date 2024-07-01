import { isNotNullish } from '@toktokhan-dev/universal'

import { isArray } from 'lodash'

import { AppleAuthQueryParams, OauthUserReqParams } from '../../types/social'
import { openPopup } from '../../utils/open-popup'
import { pushToUrl } from '../../utils/push-to-url'
import SocialOauthInit from '../SocialOauthInit'

/**
 * @category Socials/Apple
 *
 * Apple OAuth 인증을 처리하는 클래스입니다.
 * SocialOauthInit 클래스를 상속받아 구현되었습니다.
 */
export class Apple extends SocialOauthInit {
  public oAuthBaseUrl = 'https://appleid.apple.com/auth/authorize'

  /**
   * Apple 클래스의 생성자입니다.
   * @param clientID - Apple OAuth 클라이언트 ID
   */
  constructor(clientID?: string) {
    if (!clientID) {
      console.warn('Apple clientID is required')
    }
    super(clientID || '')
  }

  /**
   * OAuth 인증 URL을 생성합니다.
   * @param params - OAuth 인증 요청에 필요한 파라미터
   * @param params.scope - 요청할 OAuth 스코프
   * @param params.state - 트랜잭션 동안 유지할 상태
   * @returns 생성된 OAuth 인증 URL
   */
  createOauthUrl = <State,>({
    scope,
    state,
    ...params
  }: OauthUserReqParams<AppleAuthQueryParams, State>): string => {
    const encoded =
      isNotNullish(state) ? SocialOauthInit.encodeOAuthState(state) : undefined

    return super.createOauthUrl({
      scope: isArray(scope) ? scope?.join(' ') : scope,
      client_id: this.clientID,
      response_type: 'code', // 타입추론안됨
      state: encoded,
      ...params,
    })
  }

  /**
   * 로그인을 위한 OAuth 인증 링크로 리다이렉트합니다.
   * @param params - OAuth 인증 요청에 필요한 파라미터
   * @param params.scope - 요청할 OAuth 스코프
   * @param params.state - 트랜잭션 동안 유지할 상태
   */
  loginToLink = <State,>(
    params: OauthUserReqParams<AppleAuthQueryParams, State>,
  ) => {
    const authLink = this.createOauthUrl(params)
    pushToUrl(authLink)
  }

  /**
   * 로그인을 위한 OAuth 인증 팝업을 엽니다.
   * @param params - OAuth 인증 요청에 필요한 파라미터
   * @param params.scope - 요청할 OAuth 스코프
   * @param params.state - 트랜잭션 동안 유지할 상태
   */
  loginToPopup = <State,>(
    params: OauthUserReqParams<AppleAuthQueryParams, State>,
  ) => {
    const authLink = this.createOauthUrl({
      ...params,
    })
    openPopup(authLink)
  }
}

export default Apple
