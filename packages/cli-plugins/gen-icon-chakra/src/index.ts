import path from 'path'

import { defineCommand } from '@toktokhan-dev/cli'
import {
  convertFilePathToObject,
  cwd,
  generateCodeFile,
  readFileSync,
} from '@toktokhan-dev/node'
import { awaited, flatObject, prefix } from '@toktokhan-dev/universal'

import { camelCase, isUndefined, omitBy, startCase } from 'lodash'
import {
  entries,
  flow,
  join,
  map,
  mapKeys,
  replace,
  tail,
  trim,
} from 'lodash/fp'
import { INode, parse, stringify } from 'svgson'

/**
 * 지정된 경로의 `svg`파일 기반으로 **Chakra UI Icon Component** 를 생성합니다.
 *
 * @packageDocumentation
 */

const PARENT_PROPS_FLAG = `parentProps="true"`

const STYLE_REGEX = /style="([^"]*)"/g

const isMatchStyle = (svgString: string): boolean => STYLE_REGEX.test(svgString)

const toPascalCase = (str: string) =>
  startCase(camelCase(str)).replace(/ /g, '')

const parseElement = (element: INode): INode => {
  const newElement: INode = {
    ...element,
    attributes: mapKeys(camelCase)(element.attributes),
    children: element.children.map(parseElement),
  }
  return newElement
}

const toJsxSyntax = (svg: INode): INode => {
  const { children, ...rest } = svg

  const attributes = {
    viewBox: svg.attributes.viewBox,
    fill: svg.attributes.fill,
    parentProps: 'true',
  }
  const transformed: INode = {
    ...rest,
    name: 'Icon',
    attributes: omitBy(attributes, isUndefined),
    children: map(parseElement, children),
  }

  return transformed
}

const convertStyleToJSX = (styleString: string): string => {
  return styleString
    .split(';')
    .filter(trim)
    .map((style) => {
      const [key, value] = style.split(':').map(trim)
      return `${camelCase(key)}: '${value}'`
    })
    .join(', ')
}

const styleToJsx = (svgString: string): string => {
  if (!isMatchStyle(svgString)) return svgString
  return svgString.replace(STYLE_REGEX, (_, styleString) => {
    return `style={{ ${convertStyleToJSX(styleString)} }}`
  })
}

/**
 * @category Types
 */
export interface GenIconConfig {
  /** 조회할 svg 파일들이 포함되어있는 폴더 입니다. */
  input: string
  /** 생성될 파일이 위치할 경로입니다.*/
  output: string
  /** 제외 될 아이콘 파일을 판별하는 패턴으로써, 파일이름이 패턴과 일치할 경우에 객체에서 제외 됩니다. */
  ignored?: string[]
}

/**
 * @category Commands
 */
export const genIcon = defineCommand<'gen:icon', GenIconConfig>({
  name: 'gen:icon',
  description:
    'Generate Chakra-UI Icon Component from svg files in the folder.',

  cliOptions: [
    {
      name: 'input',
      alias: 'i',
      type: 'string',
      description: '조회할 svg 파일들이 포함되어있는 폴더 입니다.',
    },
    {
      name: 'output',
      alias: 'o',
      type: 'string',
      description: '생성될 파일이 위치할 경로입니다.',
    },
    {
      name: 'ignored',
      alias: 'ig',
      type: 'string[]',
      description:
        '제외 될 아이콘 컴포넌트 파일을 판별하는 패턴으로써, 파일이름이 패턴과 일치할 경우에 객체에서 제외 됩니다.',
    },
  ],

  default: {
    input: 'public',
    output: path.resolve('src', 'generated', 'icons', 'MyIcons.tsx'),
    ignored: ['*node_module*'],
  },
  run: async (config) => {
    const {
      //
      input,
      output,
      ignored,
    } = config

    if (!input) throw new Error('input is required')
    if (!output) throw new Error('output is required')

    const svgRegex = ['*.svg']

    const pathObj = convertFilePathToObject<string>(
      {
        includingPattern: svgRegex?.map((pattern) => path.join('**', pattern)),
        ignoredPattern: ignored,
        basePath: '',
        formatValue: (data) => {
          const svgContent = readFileSync('utf-8', path.join(input, data.path))
          return svgContent
        },
      },
      cwd(input),
    )

    const flatten = flatObject(
      {
        formatKey: (parentKey, currentKey) => {
          return toPascalCase([parentKey, currentKey].join(' '))
        },
        isValueType: (value) => {
          return typeof value === 'string'
        },
      },
      pathObj,
    )

    const transformSvgContent = async ([key, val]: [string, string]) => {
      const transformed = await flow(
        parse,
        awaited(
          flow(
            toJsxSyntax,
            stringify,
            styleToJsx,
            replace(PARENT_PROPS_FLAG, `{...props}`),
            (
              identity,
            ) => `export const ${key + 'Icon'} = (props: IconProps) => (${identity});
                `,
          ),
        ),
      )(val)

      return [key, transformed]
    }

    flow(
      entries,
      map(transformSvgContent),
      (value) => Promise.all(value) as any,
      awaited(map(tail)),
      awaited(
        flow(
          join('\n'),
          prefix(`import { Icon, IconProps } from '@chakra-ui/react';\n\n`),
        ),
      ),
      awaited(
        generateCodeFile({
          outputPath: output,
          prettier: {
            parser: 'babel-ts',
            configPath: 'auto',
          },
        }),
      ),
    )(flatten)
  },
})
