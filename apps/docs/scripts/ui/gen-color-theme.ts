import { mkdirSync, readFileSync, writeFileSync } from 'fs'
import path from 'path'

import { defineCommand } from '@toktokhan-dev/cli'
import {
  createObjBySelector,
  prefix,
  removeStr,
  suffix,
} from '@toktokhan-dev/universal'

import entries from 'lodash/fp/entries.js'
import flow from 'lodash/fp/flow.js'
import map from 'lodash/fp/map.js'
import replace from 'lodash/fp/replace.js'

export type GenThemeColorsConfig = {
  input: string
  outputTs: string
  outputCss: string
}

const getKey = (key: string) => `--${key.replace(/\./g, '-')}`
const getConfigValue = (key: string) => `var(--${key.replace(/\./g, '-')})`

const arrayToObj = (array: string[]) =>
  array.reduce<Record<string, string>>((obj, item) => {
    const [key, value] = item.split(':')
    obj[key] = value
    return obj
  }, {})

const generateCss = (colors: string[], isDark = false) => {
  const colorObj = arrayToObj(colors)
  const cssContent = Object.entries(colorObj)
    .map(([key, value]) => `${key}: ${value}`)
    .join(';\n  ')
  return isDark ? `.dark {\n  ${cssContent}\n}` : `:root {\n  ${cssContent}\n}`
}

const processTokens = (
  tokens: Record<string, any>,
  lightKey = 'light',
  darkKey = 'dark',
) => {
  return flow(
    entries,
    map(([key, value]) => ({
      lightCss: `${getKey(key)}:${value[lightKey].value}`,
      darkCss: `${getKey(key)}:${value[darkKey].value}`,
      configLight: `${key}:${getConfigValue(key)}`,
      configDark: `${key}:${getConfigValue(key)}`,
    })),
    (mapped) => ({
      lightCss: mapped.map((item) => item.lightCss),
      darkCss: mapped.map((item) => item.darkCss),
      configLight: mapped.map((item) => item.configLight),
      configDark: mapped.map((item) => item.configDark),
    }),
  )(tokens)
}

const processColorSchema = (colors: Record<string, any>) => {
  return flow(
    entries,
    map(([key, value]) => ({
      css: `${getKey(key)}:${value.value}`,
      config: `${key}:${getConfigValue(key)}`,
    })),
    (mapped) => ({
      css: mapped.map((item) => item.css),
      config: mapped.map((item) => item.config),
    }),
  )(colors)
}

export const genThemeColors = defineCommand<
  'gen:theme-colors',
  GenThemeColorsConfig
>({
  name: 'gen:theme-colors',
  description: 'Generate Tailwind color themes from tokens.',
  default: {
    input: 'static/token.json',
    outputTs: path.resolve('src/generated', 'color-theme-tailwind.ts'),
    outputCss: path.resolve('src/generated', 'color-theme.css'),
  },
  cliOptions: [
    {
      name: 'outputTs',
      alias: 'ots',
      description: 'Output path for TypeScript file',
      type: 'string',
    },
    {
      name: 'outputCss',
      alias: 'ocss',
      description: 'Output path for CSS file',
      type: 'string',
    },
  ],
  run: (config) => {
    const themeData = JSON.parse(readFileSync(config.input, 'utf-8'))

    mkdirSync(path.dirname(config.outputTs), { recursive: true })
    mkdirSync(path.dirname(config.outputCss), { recursive: true })

    const colorSchema = processColorSchema(themeData.colors.colorSchema)
    const semanticTokens = processTokens(themeData.colors.semanticTokens)

    const combinedColors = {
      rootCss: [...colorSchema.css, ...semanticTokens.lightCss],
      darkCss: [...semanticTokens.darkCss],
      config: [
        ...colorSchema.config,
        ...semanticTokens.configLight,
        ...semanticTokens.configDark,
      ],
    }

    writeFileSync(
      config.outputCss,
      `@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
  ${generateCss(combinedColors.rootCss)}
  ${generateCss(combinedColors.darkCss, true)}
}
`,
      'utf-8',
    )

    const combinedTokens = arrayToObj(combinedColors.config)
    writeFileSync(
      config.outputTs,
      `export default ${JSON.stringify(combinedTokens, null, 2)};`,
      'utf-8',
    )
  },
})
