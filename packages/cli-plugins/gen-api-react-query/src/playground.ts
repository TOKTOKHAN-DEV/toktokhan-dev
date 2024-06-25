import { genApi } from '.'

genApi.run({
  swaggerSchemaUrl: 'https://sales-api-dev.pluuug.com/openapi.json/',
  output: 'src/generated/apis',
  includeReactQuery: true,
  includeReactInfiniteQuery: true,
  httpClientType: 'fetch',
  instancePath: 'src/generated/apis/http-client',
  paginations: [
    {
      keywords: ['cursor'],
      nextKey: 'cursor',
    },
  ],
})
