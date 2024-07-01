import { serialize } from '../utils/serialize'

/**
 * OauthStateReturnType은 OAuth 상태 반환 타입을 정의합니다.
 * type: 소셜 로그인 타입을 나타냅니다.
 * returnUrl: 로그인 후 리다이렉트 될 URL을 나타냅니다.
 */
export interface OauthStateReturnType {
  type: string | null
  returnUrl: string | null
}

/**
 * SocialOauthInit 클래스는 소셜 로그인 초기화를 담당합니다.
 */
export class SocialOauthInit {
  public oAuthBaseUrl: string = ''

  /**
   * 생성자 함수에서는 클라이언트 ID를 받아 초기화합니다.
   * @param clientID - 소셜 로그인을 위한 클라이언트 ID
   */
  constructor(public clientID: string) {
    this.clientID = clientID
  }

  /**
   * createOauthUrl 메서드는 OAuth 인증 URL을 생성합니다.
   * @param params - OAuth 인증 요청에 필요한 파라미터
   * @returns 생성된 OAuth 인증 URL
   */
  createOauthUrl(params: Record<string, any>) {
    return `${this.oAuthBaseUrl}?${serialize(params)}`
  }

  /**
   * encodeOAuthState 메서드는 OAuth 상태를 인코딩합니다.
   * @param type - 소셜 로그인 타입
   * @param returnUrl - 로그인 후 리다이렉트 될 URL
   * @returns 인코딩된 OAuth 상태
   */
  static encodeOAuthState = <T,>(state: T): string => {
    return Buffer.from(JSON.stringify(state), 'utf8').toString('base64')
  }

  /**
   * decodeOAuthState 메서드는 인코딩된 OAuth 상태를 디코딩합니다.
   * @param state - 인코딩된 OAuth 상태
   * @returns 디코딩된 OAuth 상태. 디코딩에 실패하면 null을 반환합니다.
   */
  static decodeOAuthState = <T,>(state: string): T | null => {
    try {
      const parsed = JSON.parse(Buffer.from(state, 'base64').toString('utf8'))
      return parsed as T
    } catch (e) {
      console.error('Failed to decode OAuth state', e)
      return null
    }
  }
}

export default SocialOauthInit
