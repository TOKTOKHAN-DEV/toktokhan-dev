/**
 * SocialType은 지원하는 소셜 로그인 타입을 나타냅니다.
 */
export type SocialType = 'kakao' | 'naver' | 'facebook' | 'google' | 'apple'

/**
 * SocialAuthQueryResponse는 소셜 로그인 인증 응답을 정의합니다.
 */
export interface SocialAuthQueryResponse {
  access_token: string | null // for google
  code: string | null
  state: string | null
  error: string | null
  errorDescription: string | null
}

// Oauth 인증요청에 필요한 공통 속성을 가진 타입을 정의합니다.
export interface CommonOauthParams {
  response_type: string
  client_id: string
  scope?: string
  state?: string
}

/**
 * OauthUserReqParams는 OAuth 인증 요청에 필요한 파라미터를 정의합니다.
 * OauthUserReqParams는 CommonOauthParams를 확장하고, 필요한 추가 속성을 정의합니다.
 * 소셜로그인에 필요한 `response_type` , `client_id`, `scope`, `state` 를 클래스 내부에서 직접 주입해주고 있기 때문에
 * 필수 타입에서 제거하거나 변환하고 `return_url`와 같이 요청시 필요한 타입을 추가하였습니다.
 */
export type OauthUserReqParams<T extends CommonOauthParams, State> = Omit<
  T,
  keyof CommonOauthParams
> & {
  state?: State
  scope?: string | string[]
}

/**
 * {@link https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api | `Kakao Login Docs`}
 */
export interface KakaoAuthQueryParams {
  client_id: string
  redirect_uri: string
  response_type: string // code고정
  scope?: string
  prompt?: 'none' | 'login' | 'create' | 'select_account'
  login_hint?: string
  service_terms?: string // 쉼표로 구분된 문자열 값 목록으로 전달
  state?: string
  nonce?: string
}

/**
 * KaKaoAuthQueryResponse는 카카오 로그인 인증 응답을 정의합니다.
 */
export interface KaKaoAuthQueryResponse {
  code?: string
  error?: string
  error_description?: string
  state?: string
}

/**
 * {@link https://developer.apple.com/documentation/sign_in_with_apple/request_an_authorization_to_the_sign_in_with_apple_server | `Apple Login Docs`}
 */
export interface AppleAuthQueryParams {
  client_id: string
  redirect_uri: string
  response_type: string
  nonce?: string
  response_mode?: string
  scope?: string
  state?: string
}

/**
 * {@link https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/ | `Facebook Login Docs`}
 */
export interface FacebookAuthQueryParams {
  client_id: string
  redirect_uri: string
  response_type: string
  state?: string
  scope?: string
}

/**
 * {@link https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow?hl=ko | `Google Login Docs`}
 */
export interface GoogleAuthQueryParams {
  client_id: string
  redirect_uri: string
  response_type: string
  scope: string
  state?: string
  include_granted_scopes?: boolean
  enable_granular_consent?: boolean
  login_hint?: string
  prompt?: 'none' | 'consent' | 'select_account'
}

/**
 * {@link https://developers.naver.com/docs/login/api/api.md#2--api-%EA%B8%B0%EB%B3%B8-%EC%A0%95%EB%B3%B4 | `Naver Login Docs`}
 */
export interface NaverAuthQueryParams {
  client_id: string
  redirect_uri: string
  response_type: string
  state: string
  scope?: string
}

/**
 * NaverAuthQueryResponse는 네이버 로그인 인증 응답을 정의합니다.
 */
export interface NaverAuthQueryResponse {
  code?: string
  error?: string
  error_description?: string
  state?: string
}
