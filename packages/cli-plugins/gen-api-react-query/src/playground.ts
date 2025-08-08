import { genApi } from '.'

genApi.run({
  swaggerSchemaUrls: [
    'https://service-api.dev.tagme.my/v3/api-docs/6.%20ADMIN%20API',
    'https://service-api.dev.tagme.my/v3/api-docs/1.%20%EC%9D%BC%EB%B0%98%20API',
  ],
  output: 'test/generated/apis',
  includeReactQuery: true,
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
