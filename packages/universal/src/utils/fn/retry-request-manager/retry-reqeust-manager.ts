export type RetryFnParams<T = any, E = any> = {
  getToken: () => Promise<string>
  onRefetch: (refresed: string) => T
  onError?: (error: E) => void
}

/**
 * @category Utils/Fn
 *
 * 주로 refresh token 이 필요한 요청을 관리하는 함수입니다.
 * 토큰이 만료됐을 시, refresh token 을 요청하고, 새로운 토큰을 받아서 요청을 재시도합니다.
 *
 * @returns refresh token 이 필요한 요청을 관리하는 함수입니다.
 *
 * @example
 *
 * ```ts
 * const retry = retryReqeustManager()
 *
 * const result = await retry({
 *  getToken: async () => {
 *   await delay(200)
 *  return 'token'
 * },
 * onRefetch: (token: string) => {
 * return token
 * },
 * onError: (error: any) => {
 * return error
 * },
 * })
 *
 *
 */
export const retryReqeustManager = () => {
  let token: Promise<string> | null = null

  return async <T, E>(params: RetryFnParams<T, E>): Promise<T> => {
    const { onError, onRefetch, getToken } = params

    try {
      if (!token) {
        token = getToken()
      }
      const refreshed = await token
      const refectehd = await onRefetch(refreshed)
      return refectehd
    } catch (err: any) {
      onError?.(err)
      throw err
    } finally {
      token = null
    }
  }
}
