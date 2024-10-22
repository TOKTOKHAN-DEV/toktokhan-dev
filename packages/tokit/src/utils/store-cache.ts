import fs from 'fs'

import simpleGit from 'simple-git'

import { PACKAGE_MAP } from '../constants/package-map'
import { InitialQuestionResponse } from '../prompts/initial'
import { cachedPackage } from './cached-package'
import { removeGit } from './remove-git'

export const storeCache = async (config: InitialQuestionResponse) => {
  const cachePath = cachedPackage(config.template, config.version)
  fs.mkdirSync(cachePath, { recursive: true })

  const git = simpleGit({ baseDir: cachePath })
  const pack = PACKAGE_MAP[config.template]

  await git.clone(`https://github.com/${pack.owner}/${pack.repo}.git`, '.', {
    '--branch': config.version,
  })

  await removeGit(cachePath)
}
