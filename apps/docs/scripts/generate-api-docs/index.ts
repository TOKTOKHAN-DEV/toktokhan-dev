import { successLog } from '@toktokhan-dev/node'
import { then } from '@toktokhan-dev/universal'

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
  flow(buildPackages, then(successLog('build packages'))),
  then(flow(handleDts, successLog('handle dts'))),
  then(flow(buildApiExtractorJson, successLog('build api-extractor.json'))),
  then(flow(handleApiExtractorJson, successLog('handle api-extractor.json'))),
  then(flow(buildApiDocs, then(successLog('build api docs markdown')))),
  then(flow(handleIndexMarkdown, successLog('handle index markdown'))),
  then(
    flow(
      handleApiDocFolderStructure,
      successLog('handle api-doc folder structure'),
    ),
  ),
  then(flow(cleanDts, successLog(`index.doc.d.ts file has been cleaned.`))),
)()
