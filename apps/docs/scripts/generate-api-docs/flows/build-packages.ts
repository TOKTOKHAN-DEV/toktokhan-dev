import { $ } from '@toktokhan-dev/node'

import { byProcessCode } from '../utils'

export const buildPackages = () =>
  new Promise((resolve, reject) =>
    $('pnpm', ['build:packages'], {
      stdio: 'inherit',
    }).on('close', byProcessCode(resolve, reject, 'Failed to build packages.')),
  )
