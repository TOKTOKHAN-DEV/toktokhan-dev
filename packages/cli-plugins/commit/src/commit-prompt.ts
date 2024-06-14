import { checkFileAccess, forEachFiles } from '@toktokhan-dev/node'
import { runIfFn } from '@toktokhan-dev/universal'

import clear from 'clear'
import enquirer from 'enquirer'

import { INITIAL_COMMIT_TYPES } from './constants/initial-commit-types'
import { getChangesetMd } from './get-changeset-md'

import { CommitConfig, CommitType } from '.'

export type CommitSource = {
  type: string
  message: string
  emoji?: string
  scope?: string
  workspace?: string[]
  breakingChange?: string
  detail?: string
  issueNumber?: number
  isCloseIssue?: boolean
}

export const commitPrompt = async (
  config: CommitConfig,
): Promise<CommitSource> => {
  clear()
  const workspace: string[] = await (async () => {
    if (!config?.workspaces?.length) return []
    const { workspace } = await enquirer.prompt<{ workspace: string[] }>({
      type: 'multiselect',
      name: 'workspace',
      message: 'Pick WorkSpace(skip by: Enter)',
      choices: config.workspaces,
    })
    return workspace
  })()

  const commitTypes =
    runIfFn(config.types, INITIAL_COMMIT_TYPES) || INITIAL_COMMIT_TYPES

  const chMd = getChangesetMd()

  const {
    type: selectedType,
    scope,
    message,
    detail,
    breakingChange,
  } = await enquirer.prompt<{
    type: string
    scope: string
    message: string
    detail: string
    breakingChange: string
  }>([
    {
      type: 'autocomplete',
      name: 'type',
      message: 'Pick Commit Type',
      choices: commitTypes.map(createChoiceItem),
    },
    {
      type: 'input',
      name: 'scope',
      message: 'Pick Change Scope(skip by: Enter)',
    },
    {
      type: 'input',
      name: 'message',
      message: 'What did you do?',
      initial: chMd ? chMd.summary : undefined,
      required: true,
    },
    {
      type: 'input',
      name: 'breakingChange',
      message: 'has BREAKING CHANGE for major update?(skip by: Enter)',
    },
    {
      type: 'input',
      name: 'detail',
      initial: chMd ? chMd.detail : undefined,
      message: 'has detail?(skip by: Enter)',
      multiline: true,
    },
  ])

  const type = commitTypes.find((type) => type.name === selectedType)

  return {
    workspace,
    type: type?.name || '',
    emoji: type?.emoji || '',
    scope,
    message,
    breakingChange,
    detail,
  }
}

export type ChoiceItem = {
  name: string
  value: string
  message: string
}

export const createChoiceItem = ({
  name,
  description,
  emoji,
}: CommitType): ChoiceItem => {
  return {
    name,
    message: emoji?.padEnd(3, ' ') + (name + ':').padEnd(12, ' ') + description,
    value: name,
  }
}

export const getCommitScopes = (params: {
  scopePath: string
  include?: string[]
  ignored?: string[]
}) => {
  const { include, ignored, scopePath } = params || {}
  const scopes: string[] = []

  forEachFiles(
    {
      each: (file) => scopes.push(file.name),
      recursive: true,
      filter: ({ name }) =>
        checkFileAccess({
          filename: name,
          include,
          ignored,
        }),
    },
    scopePath,
  )

  return scopes
}
