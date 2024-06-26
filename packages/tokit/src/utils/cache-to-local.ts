import fs from 'fs'
import path from 'path'

import { InitialQuestionResponse } from '../prompts/initial'
import { cachedPackage } from '../utils/cached-package'
import { modifyPackageJson } from '../utils/modify-package-json'

export async function cacheToLocal(config: InitialQuestionResponse) {
  const cachePath = cachedPackage(config.template, config.version)
  fs.cpSync(cachePath, path.resolve(config.pathname), { recursive: true })

  await modifyPackageJson(
    { name: config.projectname, version: '0.0.0' },
    config.pathname,
  )
}
