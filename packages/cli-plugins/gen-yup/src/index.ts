import path from 'path'

import { defineCommand } from '@toktokhan-dev/cli'

import { createValidationConfig } from './commands/create-validation-config'
import { generatePrompt } from './commands/generate-prompt'

/**
 * 대화형 cli 를 통해 일관된 형식의 yup 스키마를 생성합니다.
 *
 * @packageDocumentation
 */

/**
 * @category Types
 */
export interface GenYupConfig {
  /** 생성될 파일이 위치할 경로입니다.*/
  output?: string

  /** 정규표현식, 헬퍼텍스트 파일이 위치할 경로입니다.*/
  outputConstants?: string

  /** 정규표현식, 헬퍼텍스트를 불러올 경로입니다.*/
  importConstants?: string
}

/**
 * @category Commands
 */
export const genYup = defineCommand<'gen:yup', GenYupConfig>({
  name: 'gen:yup',
  description: 'Generate Yup schema file with RHF',

  cliOptions: [
    {
      name: 'output',
      alias: 'o',
      type: 'string',
      description: '생성될 파일이 위치할 경로입니다.',
    },
    {
      name: 'outputConstants',
      alias: 'oc',
      type: 'string',
      description: '정규표현식, 헬퍼텍스트 폴더가 위치할 경로입니다.',
    },
    {
      name: 'importConstants',
      alias: 'ic',
      type: 'string',
      description: '정규표현식, 헬퍼텍스트를 불러올 경로입니다.',
    },
  ],

  default: {
    output: path.resolve('src', 'generated', 'hooks'),
    outputConstants: path.resolve('src', 'generated', 'constants'),
    importConstants: '@/generated/constants',
  },
  run: async (config: GenYupConfig) => {
    generatePrompt().then(createValidationConfig(config))
  },
})
