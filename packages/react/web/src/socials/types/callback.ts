import { OauthStateReturnType } from '../utils/decode-oauth-state'

export type useOauthCallbackParams<T = any, U = any> = {
  onSuccess?: (params: T) => void
  onFail?: (params: U) => void
}

export type OauthCallbackParams = {
  access_token: string | null
  code: string | null
  error: string | null
  errorDescription: string | null
  parsedState: OauthStateReturnType | null
}

export type OauthResponse = {
  code: string | null
  socialType: 'kakao' | 'google' | 'naver' | 'facebook' | 'apple' | null
  returnUrl: string | null
}
