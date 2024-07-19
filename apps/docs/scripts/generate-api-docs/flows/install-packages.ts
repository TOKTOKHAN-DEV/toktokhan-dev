import { $ } from '@toktokhan-dev/node'

import { byProcessCode } from '../utils'

export const installPackages = () =>
  new Promise((resolve, reject) =>
    $('pnpm', ['install'], {
      stdio: 'inherit',
    }).on(
      'close',
      byProcessCode(resolve, reject, 'Failed to install packages.'),
    ),
  )
