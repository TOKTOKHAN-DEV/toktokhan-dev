import { execSync } from 'child_process'
import { readFileSync } from 'fs'

import { removeStr } from '@toktokhan-dev/universal'

import { flow } from 'lodash'

export const getChangesetMd = () => {
  const isAdded = (message: string) => message.startsWith('A ')
  const isModified = (message: string) => message.startsWith('M ')
  const isChangesetMd = (path: string) => path.match(/\.changeset\/.*\.md/)
  const isSome =
    <T>(fns: ((val: T) => boolean)[]) =>
    (val: T) =>
      fns.some((fn) => fn(val))

  const changesetFile = execSync('git status --short') //
    .toString()
    .split('\n')
    .filter(isSome([isAdded, isModified]))
    .map(flow(removeStr('A  '), removeStr('M  ')))
    .find(isChangesetMd)

  if (!changesetFile) return null

  const content = readFileSync(changesetFile, 'utf8')
  const [summary, _, ...detail] = removeStr(
    /---\n(.*)\n---\n\n/g,
    content,
  ).split('\n')

  return { summary, detail: detail.join('\n') }
}
