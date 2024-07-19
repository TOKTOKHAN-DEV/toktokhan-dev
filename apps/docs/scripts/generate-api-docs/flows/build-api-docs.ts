import { $ } from '@toktokhan-dev/node'
import { awaited } from '@toktokhan-dev/universal'

import { flow } from 'lodash/fp'

import { byProcessCode } from '../utils'

const buildApiDocumenterPlugin = () =>
  new Promise((resolve, reject) =>
    $('pnpm', ['--filter', '@toktokhan-dev/doc-plugin', 'build'], {
      stdio: 'inherit',
    })
      .on('close', resolve)
      .on('error', (error) => reject(error)),
  )

const buildApiMarkdownDocs = () =>
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
    ).on('close', byProcessCode(resolve, reject, 'Failed to build api docs.')),
  )

export const buildApiDocs = flow(
  buildApiDocumenterPlugin,
  awaited(buildApiMarkdownDocs),
)
