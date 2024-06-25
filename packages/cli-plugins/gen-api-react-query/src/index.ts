import { defineCommand } from '@toktokhan-dev/cli'
import { cwd, withLoading } from '@toktokhan-dev/node'

import { HttpClientType } from 'swagger-typescript-api'

import { GENERATE_SWAGGER_DATA } from './constants'
import { parseSwagger } from './parse-swagger'
import { writeSwaggerApiFile } from './write-swagger'

/**
 * `Swagger` 의 json 을 조회하여 타입정의와 `api class`, `react-query` 관련 모듈을 생성합니다.
 * `axios` 를 사용하는 환경에서 사용가능합니다.
 *
 * @packageDocumentation
 */

export type GenerateFn = (param: {
  apiInstanceName: string
  functionName: string
  pagination: { keywords: string[]; nextKey: string }
}) => string

export interface PaginationConfig {
  /** api 의 queryParams key 에 keywords 가 포함되어 있는 항목만 생성됩니다. 키워드 배열은 AND 연산으로써 사용됩니다. */
  keywords: string[]
  /** InfiniteQuery 의 nextPage 와 nextPageParam 을 구하는 함수를 작성하기 위해 사용됩니다. */
  nextKey: string
  /**
   * InfiniteQuery 의 initialPage 를 커스텀하기 위해 사용됩니다.
   */
  initialPageParam?: string | GenerateFn
  /** InfiniteQuery 의 nextPage 를 구하는 함수를 커스텀하기 위해 사용됩니다. */
  getNextPage?: string | GenerateFn
  /** InfiniteQuery 의 nextPageParam 을 구하는 함수를 커스텀하기 위해 사용됩니다. */
  getNextPageParam?: string | GenerateFn
}

/**
 * @category Types
 */
export interface GenerateSwaggerApiConfig {
  /** 조회할 스웨거의 url 혹은 file(yaml, json) 경로 입니다. 통상적으로
   * 백앤드 개발자에게 공유받은  api-swagger-url 의 '/openapi.json' 경로에 해당합니다.
   */
  swaggerSchemaUrl: string
  /** 생성될 파일들이 위치할 경로입니다. */
  output: string
  /** 생성되는 코드의 React Query 포함 여부 입니다.
   *  해당 옵션이 false 일경우 infiniteQuery 를 포함한 모든 Query 가 생성되지 않습니다. */
  includeReactQuery: boolean
  /** 생성되는 코드의 InfiniteQuery 포함 여부 입니다. */
  includeReactInfiniteQuery: boolean
  /** Api 의 axios 혹은 fetch 요청 instance 주소입니다. */
  instancePath: string
  /** http client 타입입니다. */
  httpClientType: HttpClientType
  /**
   * infiniteQuery 를 생성할 함수 필터 목록 입니다.
   * */
  paginations: PaginationConfig[]
}

/**
 * @category Commands
 */
export const genApi = defineCommand<'gen:api', GenerateSwaggerApiConfig>({
  name: 'gen:api',
  description: 'swagger schema 를 기반으로 api 를 생성합니다.',
  cliOptions: [],
  default: {
    swaggerSchemaUrl: '',
    output: 'src/generated/apis',
    includeReactQuery: true,
    includeReactInfiniteQuery: true,
    httpClientType: 'axios',
    instancePath: GENERATE_SWAGGER_DATA.AXIOS_DEFAULT_INSTANCE_PATH,
    paginations: [
      {
        keywords: ['cursor'],
        nextKey: 'cursor',
      },
    ],
  },
  run: async (config) => {
    const isWebUrl = (string: string) =>
      string.startsWith('http://') || string.startsWith('https://')

    const coverPath = (config: GenerateSwaggerApiConfig) => {
      const { httpClientType, swaggerSchemaUrl, output } = config
      const { AXIOS_DEFAULT_INSTANCE_PATH, FETCH_DEFAULT_INSTANCE_PATH } =
        GENERATE_SWAGGER_DATA

      const instancePath =
        config.instancePath ||
        (httpClientType === 'axios' ?
          AXIOS_DEFAULT_INSTANCE_PATH
        : FETCH_DEFAULT_INSTANCE_PATH)

      return {
        ...config,
        instancePath,
        swaggerSchemaUrl:
          isWebUrl(swaggerSchemaUrl) ? swaggerSchemaUrl : cwd(swaggerSchemaUrl),
        output: cwd(output),
      }
    }

    const covered = coverPath(config)
    const parsed = await withLoading(
      `Parse Swagger`,
      covered.swaggerSchemaUrl,
      () => {
        return parseSwagger(covered)
      },
    )
    if (!parsed) {
      console.error('Failed to generate api: swagger parse error.')
      return
    }
    withLoading(
      'Write Swagger API', //
      covered.output,
      (spinner) => {
        writeSwaggerApiFile({ input: parsed, output: covered.output, spinner })
      },
    )
  },
})
