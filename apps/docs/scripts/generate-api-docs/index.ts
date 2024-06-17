import { successLog } from '@toktokhan-dev/node'
import { awaitted } from '@toktokhan-dev/universal'

import { flow } from 'lodash/fp'

import { buildApiDocs } from './flows/build-api-docs'
import { buildApiExtractorJson } from './flows/build-api-extractor-json'
import { buildPackages } from './flows/build-packages'
import { cleanDts } from './flows/clean-dts'
import { handleApiDocFolderStructure } from './flows/handle-api-doc-folder-structure'
import { handleApiExtractorJson } from './flows/handle-api-extractor-json'
import { handleDts } from './flows/handle-dts'
import { handleIndexMarkdown } from './flows/handle-index-markdown'

flow(
  flow(buildPackages, awaitted(successLog('build packages'))),
  awaitted(flow(handleDts, successLog('handle dts'))),
  awaitted(flow(buildApiExtractorJson, successLog('build api-extractor.json'))),
  awaitted(
    flow(handleApiExtractorJson, successLog('handle api-extractor.json')),
  ),
  awaitted(flow(buildApiDocs, awaitted(successLog('build api docs markdown')))),
  awaitted(flow(handleIndexMarkdown, successLog('handle index markdown'))),
  awaitted(
    flow(
      handleApiDocFolderStructure,
      successLog('handle api-doc folder structure'),
    ),
  ),
  awaitted(flow(cleanDts, successLog(`index.doc.d.ts file has been cleaned.`))),
)()
