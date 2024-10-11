import path from 'path'

import { cwd, generateCodeFile } from '@toktokhan-dev/node'

import Enquirer from 'enquirer'
import { kebabCase } from 'lodash'

import { renderDefinedEta } from '../utils/eta'
import { getTargetFolderRecursive } from '../utils/get-target-folder'
import { pascalCase } from '../utils/pascal-case'

import { GenSourceConfig } from '..'

export const genPageTemplate = async (config: GenSourceConfig) => {
  const targetPath = await getTargetFolderRecursive(cwd('src', 'pages'))

  const { pageName } = await Enquirer.prompt<{ pageName: string }>({
    type: 'input',
    name: 'pageName',
    message: 'What is your page name?',
  })

  const pageComponent = renderDefinedEta('page-component', {
    contentName: pascalCase(pageName),
    name: pascalCase(pageName) + 'Page',
    pageTitle: kebabCase(pageName),
  })

  const containerComponent = renderDefinedEta('component', {
    name: pascalCase(pageName),
  })

  const containerIndexComponent = renderDefinedEta('index', {
    exportName: pascalCase(pageName),
    importPath: `./${pascalCase(pageName)}`,
  })

  generateCodeFile(
    {
      prettier: { parser: 'babel-ts', configPath: 'auto' },
      outputPath: path.resolve(
        targetPath,
        `${kebabCase(pageName)}`,
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
        pascalCase(pageName),
        `${pascalCase(pageName)}.tsx`,
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
        pascalCase(pageName),
        'index.ts',
      ),
    },
    containerIndexComponent,
  )
}
