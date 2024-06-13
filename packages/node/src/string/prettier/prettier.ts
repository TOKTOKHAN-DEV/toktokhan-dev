import fs from 'fs'

import prettier from 'prettier'
import { cwd } from 'process'

import { findFileToTop } from '../../path'

export interface ExtendedPrettierOptions extends prettier.Options {
  configPath?: string | ('auto' & {})
}

/**
 * 주어진 문자열을 prettier를 사용하여 서식을 맞춥니다.
 *
 * @category Utils/String
 *
 * @param string - 서식을 맞출 문자열입니다.
 * @param options - prettier의 옵션입니다.
 * @returns 서식을 맞춘 결과를 반환합니다.
 */
export async function prettierString(
  string: string,
  options?: ExtendedPrettierOptions,
) {
  const configs = await (async () => {
    if (!options?.configPath) {
      return {}
    }
    const configPath =
      options.configPath === 'auto' ?
        findFileToTop(cwd(), '.prettierrc.js') || '.prettierrc.js'
      : options.configPath

    return prettier.resolveConfig(configPath, {
      useCache: false,
    })
  })()

  return prettier.format(string, {
    ...configs,
    parser: 'babel',
    ...options,
  })
}

/**
 * 주어진 파일의 내용을 prettier를 사용하여 서식을 맞춥니다.
 *
 * @category Utils/String
 *
 * @param outputPath - 서식을 맞출 파일의 경로입니다.
 * @param options - prettier의 옵션입니다.
 */
export async function prettierFile(
  outputPath: string,
  options?: ExtendedPrettierOptions,
) {
  const file = fs.readFileSync(outputPath, { encoding: 'utf-8' })
  const prettyFile = await prettierString(file, options)

  fs.writeFileSync(outputPath, prettyFile)
}
