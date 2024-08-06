# @toktokhan-dev/github

[Octokit](https://github.com/octokit)을 사용하여 Github Api를 쉽게 사용할 수 있도록 하는 모듈입니다.
자세한 내용 및 제공하는 유틸리티 목록은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/github)에서 확인 할 수 있습니다.

## Installation

```bash
npm i @toktokhan-dev/github
```

## Preview

```tsx
import { GitHubManager } from '@toktokhan-dev/github'

export const createRepository = async (config) => {
  const github = new GitHubManager({
    token: '<your-token>',
    owner: '<your-owner>',
    repo: '<your-repo>',
  })

  // repo, owner 정보는 각 메서드 파라미터에 넣으면 해당 파라미터가 우선순위가 됩니다.
  // 우선순위 1. params 2. instance
  const { clone_url, html_url, isOrg } = await github.createRepo()

  if (isOrg) {
    await github.addCollaborator({ username: '<your-username>' })
    console.log(
      `Successfully added the user as a collaborator to the repository.`,
    )
  }
  console.log('Successfully published to ', html_url)

  return { cloneUrl: clone_url, url: html_url }
}
```
