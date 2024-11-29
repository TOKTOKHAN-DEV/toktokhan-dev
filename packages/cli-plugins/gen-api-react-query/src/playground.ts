import { genApi } from '.'

genApi.run({
  swaggerSchemaUrl: 'https://sales-api-dev.pluuug.com/openapi.json/',
  output: 'test/generated/apis',
  includeReactQuery: true,
  includeReactSuspenseQuery: true,
  httpClientType: 'fetch',
  instancePath: 'test/generated/apis/http-client',
  paginationSets: [
    {
      keywords: ['cursor'],
      nextKey: 'cursor',
    },
  ],
})
