import { defineCommand } from '../../utils'
import { commitPrompt } from './commit-prompt'
import {
  CommitType,
  INITIAL_COMMIT_TYPES,
} from './constants/initial-commit-types'
import { createCommitMessage } from './create-commit-message'
import { executeCommit } from './excute-commit'

/**
 * 커밋 명령어의 설정입니다.
 *
 * @category Type
 */
export type CommitConfig = {
  /** 스코프 검색에 포함할 경로입니다. */
  scopePath?: string
  /** 스코프검색에서 제외할 경로들의 glob 패턴 입니다. */
  ignored?: string[]
  /** 모노래포 사용시, workspace 로 커밋 범위 설정할수 있습니다. */
  workspaces?: string[]
  /** 커밋 타입을 지정합니다. */
  types?: CommitType[] | ((initial: CommitType[]) => CommitType[])
}

export const commit = defineCommand<'commit', CommitConfig>({
  name: 'commit',
  description: '일관된 컨벤션으로 커밋을 합니다.',
  default: {
    types: INITIAL_COMMIT_TYPES,
    ignored: [
      'node_modules',
      '.next',
      'lib',
      '__tests__',
      '.bundle',
      '.idea',
      'android',
      'ios',
      'dist',
      'index.*',
    ],
    workspaces: [],
  },
  cliOptions: [
    {
      alias: 's',
      name: 'scopePath',
      description: '스코프 검색에 포함할 경로입니다.',
      type: 'string',
    },
    {
      alias: 'i',
      name: 'ignored',
      description: '스코프검색에서 제외할 경로들의 glob 패턴 입니다',
      type: 'string[]',
    },
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
