import { $ } from '@toktokhan-dev/node'
import { then } from '@toktokhan-dev/universal'

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
      // then(infoLog('Remove .git')),
      then(() => git.init()),
      // then(infoLog('Initialized git repository')),
      then(() => git.add('.')),
      // then(infoLog('Added all files')),
      then(() => git.commit('Upload TOKIT`s template')),
      // then(infoLog('Committed changes')),
      then(() => git.branch(['-M', 'main'])),
      // then(infoLog('Renamed branch to main')),
      then(() => git.addRemote('origin', cloneUrl)),
      // then(infoLog('Added remote origin')),
      then(() => git.push(['-u', 'origin', 'main'])),
      // then(infoLog('Pushed to origin/main')),
    )()
  } catch (error) {
    console.error('Error git process:', error)
  }
}
