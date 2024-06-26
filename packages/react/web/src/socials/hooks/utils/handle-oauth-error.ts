import { OauthCallbackParams } from 'socials/types/callback'

export const handleOauthErrors = ({
  params,
}: {
  params: OauthCallbackParams
}) => {
  const { access_token, code, error, errorDescription, parsedState } = params
  const token = code || access_token
  if (error || errorDescription) {
    console.error(`${parsedState?.type} login error: ${errorDescription}`)
  }
  if (!parsedState) {
    console.error('Invalid state')
    return true
  }
  if (!token) {
    console.error('No authorization code or access token')
    return true
  }
  return false
}
