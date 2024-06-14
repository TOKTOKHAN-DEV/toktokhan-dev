import { $ } from '@toktokhan-dev/node'

import { CommitMessage } from './create-commit-message'

export const executeCommit = ({ subject, details }: CommitMessage) => {
  const command = ['commit', '-m', subject]
  const conditionalCommand = details ? [...command, '-m', details] : command

  $('git', conditionalCommand)
}
