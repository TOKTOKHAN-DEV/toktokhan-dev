import { defineCommand } from '@toktokhan-dev/cli'
import { cwd, withLoading } from '@toktokhan-dev/node'

import { omit } from 'lodash'
import { GenerateApiOutput } from 'swagger-typescript-api'

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
type SwaggerSchemaOption =
  | { swaggerSchemaUrl: string; swaggerSchemaUrls?: never }
  | { swaggerSchemaUrl?: never; swaggerSchemaUrls: string[] }

export type GenerateSwaggerApiConfig = SwaggerSchemaOption & {
  /** 조회할 스웨거의 url 혹은 file(yaml, json) 경로 입니다. 통상적으로
   * 백앤드 개발자에게 공유받은  api-swagger-url 의 '/openapi.json' 경로에 해당합니다.
   */
  /** 단일 스웨거 URL 또는 다중 스웨거 URL 중 하나만 입력할 수 있습니다 */
  /** 다중 URL 지원: 여러 스웨거 URL을 배열로 받아서 처리합니다. */
  /** 생성될 파일들이 위치할 경로입니다. */
  output: string
  /** 생성되는 코드의 useQuery, useInfiniteQuery 포함 여부 입니다. */
  includeReactQuery: boolean
  /** 생성되는 코드의 useSuspenseQuery, useSuspenseInfiniteQuery 포함 여부 입니다. */
  includeReactSuspenseQuery: boolean
  /** Api 의 axios 혹은 fetch 요청 instance 주소입니다. */
  instancePath: string
  /** http client 타입입니다. */
  httpClientType: 'axios' | 'fetch'
  /**
   * infiniteQuery 를 생성할 함수 필터 목록 입니다.
   * */
  paginationSets: PaginationConfig[]
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
    includeReactSuspenseQuery: false,
    httpClientType: 'axios',
    instancePath: GENERATE_SWAGGER_DATA.AXIOS_DEFAULT_INSTANCE_PATH,
    paginationSets: [
      {
        keywords: ['cursor'],
        nextKey: 'cursor',
      },
    ],
  },
  run: async (config) => {
    const isWebUrl = (string: string) =>
      string.startsWith('http://') || string.startsWith('https://')

    // 다중 URL 처리 로직 추가
    const urls = (() => {
      if ('swaggerSchemaUrls' in config) {
        return config.swaggerSchemaUrls as string[]
      }

      if ('swaggerSchemaUrl' in config) {
        return [config.swaggerSchemaUrl as string]
      }
      return []
    })()

    console.log('🔧 [MULTI-URL] Processing URLs:', urls)

    const coverPath = (config: GenerateSwaggerApiConfig, url: string) => {
      const { httpClientType, output } = config
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
        swaggerSchemaUrl: isWebUrl(url) ? url : cwd(url),
        output: cwd(output),
      }
    }

    // 각 URL별로 순차 처리
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]
      console.log(
        `🔧 [MULTI-URL] Processing URL ${i + 1}/${urls.length}: ${url}`,
      )

      const covered = coverPath(config, url)
      const parsed = await withLoading(
        `Parse Swagger ${i + 1}/${urls.length}`,
        'swaggerSchemaUrl' in covered ? covered.swaggerSchemaUrl : '',
        () => {
          return parseSwagger(omit(covered, 'swaggerSchemaUrls'))
        },
      )

      if (!parsed) {
        console.error(
          `Failed to generate api for URL ${i + 1}: swagger parse error.`,
        )
        continue
      }

      withLoading(
        'Write Swagger API', //
        covered.output,
        (spinner) => {
          writeSwaggerApiFile({
            input: parsed as GenerateApiOutput,
            output: covered.output,
            spinner,
            config,
          })
        },
      )

      // 최종 단계 포매팅: 디렉터리 전체를 한 번에 포맷
      await withLoading('Prettier format', covered.output, async () => {
        const fs = await import('fs')
        const pathMod = await import('path')
        const { prettierString } = await import('@toktokhan-dev/node')
        const listTsFiles = (dir: string): string[] => {
          const entries = fs.readdirSync(dir, { withFileTypes: true })
          const files: string[] = []
          for (const entry of entries) {
            const full = pathMod.resolve(dir, entry.name)
            if (entry.isDirectory()) {
              files.push(...listTsFiles(full))
            } else if (entry.isFile() && full.endsWith('.ts')) {
              files.push(full)
            }
          }
          return files
        }
        const files = listTsFiles(covered.output)
        for (const file of files) {
          try {
            const raw = fs.readFileSync(file, 'utf8')
            const formatted = await prettierString(raw, {
              parser: 'typescript',
              configPath: 'auto',
            })
            fs.writeFileSync(file, formatted)
          } catch {
            console.warn('Prettier final pass failed for', file)
          }
        }
      })
    }
  },
})

/**
 * 스마트 타입 병합 함수들
 */

