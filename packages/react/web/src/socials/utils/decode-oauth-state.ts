import { OauthResponse } from 'socials/types/callback'

export type OauthStateReturnType = {
  type: OauthResponse['socialType'] | null
  returnUrl: string | null
}
export const decodeOAuthState = (
  state?: string | string[] | null,
): OauthStateReturnType | null => {
  if (typeof state !== 'string') return null
  const parsed = JSON.parse(Buffer.from(state, 'base64').toString('utf8'))

  if (typeof parsed !== 'object') return null
  return {
    type: parsed.type || null,
    returnUrl: parsed.returnUrl || null,
  }
}
