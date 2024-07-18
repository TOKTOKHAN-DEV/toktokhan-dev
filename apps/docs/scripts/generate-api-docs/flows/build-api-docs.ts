import { $ } from '@toktokhan-dev/node'
import { awaited } from '@toktokhan-dev/universal'

import { flow } from 'lodash/fp'

const buildApiDocumentorPlugin = () =>
  new Promise((resolve, reject) =>
    $('pnpm', ['--filter', '@toktokhan-dev/doc-plugin', 'build'], {
      stdio: 'inherit',
    })
      .on('close', resolve)
      .on('error', (error) => reject(error)),
  )

const buildApiMakrdownDocs = () =>
  new Promise((resolve, reject) =>
    $(
      'api-documenter',
      [
        'generate',
        '-i',
        './apps/docs/api-extractor',
        '-o',
        './apps/docs/docs/api/',
      ],
      {
        stdio: 'inherit',
      },
    )
      .on('close', resolve)
      .on('error', (error) => reject(error)),
  )

export const buildApiDocs = flow(
  buildApiDocumentorPlugin,
  awaited(buildApiMakrdownDocs),
)
