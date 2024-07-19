import { $ } from '@toktokhan-dev/node'

import { byProcessCode } from '../utils'

export const buildApiExtractorJson = () =>
  new Promise((resolve, reject) =>
    $('turbo', ['api-extractor'], {
      stdio: 'inherit',
    }).on('close', byProcessCode(resolve, reject, 'Failed to api extractor.')),
  )
