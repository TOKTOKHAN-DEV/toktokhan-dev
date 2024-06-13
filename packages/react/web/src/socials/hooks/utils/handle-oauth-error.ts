import { OauthCallbackParams } from 'socials/types/callback'

export const handleOauthErrors = ({
  onFail,
  params,
}: {
  params: OauthCallbackParams
  onFail?: () => void
}) => {
  const { access_token, code, error, errorDescription, parsedState } = params
  const token = code || access_token
  if (error || errorDescription) {
    console.error(`${parsedState?.type} login error: ${errorDescription}`)
    onFail?.()
    return true
  }
  if (!parsedState) {
    console.error('Invalid state')
    onFail?.()
    return true
  }
  if (!token) {
    console.error('No authorization code or access token')
    onFail?.()
    return true
  }
  return false
}
