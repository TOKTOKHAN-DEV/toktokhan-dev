export const encodeOAuthState = (type: string, returnUrl?: string) => {
  return Buffer.from(JSON.stringify({ type, returnUrl }), 'utf8').toString(
    'base64',
  )
}
