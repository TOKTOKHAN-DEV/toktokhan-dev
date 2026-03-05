import { genApi } from '.'

genApi.run({
  swaggerSchemaUrls: [],
  output: 'test/generated/apis',
  includeReactQuery: true,
  splitDataContracts: true,
  includeReactSuspenseQuery: false,
  httpClientType: 'axios',
  instancePath: 'test/generated/apis/http-client',
  paginationSets: [
    {
      keywords: ['cursor'],
      nextKey: 'cursor',
    },
  ],
})
