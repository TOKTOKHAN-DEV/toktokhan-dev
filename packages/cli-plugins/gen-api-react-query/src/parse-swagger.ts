import path from 'path'

import { generateApi } from 'swagger-typescript-api'

import { GENERATE_SWAGGER_DATA } from './constants'

import { GenerateSwaggerApiConfig } from '.'

const {
  EXTRA_TEMPLATE_FOLTER,
  CUSTOM_AXIOS_TEMPLATE_FOLDER,
  CUSTOM_FETCH_TEMPLATE_FOLDER,
  QUERY_HOOK_INDICATOR,
} = GENERATE_SWAGGER_DATA

export const parseSwagger = (config: GenerateSwaggerApiConfig) =>
  generateApi({
    templates:
      config.httpClientType === 'axios' ?
        CUSTOM_AXIOS_TEMPLATE_FOLDER
      : CUSTOM_FETCH_TEMPLATE_FOLDER,
    modular: true,
    moduleNameFirstTag: true,
    extractEnums: true,
    addReadonly: true,
    unwrapResponseData: true,
    url: config.swaggerSchemaUrl,
    input: config.swaggerSchemaUrl,
    httpClientType: config.httpClientType, // "axios" or "fetch"
    typeSuffix: 'Type',
    prettier: {
      printWidth: 120,
    },
    extraTemplates: [
      {
        name: 'react-query-type.ts', //
        path: path.resolve(EXTRA_TEMPLATE_FOLTER, 'react-query-type.eta'),
      },
      {
        name: 'util-types.ts', //
        path: path.resolve(EXTRA_TEMPLATE_FOLTER, 'util-types.eta'),
      },
      {
        name: 'param-serializer-by.ts', //
        path: path.resolve(EXTRA_TEMPLATE_FOLTER, 'param-serializer-by.eta'),
      },
    ],
    hooks: {
      onPrepareConfig: (defaultConfig) => {
        return {
          ...defaultConfig,
          myConfig: { QUERY_HOOK_INDICATOR, ...config },
        }
      },
    },
  })
