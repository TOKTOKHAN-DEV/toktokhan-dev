import { defineCommand } from '@toktokhan-dev/cli'

import enquirer from 'enquirer'

import { genDynamicPageTemplate } from './resolvers/gen-dynamic-page-template'
import { genPageTemplate } from './resolvers/gen-page-template'

/**
 * 이미지 경로를 읽어 객체로 생성해줍니다.
 *
 * @packageDocumentation
 */

/**
 * @category Types
 */
export interface GenSourceConfig {
  appName: string
}

/**
 * @category Commands
 */
export const genSource = defineCommand<'gen:source', GenSourceConfig>({
  name: 'gen:source',
  description: '',
  cliOptions: [
    {
      name: 'appName',
      alias: 'n',
      type: 'string',
      description: 'page tile 을 설정합니다. (default: "Toktokhan")',
    },
  ],

  default: {
    appName: 'Toktokhan',
  },
  run: async (config) => {
    const resolvers = {
      page: genPageTemplate,
      'dynamic-page': genDynamicPageTemplate,
    } as const

    const { type } = await enquirer.prompt<{ type: keyof typeof resolvers }>({
      type: 'autocomplete',
      name: 'type',
      message: 'Select Source Code Type',
      initial: 0,
      choices: Object.keys(resolvers),
    })

    resolvers[type](config)
  },
})
