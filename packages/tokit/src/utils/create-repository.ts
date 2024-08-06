import { GitHubManager } from '@toktokhan-dev/github'
import { infoLog } from '@toktokhan-dev/node'

import { InitialQuestionResponse } from '../prompts/initial'

const GIT_TOKEN = process.env.TOKIT_GITHUB_TOKEN || ''
const GIT_OWNER = process.env.TOKIT_GITHUB_OWNER || ''
const GIT_USERNAME = process.env.TOKIT_GITHUB_USERNAME || ''

export const createRepository = async (config: InitialQuestionResponse) => {
  const url = `https://github.com/${GIT_OWNER}/${config.projectname}`

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

  infoLog('successfully published to ', url)

  if (!isOrg) {
    infoLog(`Skipped add collaborator`)
  } else {
    await github.addCollaborator({
      username: GIT_USERNAME,
      permission: 'admin',
    })
    infoLog(
      `Successfully added the user ${GIT_USERNAME} as a collaborator to the ${GIT_OWNER}/${config.projectname} repository.`,
    )
  }

  return { cloneUrl: clone_url, url: html_url }
}
