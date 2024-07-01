import { SocialAuthQueryResponse } from 'socials/types/social'

export const extractOAuthParams = (search: string): SocialAuthQueryResponse => {
  const urlParams = new URLSearchParams(search)
  return {
    access_token: urlParams.get('access_token') || null, // for google
    code: urlParams.get('code') || null,
    state: urlParams.get('state') || null,
    error: urlParams.get('error') || null,
    errorDescription: urlParams.get('error_description') || null,
  }
}
