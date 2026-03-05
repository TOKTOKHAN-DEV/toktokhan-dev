import fs from 'fs'
import path from 'path'

import { prettierString } from '@toktokhan-dev/node'

import { camelCase, upperFirst } from 'lodash'
import { GenerateApiOutput } from 'swagger-typescript-api'

import { GENERATE_SWAGGER_DATA } from './constants'
import { ClassificationResult, classifyTypes } from './utils/type-classifier'

import { GenerateSwaggerApiConfig, mergeTypeScriptContent } from '.'

const {
  TYPE_FILE,
  UTIL_FILE,
  QUERY_HOOK_INDICATOR,
  USE_SUSPENSE_QUERY_HOOK_INDICATOR,
} = GENERATE_SWAGGER_DATA

export const writeSwaggerApiFile = async (params: {
  input: GenerateApiOutput
  output: string
  config: GenerateSwaggerApiConfig
  spinner?: any
}) => {
  const { input, output, spinner, config } = params

  // === Pre-analysis (splitDataContracts 모드) ===
  // for...of 전에 classification을 완료하여 import 후처리에 사용
  let classificationResult: ClassificationResult | null = null

  if (config.splitDataContracts) {
    const dataContractsFile = input.files.find(
      (f) => f.fileName + f.fileExtension === 'data-contracts.ts',
    )

    if (dataContractsFile?.fileContent) {
      // GenerateApiOutput은 configuration을 런타임에 포함하지만 타입 정의에서 미노출
      const configuration = (input as Record<string, any>).configuration
      const routesCombined = configuration?.routes?.combined

      classificationResult = classifyTypes(
        dataContractsFile.fileContent,
        routesCombined,
      )
    }
  }

  // === Pass 1: for...of 루프 (기존 로직 + splitDataContracts 분기) ===
  for (const { fileName, fileContent: content, fileExtension } of input.files) {
    const name = fileName + fileExtension
    try {
      const isTypeFile = TYPE_FILE.includes(name)
      const isUtilFile = UTIL_FILE.includes(name)
      const isHttpClient = name === 'http-client.ts'
      const isApiFile = content?.includes(QUERY_HOOK_INDICATOR)
      const filename = name.replace('.ts', '')

      // splitDataContracts: data-contracts.ts 쓰기 억제
      if (
        isTypeFile &&
        name === 'data-contracts.ts' &&
        config.splitDataContracts
      ) {
        // 디스크에 쓰지 않음 — pre-analysis에서 이미 content를 처리함
        continue
      }

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
        continue
      }
      if (isApiFile) {
        // splitDataContracts: import 후처리 (splitHookContents 호출 전)
        let processedContent = content
        if (config.splitDataContracts && classificationResult) {
          processedContent = rewriteDataContractsImport(
            content,
            filename,
            classificationResult,
          )
        }

        const { apiContents, hookParts } = splitHookContents(
          filename,
          processedContent,
        )
        await generatePretty(
          path.resolve(targetFolder, `${filename}.api.ts`),
          apiContents,
        )

        if (config.includeReactQuery) {
          await generatePretty(
            path.resolve(targetFolder, `${filename}.query.ts`),
            hookParts[0],
          )
        }

        if (config.includeReactSuspenseQuery) {
          await generatePretty(
            path.resolve(targetFolder, `${filename}.suspenseQuery.ts`),
            hookParts[1],
          )
        }

        continue
      }
      generate(path.resolve(targetFolder, name), content)
    } catch (err) {
      console.error(err)
    }
  }

  // === Post-step: 분할 contracts 파일 생성 (동기 작업이므로 async forEach 영향 없음) ===
  if (config.splitDataContracts && classificationResult) {
    const { moduleTypes, sharedTypes, parsedTypes } = classificationResult

    // 모듈별 contracts 파일 생성
    for (const [moduleName, typeNames] of moduleTypes.entries()) {
      const moduleFolder = path.resolve(output, moduleName)
      fs.mkdirSync(moduleFolder, { recursive: true })
      const moduleContent = buildContractsFileContent(
        typeNames,
        parsedTypes,
        sharedTypes,
      )
      generate(
        path.resolve(moduleFolder, `${moduleName}.contracts.ts`),
        moduleContent,
      )
    }

    // common-contracts 파일 생성 (공유 타입이 있을 때만)
    if (sharedTypes.length > 0) {
      const commonFolder = path.resolve(output, '@types')
      fs.mkdirSync(commonFolder, { recursive: true })
      const commonContent = buildContractsFileContent(sharedTypes, parsedTypes)
      generate(path.resolve(commonFolder, 'common-contracts.ts'), commonContent)
    }
  }
}

/**
 * 타입 이름 목록과 파싱된 타입 블록으로 contracts 파일 내용을 생성합니다.
 * @internal — exported for testing
 */
