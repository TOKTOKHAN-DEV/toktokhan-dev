import { $ } from '@toktokhan-dev/node'
import { awaitted } from '@toktokhan-dev/universal'

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
      // awaitted(infoLog('Remove .git')),
      awaitted(() => git.init()),
      // awaitted(infoLog('Initialized git repository')),
      awaitted(() => git.add('.')),
      // awaitted(infoLog('Added all files')),
      awaitted(() => git.commit('Upload TOKIT`s template')),
      // awaitted(infoLog('Committed changes')),
      awaitted(() => git.branch(['-M', 'main'])),
      // awaitted(infoLog('Renamed branch to main')),
      awaitted(() => git.addRemote('origin', cloneUrl)),
      // awaitted(infoLog('Added remote origin')),
      awaitted(() => git.push(['-u', 'origin', 'main'])),
      // awaitted(infoLog('Pushed to origin/main')),
    )()
  } catch (error) {
    console.error('Error git process:', error)
  }
}
