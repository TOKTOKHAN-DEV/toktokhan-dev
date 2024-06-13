export const getRepositoryInfo = (url: string) => {
  const _url = new URL(url)

  const pathParts = _url.pathname.split('/').filter((part) => part !== '')

  const owner = pathParts[0]
  const repo = pathParts[1]

  return {
    owner,
    repo,
  }
}