// 타입 정의 파싱 함수
function parseTypeDefinitions(content: string): Record<string, string> {
  const types: Record<string, string> = {}
  // export type, interface, enum, const 패턴 매칭
  const typeRegex =
    /(export\s+(?:type|interface|enum|const)\s+(\w+)[\s\S]*?)(?=export\s+(?:type|interface|enum|const)\s+\w+|$)/g

  let match
  while ((match = typeRegex.exec(content)) !== null) {
    const typeName = match[2]
    const typeContent = match[1].trim()
    types[typeName] = typeContent
  }

  return types
}

// (deprecated) 타입 문자열 변환 로직은 병합 로직 내에서 직접 조립합니다.

// 스마트 타입 병합 함수
export function mergeTypeScriptContent(
  existing: string,
  newContent: string,
): string {
  // 1) import 구문 보존 및 병합 (양쪽 모두에서 수집)
  const importRegex = /^\s*import\s+[^;]*;\s*$/gm
  const sideEffectImportRegex = /^\s*import\s+['"][^'"]+['"];\s*$/gm

  const collectImports = (content: string) => {
    const imports = new Set<string>()
    const matchedA = content.match(importRegex) ?? []
    const matchedB = content.match(sideEffectImportRegex) ?? []
    ;[...matchedA, ...matchedB].forEach((line) => imports.add(line.trim()))
    const contentWithoutImports = content
      .replace(importRegex, '')
      .replace(sideEffectImportRegex, '')
    return { imports: Array.from(imports), body: contentWithoutImports }
  }

  const { imports: existingImports, body: existingBody } =
    collectImports(existing)
  const { imports: newImports, body: newBody } = collectImports(newContent)

  // import 병합: 새 파일 기준 우선 순서 + 기존에만 있는 import 추가
  const mergedImportSet = new Set<string>(newImports)
  existingImports.forEach((imp) => mergedImportSet.add(imp))
  const mergedImports = Array.from(mergedImportSet)

  // 2) 타입 선언 병합 (중복 제거)
  const typeBlockRegex =
    /(export\s+(?:type|interface|enum|const)\s+\w+[\s\S]*?)(?=export\s+(?:type|interface|enum|const)\s+\w+|$)/g

  const existingTypes = parseTypeDefinitions(existingBody)
  const newTypes = parseTypeDefinitions(newBody)

  console.log(
    '🔧 [SMART-MERGE] Existing types count:',
    Object.keys(existingTypes).length,
  )
  console.log('🔧 [SMART-MERGE] New types count:', Object.keys(newTypes).length)

  const mergedTypes = { ...existingTypes }
  let addedCount = 0
  let skippedCount = 0

  for (const [typeName, typeContent] of Object.entries(newTypes)) {
    if (mergedTypes[typeName]) {
      console.log('🔧 [SMART-MERGE] Skipping duplicate type:', typeName)
      skippedCount++
    } else {
      mergedTypes[typeName] = typeContent
      addedCount++
    }
  }

  console.log(
    '🔧 [SMART-MERGE] Added types:',
    addedCount,
    'Skipped duplicates:',
    skippedCount,
  )

  const mergedTypesString = Object.values(mergedTypes).join('\n\n')

  // 3) 기타 코드(타입/임포트 외)는 "새로운 내용"을 기준으로 유지
  const removeHeaderComment = (content: string) => {
    // 파일 상단의 블록 코멘트 혹은 연속된 라인 코멘트 제거
    const blockCommentAtTop = content.match(/^\s*\/\*[\s\S]*?\*\/\s*/)
    if (blockCommentAtTop) {
      return content.slice(blockCommentAtTop[0].length)
    }
    const lineCommentsAtTop = content.match(/^(?:\s*\/\/.*\n)+/)
    if (lineCommentsAtTop) {
      return content.slice(lineCommentsAtTop[0].length)
    }
    return content
  }

  // 새 본문에서 타입 블록 제거 후 남은 코드
  const newBodyWithoutTypes = (newBody || '').replace(typeBlockRegex, '')
  const otherCodeFromNew = removeHeaderComment(newBodyWithoutTypes).trim()

  // 4) 헤더 주석은 새 컨텐츠 상단의 헤더가 있으면 우선 사용, 없으면 기존의 것을 사용
  const pickHeader = (content: string) => {
    const block = content.match(/^\s*(\/\*[\s\S]*?\*\/)\s*/)
    if (block) return block[1]
    const lines = content.match(/^(?:\s*\/\/.*\n)+/)
    if (lines) return lines[0].trimEnd()
    return ''
  }

  const headerFromNew = pickHeader(newContent)
  const headerFromExisting = pickHeader(existing)
  const header = headerFromNew || headerFromExisting

  // 5) 최종 조립
  const parts: string[] = []
  if (header) parts.push(header)
  if (mergedImports.length > 0) parts.push(mergedImports.join('\n'))
  if (mergedTypesString.trim().length > 0) parts.push(mergedTypesString)
  if (otherCodeFromNew.length > 0) parts.push(otherCodeFromNew)

  return parts.join('\n\n') + '\n'
}
