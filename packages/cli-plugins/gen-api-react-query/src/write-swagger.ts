import fs from 'fs'
import path from 'path'

import { prettierFile, prettierString } from '@toktokhan-dev/node'

import { camelCase, upperFirst } from 'lodash'
import { GenerateApiOutput } from 'swagger-typescript-api'

import { GENERATE_SWAGGER_DATA } from './constants'

const { TYPE_FILE, UTIL_FILE, QUERY_HOOK_INDICATOR } = GENERATE_SWAGGER_DATA

export const writeSwaggerApiFile = (params: {
  input: GenerateApiOutput
  output: string
  spinner?: any
}) => {
  const { input, output, spinner } = params

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
          const { apiContents, hookContents } = spilitHookContents(
            filename,
            content,
          )
          genreatePretty(
            path.resolve(targetFolder, `${filename}.api.ts`),
            apiContents,
          )
          genreatePretty(
            path.resolve(targetFolder, `${filename}.query.ts`),
            hookContents,
          )
          return
        }
        generate(path.resolve(targetFolder, name), content)
      } catch (err) {
        console.error(err)
      }
    },
  )
}

async function genreatePretty(path: string, contents: string) {
  const organized = await prettierString(contents, {
    parser: 'babel-ts',
    plugins: ['prettier-plugin-organize-imports'],
  })

  const formatted = await prettierString(organized, {
    parser: 'typescript',
    configPath: 'auto',
  })

  generate(path, formatted)
}

function generate(path: string, contents: string) {
  fs.writeFileSync(path, contents)
}

export function spilitHookContents(filename: string, content: string) {
  const [_apiContent, _hookContent] = content.split(QUERY_HOOK_INDICATOR)

  const lastImport = getLastImportLine(content)
  const lines = content.split('\n')

  const importArea = [
    `import { ${upperFirst(camelCase(filename))}Api } from './${filename}.api';`,
    ...lines.slice(0, lastImport),
  ].join('\n')

  return {
    apiContents: _apiContent,
    hookContents: importArea + _hookContent,
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
