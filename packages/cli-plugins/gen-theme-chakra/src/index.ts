import { existsSync } from 'fs'
import path from 'path'

import { defineCommand } from '@toktokhan-dev/cli'
import { generateCodeFile, json } from '@toktokhan-dev/node'

import { renderColor } from './color'
import { renderTextStyle } from './text-style'
import { ThemeToken, TokenModes } from './type'

/**
 * theme json 파일기반으로 `Chakra theme token`을 생성합니다.
 *
 * @packageDocumentation
 */

/**
 * @category Types
 */
export interface GenThemeConfig {
  /**
   * theme.json 경로입니다.
   */
  input: string
  /**
   * chakra theme token이 생성되는 폴더입니다.
   */
  output: string
  /**
   * chakra Semantic token color mode의 키 값을 지정할 수 있습니다.
   */
  tokenModes: TokenModes
  /**
   * Chakra UI 버전입니다.
   */
  version?: 'v2' | 'v3'
}

/**
 * @category Commands
 */
export const genTheme = defineCommand<'gen:theme', GenThemeConfig>({
  name: 'gen:theme',
  description:
    'theme json 파일기반으로 Chakra theme token 생성합니다. theme json 은 피그마 플러그인으로 부터 생성된 json 파일입니다.',
  default: {
    input: path.resolve('public', 'token.json'),
    output: path.resolve('src', 'generated', 'tokens'),
    tokenModes: {
      colors: { light: 'light', dark: 'dark' },
    },
    version: 'v2',
  },
  cliOptions: [
    {
      name: 'input',
      alias: 'i',
      description: 'theme json 경로',
      type: 'string',
    },
    {
      name: 'output',
      alias: 'o',
      description: 'chakra theme token 생성 폴더',
      type: 'string',
    },
    {
      name: 'version',
      alias: 'v',
      description: 'Chakra UI 버전',
      type: 'string',
    },
  ],
  run: async (config) => {
    if (!existsSync(config.input)) {
      throw new Error(`theme json file is not found: ${config.input}`)
    }

    const token = json<ThemeToken>(config.input)
    const colorMode = config.tokenModes?.colors
    const textStyleMode = config.tokenModes?.textStyles

    const color = renderColor(
      token.colors,
      {
        light: colorMode?.light || 'light',
        dark: colorMode?.dark || 'dark',
      },
      config.version,
    )

    const textStyle = renderTextStyle(
      token.textStyles,
      textStyleMode || {},
      config.version,
    )
    generateCodeFile(
      {
        outputPath: path.resolve(config.output, 'colors.ts'),
        prettier: { parser: 'babel-ts', configPath: 'auto' },
      },
      color,
    )

    generateCodeFile(
      {
        outputPath: path.resolve(config.output, 'text-styles.ts'),
        prettier: { parser: 'babel-ts', configPath: 'auto' },
      },
      textStyle,
    )
  },
})
