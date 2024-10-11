import path from 'path'

import { cwd, generateCodeFile } from '@toktokhan-dev/node'
import { pass, removeStr } from '@toktokhan-dev/universal'

import Enquirer from 'enquirer'
import { camelCase, flow, kebabCase } from 'lodash'

import { renderDefinedEta } from '../utils/eta'
import { getTargetFolderRecursive } from '../utils/get-target-folder'
import { pascalCase } from '../utils/pascal-case'

import { GenSourceConfig } from '..'

const pathToDashCase = (string: string) => {
  const normalized = path.normalize(string)
  return normalized
    .split(path.sep)
    .filter((v) => !!v)
    .join('-')
}

export const genDynamicPageTemplate = async (config: GenSourceConfig) => {
  const pathPath = cwd('src', 'pages')
  const targetPath = await getTargetFolderRecursive(pathPath)
  const { slugName } = await Enquirer.prompt<{ slugName: string }>({
    type: 'input',
    name: 'slugName',
    message: 'What is your slug name?',
  })

  const removeBasePath = removeStr(cwd(pathPath))

  const pageName = flow(pass(targetPath), removeBasePath, pathToDashCase)()
  const isRoot = targetPath === cwd('src', 'pages')
  const pageNameWithSlug =
    (isRoot ? '' : pascalCase(pageName)) + 'By' + pascalCase(slugName)

  const pageComponent = renderDefinedEta('dynamic-page-component', {
    slug: camelCase(slugName),
    contentName: pageNameWithSlug,
    name: pageNameWithSlug + 'Page',
    pageTitle: `${kebabCase(pageName)} | 상세 페이지`,
  })

  const containerComponent = renderDefinedEta('component', {
    name: pageNameWithSlug,
    props: [
      {
        prop: camelCase(slugName),
        type: 'string | string[]',
        optional: true,
      },
    ],
  })

  const containerIndexComponent = renderDefinedEta('index', {
    exportName: pageNameWithSlug,
    importPath: `./${pageNameWithSlug}`,
  })

  generateCodeFile(
    {
      prettier: { parser: 'babel-ts', configPath: 'auto' },
      outputPath: path.resolve(
        targetPath,
        `[${camelCase(slugName)}]`,
        'index.tsx',
      ),
    },
    pageComponent,
  )

  generateCodeFile(
    {
      prettier: { parser: 'babel-ts', configPath: 'auto' },
      outputPath: cwd(
        'src', //
        'containers',
        pageNameWithSlug,
        `${pageNameWithSlug}.tsx`,
      ),
    },
    containerComponent,
  )

  generateCodeFile(
    {
      prettier: { parser: 'babel-ts', configPath: 'auto' },
      outputPath: cwd(
        'src', //
        'containers',
        pageNameWithSlug,
        'index.ts',
      ),
    },
    containerIndexComponent,
  )
}
