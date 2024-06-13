import { existsSync } from 'fs'
import path from 'path'

import { cachedPackage } from './cached-package'

export const isCached = (name: string, version: string) =>
  existsSync(path.resolve(cachedPackage(name, version), 'package.json'))
