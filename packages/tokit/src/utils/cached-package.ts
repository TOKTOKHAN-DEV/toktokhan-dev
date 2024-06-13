import path from 'path'

import { CACHE_PATH } from '../constants'

export const cachedPackage = (name: string, version: string) =>
  path.resolve(CACHE_PATH, name, `${version}`)
