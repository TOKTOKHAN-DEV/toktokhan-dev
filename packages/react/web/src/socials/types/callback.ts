export interface OauthResponse<T> {
  code: string | null
  error: string | null
  errorDescription: string | null
  state: T | null
}

export interface useOauthCallbackParams<T = any, U = any> {
  onSuccess?: (params: T) => void
  onFail?: (params: U) => void
}
