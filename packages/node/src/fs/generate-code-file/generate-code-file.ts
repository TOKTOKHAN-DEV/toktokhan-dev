import fs from 'fs'
import path from 'path'

import { curry } from 'lodash'
import prettier from 'prettier'

import { generateLog } from '../../logger'
import { cwd } from '../../path/cwd'
import { ExtendedPrettierOptions, prettierString } from '../../string/prettier'

const _generateCodeFile = async (
  config: { outputPath: string; prettier?: ExtendedPrettierOptions },
  code: string,
) => {
  fs.mkdirSync(path.parse(cwd(config.outputPath)).dir, { recursive: true })
  fs.writeFileSync(
    cwd(config.outputPath),
    await prettierString(code, config.prettier),
    'utf-8',
  )
  generateLog(cwd(config.outputPath))
}

/**
 * 코드를 파일로 생성하는 함수입니다.
 *
 * @category Utils/Fs
 *
 * @param config - 코드 파일 생성에 필요한 설정 객체
 * @param config.outputPath - 생성된 코드 파일의 경로
 * @param config.prettier - 코드 파일을 포맷팅할 때 사용할 Prettier 옵션 (선택 사항)
 * @param code - 생성할 코드 문자열
 *
 * @example
 * ```typescript
 * // 코드 파일 생성 예시
 * const code = 'const message = "Hello, world!";'
 *
 * await generateCodeFile({
 *   outputPath: 'output/example.js',
 * }, code)
 *
 * await generateCodeFile({
 *   outputPath: 'output/example.js',
 * })(code)
 *
 * const genExample = generateCodeFile({
 *   outputPath: 'output/example.js',
 *   prettier: { semi: false, singleQuote: true },
 * })
 *
 * await genExample(code)
 * ```
 */
export const generateCodeFile: {
  (
    //
    config: {
      outputPath: string
      prettier?: ExtendedPrettierOptions
    },
  ): (code: string) => Promise<void>
  (
    //
    config: {
      outputPath: string
      prettier?: ExtendedPrettierOptions
    },
    code: string,
  ): Promise<void>
} = curry(_generateCodeFile)