export function buildContractsFileContent(
  typeNames: string[],
  parsedTypes: Record<string, string>,
  sharedTypeNames?: string[],
): string {
  const header = `/* eslint-disable */
/* tslint:disable */
/**
 * !DO NOT EDIT THIS FILE!
 *
 * This file was auto-generated by tok-cli.config.ts 에서 설정된 gen:api 명령어로 생성되었습니다.
 */\n`

  const blocks = typeNames.map((name) => parsedTypes[name]).filter(Boolean)
  const bodyContent = blocks.join('\n\n')

  // module contracts가 shared type을 참조하면 import 추가
  let importSection = ''
  if (sharedTypeNames && sharedTypeNames.length > 0) {
    const referencedShared = sharedTypeNames.filter((sharedType) => {
      const escaped = sharedType.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      return new RegExp(`\\b${escaped}\\b`).test(bodyContent)
    })
    if (referencedShared.length > 0) {
      importSection =
        `import { ${referencedShared.join(', ')} } from '../@types/common-contracts';\n\n`
    }
  }

  return header + '\n' + importSection + bodyContent + '\n'
}

/**
 * api 파일의 data-contracts import를 모듈별 contracts + common-contracts로 교체합니다.
 *
 * import의 `[^}]+`는 negated character class이므로 멀티라인도 매칭됩니다.
 * (prettier가 줄바꿈해도 안전)
 * @internal — exported for testing
 */
export function rewriteDataContractsImport(
  content: string,
  filename: string,
  classification: ClassificationResult,
): string {
  const moduleTypeNames = classification.moduleTypes.get(filename) || []
  const sharedTypeNames = classification.sharedTypes

  // 현재 api 파일에서 실제로 사용하는 타입만 필터링
  const allImportedTypes = extractImportedTypeNames(content)

  const usedModuleTypes = moduleTypeNames.filter((t) => allImportedTypes.has(t))
  const usedSharedTypes = sharedTypeNames.filter((t) => allImportedTypes.has(t))

  // 기존 data-contracts import 라인을 찾아서 교체
  const importRegex =
    /import\s*\{[^}]+\}\s*from\s*['"]\.\.\/[@]types\/data-contracts['"];?/

  const newImports: string[] = []
  if (usedModuleTypes.length > 0) {
    newImports.push(
      `import { ${usedModuleTypes.join(', ')} } from './${filename}.contracts';`,
    )
  }
  if (usedSharedTypes.length > 0) {
    newImports.push(
      `import { ${usedSharedTypes.join(', ')} } from '../@types/common-contracts';`,
    )
  }

  // import가 하나도 없으면 빈 문자열로 교체 (사용하지 않는 타입만 있던 경우)
  if (newImports.length === 0) {
    return content.replace(importRegex, '')
  }

  return content.replace(importRegex, newImports.join('\n'))
}

/**
 * api 파일 content에서 data-contracts import 구문의 타입 이름들을 추출합니다.
 * @internal — exported for testing
 */
export function extractImportedTypeNames(content: string): Set<string> {
  const importMatch = content.match(
    /import\s*\{([^}]+)\}\s*from\s*['"]\.\.\/[@]types\/data-contracts['"];?/,
  )
  if (!importMatch) return new Set()

  return new Set(
    importMatch[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  )
}

async function generatePretty(path: string, contents: string) {
  let organized = contents
  try {
    organized = await prettierString(contents, {
      parser: 'babel-ts',
      plugins: ['prettier-plugin-organize-imports'],
    })
  } catch (err) {
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
  let existingContent = ''
  try {
    if (fs.existsSync(path)) {
      existingContent = fs.readFileSync(path, 'utf8')
    }
  } catch (err) {
    // no existing file
  }

  if (existingContent) {
    const mergedContent = mergeTypeScriptContent(existingContent, contents)
    fs.writeFileSync(path, mergedContent)
  } else {
    fs.writeFileSync(path, contents)
  }
}

export function splitHookContents(filename: string, content: string) {
  const indicatorIdx = content.indexOf(QUERY_HOOK_INDICATOR)
  if (indicatorIdx === -1) {
    throw new Error(
      `[splitHookContents] QUERY_HOOK_INDICATOR not found in ${filename}. ` +
        `Ensure the template includes the indicator comment.`,
    )
  }

  const _apiContent = content.slice(0, indicatorIdx)
  const _hookContent = content.slice(
    indicatorIdx + QUERY_HOOK_INDICATOR.length,
  )

  const suspenseIdx = _hookContent.indexOf(USE_SUSPENSE_QUERY_HOOK_INDICATOR)
  let _hookParts: string[]
  if (suspenseIdx === -1) {
    _hookParts = [_hookContent, '']
  } else {
    _hookParts = [
      _hookContent.slice(0, suspenseIdx),
      _hookContent.slice(
        suspenseIdx + USE_SUSPENSE_QUERY_HOOK_INDICATOR.length,
      ),
    ]
  }

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

/** @internal — exported for testing */
export function getLastImportLine(content: string) {
  const importLines = content
    .split('\n')
    .map((line, idx) => ({ idx, has: /from ('|").*('|");/.test(line) }))
    .filter(({ has }) => has)
    .map(({ idx }) => idx)

  if (importLines.length === 0) return 0
  return Math.max(...importLines) + 1
}
