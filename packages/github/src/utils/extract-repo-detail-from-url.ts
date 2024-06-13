/**
 * @category Utils
 *
 * github url 를 받아 owner와 repo를 반환합니다.
 * @param url 유효한 github repository url
 */
export const extractRepoDetailsFromUrl = (url: string) => {
  const githubUrlPattern = /^https:\/\/github\.com\/[^/]+\/[^/]+$/

  if (!githubUrlPattern.test(url)) {
    throw new Error('Invalid GitHub repository URL')
  }

  const _url = new URL(url)

  const pathParts = _url.pathname.split('/').filter((part) => part !== '')

  const owner = pathParts[0]
  const repo = pathParts[1]

  return {
    owner,
    repo,
  }
}
