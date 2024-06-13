import { GitHubManager } from '@toktokhan-dev/github'
import { infoLog } from '@toktokhan-dev/node'

import { InitialQuestionResponse } from '../prompts/initial'

const GIT_TOKEN = process.env.TOKIT_GITHUB_TOKEN || ''
const GIT_ORG = process.env.TOKIT_GITHUB_ORG_NAME || ''
const GIT_USERNAME = process.env.TOKIT_GITHUB_USERNAME || ''

export const createRepository = async (config: InitialQuestionResponse) => {
  const url = `https://github.com/${GIT_ORG}/${config.projectname}`

  const github = new GitHubManager({
    token: GIT_TOKEN || '',
    repo: config.projectname,
    owner: GIT_ORG,
  })

  const { data } = await github.createRepo()
  infoLog('successfully published to ', url)

  await github.addCollaborator({
    owner: GIT_ORG,
    repo: config.projectname,
    username: GIT_USERNAME,
  })
  infoLog(
    `Successfully added the user ${GIT_USERNAME} as a collaborator to the ${GIT_ORG}/${config.projectname} repository.`,
  )

  return { data: { cloneUrl: data.clone_url, url: data.html_url } }
}
