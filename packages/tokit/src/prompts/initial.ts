import { cwd } from '@toktokhan-dev/node'
import { isNotNullish } from '@toktokhan-dev/universal'

import enquirer from 'enquirer'
import { prop } from 'lodash/fp'

import { PACKAGE_MAP } from '../constants/package-map'
import { github, releasedTemplates } from '../services/github'
import { isCached } from '../utils/is-cached'
import { logMissingConfigMessage } from '../utils/log-missing-config-msg'

export type InitialQuestionResponse = {
  pathname: string
  template: keyof typeof PACKAGE_MAP
  version: string
  projectname: string
  manager: 'npm' | 'pnpm' | 'yarn'
  createRemoteRepo: 'Yes' | 'No'
  isCached: boolean
}

const checkMissingConfig = async (
  createRemoteRepo: 'Yes' | 'No',
  projectname: string | undefined,
  pathname: string | undefined,
): Promise<void> => {
  const missing = []

  if (!projectname && !pathname) {
    missing.push('Project name or pathname')
  }

  if (createRemoteRepo === 'Yes') {
    const githubToken = process.env.TOKIT_GITHUB_TOKEN
    const githubOwner = process.env.TOKIT_GITHUB_OWNER
    const githubUserName = process.env.TOKIT_GITHUB_USERNAME

    if (!githubToken) missing.push('GitHub Token Environment')
    if (!githubOwner) missing.push('GitHub Owner Environment')
    if (!githubUserName) missing.push('GitHub Username Environment')
  }

  if (missing.length > 0) return logMissingConfigMessage(missing)
}

export async function initialQuestion(
  pathname: string | undefined,
): Promise<InitialQuestionResponse> {
  const { projectname, template } = await enquirer.prompt<{
    projectname: string
    template: keyof typeof PACKAGE_MAP
  }>([
    {
      type: 'input',
      name: 'projectname',
      message: 'What is your project name?',
      skip: pathname !== undefined,
      initial: () => pathname,
    },
    {
      type: 'select',
      name: 'template',
      message: "What's your template?",
      choices: Object.keys(PACKAGE_MAP),
    },
  ])

  const pack = PACKAGE_MAP[template]

  const releases = await github.repos.listReleases({
    owner: pack.owner,
    repo: pack.repo,
  })

  if (releases.data.length === 0) {
    throw new Error('No releases found')
  }

  const { createRemoteRepo, manager, version } = await enquirer.prompt<{
    version: string
    manager: 'npm' | 'pnpm' | 'yarn'
    createRemoteRepo: 'Yes' | 'No'
  }>([
    {
      name: 'version',
      message: 'What version do you want to use?',
      type: 'select',
      choices: releases.data
        .map(prop('tag_name'))
        .filter(isNotNullish)
        .map((tag) => ({
          name: tag,
          message: isCached(pack.repo, tag) ? `${tag} (cached)` : tag,
        })),
    },
    {
      type: 'select',
      name: 'manager',
      message: 'What is your package manager?',
      choices: ['npm', 'pnpm', 'yarn'],
    },
    {
      type: 'select',
      name: 'createRemoteRepo',
      message: 'Would you like to create a remote repository on GitHub?',
      choices: ['No', 'Yes'],
    },
  ])

  await checkMissingConfig(createRemoteRepo, projectname, pathname)

  return {
    version,
    createRemoteRepo,
    manager,
    projectname,
    template,
    pathname: cwd(projectname || pathname || ''),
    isCached: isCached(pack.repo, version),
  }
}
