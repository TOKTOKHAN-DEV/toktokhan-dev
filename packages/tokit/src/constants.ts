import { createPackageRoot } from '@toktokhan-dev/node'

const packageRoot = createPackageRoot(__dirname)

export const CACHE_PATH = packageRoot('.cache')
export const TEMP_PATH = packageRoot('.temp')
export const PACKAGE_PATH = packageRoot('package.json')
