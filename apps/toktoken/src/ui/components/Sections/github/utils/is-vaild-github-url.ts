export const isValidGitHubUrl = (url: string) => {
  try {
    const _url = new URL(url)
    return _url.origin === 'https://github.com'
  } catch (error) {
    return false
  }
}
