import { genApi } from '.'

genApi.run({
  swaggerSchemaUrl: 'https://sales-api-dev.pluuug.com/openapi.json/',
  output: 'src/generated/apis',
  includeReactQuery: true,
  includeReactInfiniteQuery: true,
  httpClientType: 'axios',
  instancePath: '@apis/_axios/instance',
  paginations: [
    {
      keywords: ['cursor'],
      nextKey: 'cursor',
    },
  ],
})
