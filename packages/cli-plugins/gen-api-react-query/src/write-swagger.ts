import fs from 'fs'
import path from 'path'

import { prettierFile, prettierString } from '@toktokhan-dev/node'

import { camelCase, upperFirst } from 'lodash'
import { GenerateApiOutput } from 'swagger-typescript-api'

import { GENERATE_SWAGGER_DATA } from './constants'

import { GenerateSwaggerApiConfig, mergeTypeScriptContent } from '.'

const {
  TYPE_FILE,
  UTIL_FILE,
  QUERY_HOOK_INDICATOR,
  USE_SUSPENSE_QUERY_HOOK_INDICATOR,
} = GENERATE_SWAGGER_DATA

export const writeSwaggerApiFile = (params: {
  input: GenerateApiOutput
  output: string
  config: GenerateSwaggerApiConfig
  spinner?: any
}) => {
  const { input, output, spinner, config } = params

  input.files.forEach(
    async ({ fileName, fileContent: content, fileExtension }) => {
      const name = fileName + fileExtension
      try {
        const isTypeFile = TYPE_FILE.includes(name)
        const isUtilFile = UTIL_FILE.includes(name)
        const isHttpClient = name === 'http-client.ts'
        const isApiFile = content?.includes(QUERY_HOOK_INDICATOR)
        const filename = name.replace('.ts', '')

        const getTargetFolder = () => {
          if (isUtilFile) return path.resolve(output, '@utils')
          if (isTypeFile) return path.resolve(output, '@types')
          if (isHttpClient) return path.resolve(output, `@${filename}`)
          return path.resolve(output, filename)
        }
        const targetFolder = getTargetFolder()
        fs.mkdirSync(targetFolder, { recursive: true })
        if (spinner) spinner.info(`generated: ${targetFolder}`)
        if (isHttpClient) {
          generate(path.resolve(targetFolder, 'index.ts'), content)
          return
        }
        if (isApiFile) {
          const { apiContents, hookParts } = splitHookContents(
            filename,
            content,
          )
          generatePretty(
            path.resolve(targetFolder, `${filename}.api.ts`),
            apiContents,
          )

          if (config.includeReactQuery) {
            generatePretty(
              path.resolve(targetFolder, `${filename}.query.ts`),
              hookParts[0],
            )
          }

          if (config.includeReactSuspenseQuery) {
            generatePretty(
              path.resolve(targetFolder, `${filename}.suspenseQuery.ts`),
              hookParts[1],
            )
          }

          return
        }
        generate(path.resolve(targetFolder, name), content)
      } catch (err) {
        console.error(err)
      }
    },
  )
}

async function generatePretty(path: string, contents: string) {
  // prettier-plugin-organize-imports가 설치되어 있으면 사용, 없으면 스킵
  let organized = contents
  try {
    organized = await prettierString(contents, {
      parser: 'babel-ts',
      plugins: ['prettier-plugin-organize-imports'],
    })
  } catch (err) {
    // 플러그인이 없거나 에러 발생 시 원본 사용
    console.warn(
      '⚠️  prettier-plugin-organize-imports not found, skipping import organization',
    )
  }

  const formatted = await prettierString(organized, {
    parser: 'typescript',
    configPath: 'auto',
  })

  generate(path, formatted)
}

function generate(path: string, contents: string) {
  // 기존 파일이 있으면 읽어서 병합
  let existingContent = ''
  try {
    if (fs.existsSync(path)) {
      existingContent = fs.readFileSync(path, 'utf8')
      console.log('🔧 [SMART-MERGE] Found existing file, merging:', path)
    }
  } catch (err) {
    console.log('🔧 [SMART-MERGE] No existing file found:', path)
  }

  // 기존 내용이 있으면 병합
  if (existingContent) {
    // 스마트 병합: 중복 타입 제거
    const mergedContent = mergeTypeScriptContent(existingContent, contents)
    fs.writeFileSync(path, mergedContent)
    console.log('🔧 [SMART-MERGE] Smart merged content for:', path)
  } else {
    fs.writeFileSync(path, contents)
    console.log('🔧 [SMART-MERGE] Created new file:', path)
  }
}

export function splitHookContents(filename: string, content: string) {
  const [_apiContent, _hookContent] = content.split(QUERY_HOOK_INDICATOR)
  const _hookParts = _hookContent.split(USE_SUSPENSE_QUERY_HOOK_INDICATOR)

  const lastImport = getLastImportLine(content)
  const lines = content.split('\n')

  const importArea = [
    `import { ${upperFirst(camelCase(filename))}Api } from './${filename}.api';`,
    ...lines.slice(0, lastImport),
  ].join('\n')

  return {
    apiContents: _apiContent,
    hookParts: _hookParts.map((d) => importArea + d),
  }
}

function getLastImportLine(content: string) {
  return (
    Math.max(
      ...content
        .split('\n')
        .map((line, idx) => ({ idx, has: /from ('|").*('|");/.test(line) }))
        .filter(({ has }) => has)
        .map(({ idx }) => idx),
    ) + 1
  )
}
