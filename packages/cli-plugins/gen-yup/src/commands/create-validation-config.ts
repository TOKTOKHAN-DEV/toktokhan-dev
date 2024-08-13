import fs from 'fs'
import path from 'path'

import { cwd } from '@toktokhan-dev/node'

import { Eta } from 'eta'

import { packageRoot } from '../package-root'
import { addUnderscoreToCamelCase, convertLowerCase, removeUse } from '../utils'
import { getDetailSchema } from '../utils/schema/get-detail-schema'
import { generateSource } from './generate-prompt'

import { GenYupConfig } from '..'

export const createValidationConfig =
  ({ output, outputConstants, importConstants }: GenYupConfig) =>
  (arg: generateSource) => {
    const { hookName, selectedSchema } = arg

    const eta = new Eta({
      views: path.join(packageRoot('templates/custom')),
    })

    const etaConstants = new Eta({
      views: path.join(packageRoot('templates/constants')),
    })

    const outputPath = output || path.resolve(cwd('src', 'generated', 'hooks'))
    const outputConstantsPath =
      outputConstants || path.resolve(cwd('src', 'generated', 'constants'))

    const importConstantsPath = importConstants || '@/generated/constants'

    const config = {
      data: {
        hookName: removeUse(hookName),
        selectedSchema,
      },
      utils: {
        addUnderscoreToCamelCase,
        convertLowerCase,
        getDetailSchema,
      },
      config: {
        importConstantsPath,
      },
    }

    const view = eta.render('signup.eta', config)
    const targetPath = path.resolve(outputPath, `${hookName}.ts`)

    fs.mkdirSync(outputPath, { recursive: true })
    fs.writeFileSync(targetPath, view, 'utf-8')

    fs.mkdirSync(outputConstantsPath, { recursive: true })
    ;(function () {
      ;['helper-text', 'regex'].forEach((name) => {
        const view = etaConstants.render(`${name}.eta`, config)
        const targetPath = path.resolve(outputConstantsPath, `${name}.ts`)

        fs.writeFileSync(targetPath, view, 'utf-8')
      })
    })()
  }
