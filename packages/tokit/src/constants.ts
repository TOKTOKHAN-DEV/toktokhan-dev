import os from 'os'
import path from 'path'

import { createPackageRoot } from '@toktokhan-dev/node'

const packageRoot = createPackageRoot(__dirname)

export const CACHE_PATH = path.join(os.homedir(), 'tokit', '.cache')
export const TEMP_PATH = path.join(os.homedir(), 'tokit', '.temp')
export const PACKAGE_PATH = packageRoot('package.json')
