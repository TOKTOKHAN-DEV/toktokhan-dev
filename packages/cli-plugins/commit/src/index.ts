import { defineCommand } from '@toktokhan-dev/cli'

import { commitPrompt } from './commit-prompt'
import { INITIAL_COMMIT_TYPES } from './constants/initial-commit-types'
import { createCommitMessage } from './create-commit-message'
import { executeCommit } from './excute-commit'

/**
 * 대화형 cli 를 통해 일관된 형식의 커밋 메시지 작성을 도와주는 플러그인 입니다.
 *
 * @packageDocumentation
 */

export interface CommitType {
  name: string
  description: string
  emoji?: string
}

/**
 * @category Types
 */
export interface CommitConfig {
  /** 모노래포 사용시, workspace 로 커밋 범위 설정할수 있습니다. */
  workspaces?: string[]
  /** 커밋 타입을 지정합니다. */
  types?: CommitType[] | ((initial: CommitType[]) => CommitType[])
}

/**
 * @category Commands
 */
export const commit = defineCommand<'commit', CommitConfig>({
  name: 'commit',
  description:
    '대화형 cli 를 통해 일관된 형식의 커밋 메시지 작성을 도와주는 플러그인 입니다.',
  default: {
    types: INITIAL_COMMIT_TYPES,
    workspaces: [],
  },
  cliOptions: [
    {
      alias: 'w',
      name: 'workspaces',
      description:
        '모노래포 사용시, workspace 로 커밋 범위 설정할수 있습니다. ',
      type: 'string[]',
    },
  ],

  run: async (config) => {
    await commitPrompt(config).then(createCommitMessage).then(executeCommit)
  },
})
