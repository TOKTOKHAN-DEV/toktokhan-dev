import { GitHubManager } from '@toktokhan-dev/github'
import { infoLog } from '@toktokhan-dev/node'

import { InitialQuestionResponse } from '../prompts/initial'

const GIT_TOKEN = process.env.TOKIT_GITHUB_TOKEN || ''
const GIT_OWNER = process.env.TOKIT_GITHUB_OWNER || ''
const GIT_USERNAME = process.env.TOKIT_GITHUB_USERNAME || ''

export const createRepository = async (config: InitialQuestionResponse) => {
  const owner = GIT_OWNER
  const repo = config.projectname
  const github = new GitHubManager({
    token: GIT_TOKEN || '',
    owner,
    repo,
  })

  const { clone_url, html_url, isOrg } = await github.createRepo({
    isPrivate: true,
  })

  if (!isOrg) {
    infoLog(
      'Collaborator Addition Skipped',
      `User ${GIT_USERNAME} is already the repository owner.`,
    )
  } else {
    await github.addCollaborator({
      username: GIT_USERNAME,
      permission: 'admin',
    })
    infoLog(
      'Collaborator Added',
      `User ${GIT_USERNAME} was successfully added as a collaborator`,
    )
  }

  return { cloneUrl: clone_url, url: html_url }
}
