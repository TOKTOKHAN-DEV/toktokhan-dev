import path from 'path'
import util from 'util'

import { defineCommand } from '@toktokhan-dev/cli'
import {
  convertFilePathToObject,
  cwd,
  generateCodeFile,
  renderExportConst,
} from '@toktokhan-dev/node'
import { flatObject } from '@toktokhan-dev/universal'

import { snakeCase } from 'lodash'

/**
 * 이미지 경로를 읽어 객체로 생성해줍니다.
 *
 * @packageDocumentation
 */

/**
 * @category Types
 */
export interface GenImageConfig {
  /** 조회할 img 파일들이 포함되어있는 폴더 입니다. */
  input?: string
  /** 생성될 파일이 위치할 경로입니다.*/
  output?: string
  /** 생성될 image 객체의 이름입니다 */
  displayName?: string
  /** 생성될 객체의 value 에 할당될 경로의 base-path 입니다 */
  basePath?: string
  /** 생성될 이미지 파일을 판별하는 패턴으로써, 파일이름이 패턴과 일치할 경우에만 객체에 포함됩니다. */
  includes?: string[]
  /** 제외 될 이미지 파일을 판별하는 패턴으로써, 파일이름이 패턴과 일치할 경우에 객체에서 제외 됩니다. */
  ignored?: string[]
  /** key 값을 결정할 포멧함수입니다. 기본적으로, SNAKE_UPPER_CASE 로 생성됩니다. */
  formatKey?: (fileName: string) => string
  /** one depth  가 true 일 경우, 폴더 구조를 무시하고 one depth 로 객체를 생성합니다.*/
  oneDepth?: boolean
}

/**
 * @category Commands
 */
export const genImg = defineCommand<'gen:img', GenImageConfig>({
  name: 'gen:img',
  description: 'Generate image object from image files in the folder.',

  cliOptions: [
    {
      name: 'input',
      alias: 'i',
      type: 'string',
      description: '조회할 img 파일들이 포함되어있는 폴더 입니다.',
    },
    {
      name: 'output',
      alias: 'o',
      type: 'string',
      description: '생성될 파일이 위치할 경로입니다.',
    },
    {
      name: 'displayName',
      alias: 'd',
      type: 'string',
      description: '생성될 image 객체의 이름입니다',
    },
    {
      name: 'basePath',
      alias: 'b',
      type: 'string',
      description: '생성될 객체의 value 에 할당될 경로의 base-path 입니다',
    },
    {
      name: 'includes',
      alias: 'ic',
      type: 'string[]',
      description:
        '생성될 이미지 파일을 판별하는 패턴으로써, 파일이름이 패턴과 일치할 경우에만 객체에 포함됩니다.',
    },
    {
      name: 'ignored',
      alias: 'ig',
      type: 'string[]',
      description:
        '제외 될 이미지 파일을 판별하는 패턴으로써, 파일이름이 패턴과 일치할 경우에 객체에서 제외 됩니다.',
    },
    {
      name: 'oneDepth',
      alias: 'od',
      type: 'boolean',
      description:
        'one depth  가 true 일 경우, 폴더 구조를 무시하고 one depth 로 객체를 생성합니다.',
    },
  ],

  default: {
    input: 'public',
    output: path.resolve('src', 'generated', 'path', 'images.ts'),
    displayName: 'MY_IMAGES',
    basePath: '/',
    includes: ['*.jpg', '*.png', '*.svg', '*.jpeg', '*.webp'],
    ignored: ['*node_module*'],
    oneDepth: true,
    formatKey: (string) => {
      return snakeCase(string).toUpperCase()
    },
  },
  run: async (config) => {
    const {
      //
      input,
      output,
      ignored,
      displayName,
      includes,
      basePath,
    } = config

    if (!input) throw new Error('input is required')
    if (!output) throw new Error('output is required')
    if (!displayName) throw new Error('displayName is required')

    const pathObj = convertFilePathToObject<{ src: string; alt: string }>(
      {
        includingPattern: includes?.map((pattern) => path.join('**', pattern)),
        ignoredPattern: ignored,
        basePath,
        formatValue: (data) => {
          return {
            src: data.path,
            alt: data.key.toLocaleLowerCase().replace(/_/g, '-'),
          }
        },
      },
      cwd(input),
    )

    const flatten = flatObject(
      {
        formatKey: (parentKey, currentKey) => {
          return snakeCase([parentKey, currentKey].join(' ')).toUpperCase()
        },
        isValueType: (_value) => {
          const value = _value as any
          return value.src && value.alt
        },
      },
      pathObj,
    )

    const view = renderExportConst(
      displayName,
      util.inspect(config.oneDepth ? flatten : pathObj, { depth: Infinity }),
    )
    generateCodeFile({ outputPath: output }, view)
  },
})
