import { CommitSource } from './commit-prompt'

export type CommitMessage = {
  subject: string
  details?: string
}

export const createCommitMessage = (arg: CommitSource): CommitMessage => {
  const {
    emoji,
    breakingChange,
    type,
    message,
    scope,
    detail,
    issueNumber,
    isCloseIssue,
    workspace,
  } = arg

  const subject = (() => {
    const _workspace =
      workspace?.length ?
        workspace.map((txt) => `${txt}-${type}`).join(',')
      : ''

    const _scope = scope ? `(${scope}):` : ':'
    return (_workspace || type) + _scope + ' ' + `${emoji || ''}${message}`
  })()

  let details = ''
  if (breakingChange) details += `BREAKING CHANGE: ${breakingChange}\n`
  if (detail) details += detail
  if (issueNumber) {
    if (isCloseIssue) details += '\nClose '
    else details += '\nIssue '
    details += '#' + issueNumber
  }

  return {
    subject,
    details,
  }
}
