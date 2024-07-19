import { successLog } from '@toktokhan-dev/node'
import { awaited } from '@toktokhan-dev/universal'

import { flow } from 'lodash/fp'

import { buildApiDocs } from './flows/build-api-docs'
import { buildApiExtractorJson } from './flows/build-api-extractor-json'
import { buildPackages } from './flows/build-packages'
import { cleanDts } from './flows/clean-dts'
import { handleApiDocFolderStructure } from './flows/handle-api-doc-folder-structure'
import { handleApiExtractorJson } from './flows/handle-api-extractor-json'
import { handleDts } from './flows/handle-dts'
import { handleIndexMarkdown } from './flows/handle-index-markdown'
import { installPackages } from './flows/install-packages'

flow(
  flow(installPackages, awaited(successLog('install packages'))),
  awaited(flow(buildPackages, awaited(successLog('build packages')))),
  awaited(flow(handleDts, successLog('handle dts'))),
  awaited(flow(buildApiExtractorJson, successLog('build api-extractor.json'))),
  awaited(
    flow(handleApiExtractorJson, successLog('handle api-extractor.json')),
  ),
  awaited(flow(buildApiDocs, awaited(successLog('build api docs markdown')))),
  awaited(flow(handleIndexMarkdown, successLog('handle index markdown'))),
  awaited(
    flow(
      handleApiDocFolderStructure,
      successLog('handle api-doc folder structure'),
    ),
  ),
  awaited(flow(cleanDts, successLog(`index.doc.d.ts file has been cleaned.`))),
)()
