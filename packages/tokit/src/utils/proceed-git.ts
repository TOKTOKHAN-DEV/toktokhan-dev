import { $ } from '@toktokhan-dev/node'
import { awaited } from '@toktokhan-dev/universal'

import { flow } from 'lodash'
import simpleGit from 'simple-git'

type RemoteGitParams = {
  baseDir: string
  cloneUrl: string
}

export const proceedGit = async ({ cloneUrl, baseDir }: RemoteGitParams) => {
  const git = simpleGit({ baseDir })

  try {
    await flow(
      async () => $('rm', ['-rf', '.git']),
      // awaited(infoLog('Remove .git')),
      awaited(() => git.init()),
      // awaited(infoLog('Initialized git repository')),
      awaited(() => git.add('.')),
      // awaited(infoLog('Added all files')),
      awaited(() => git.commit('Upload TOKIT`s template')),
      // awaited(infoLog('Committed changes')),
      awaited(() => git.branch(['-M', 'main'])),
      // awaited(infoLog('Renamed branch to main')),
      awaited(() => git.addRemote('origin', cloneUrl)),
      // awaited(infoLog('Added remote origin')),
      awaited(() => git.push(['-u', 'origin', 'main'])),
      // awaited(infoLog('Pushed to origin/main')),
    )()
  } catch (error) {
    console.error('Error git process:', error)
  }
}
