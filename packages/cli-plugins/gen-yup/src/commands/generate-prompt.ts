import clear from 'clear'
import enquirer from 'enquirer'

import { schemaList } from '../constants/schema'
import { differenceOfSets, mappedObject } from '../utils'

type Obj = Record<string, string>

export type generateSource = {
  hookName: string
  selectedSchema: {
    required: Obj[]
    notRequired: Obj[]
  }
}

export const generatePrompt = async () => {
  clear()

  const {
    hook: { result: hookName },
  } = await enquirer.prompt<{
    hook: { values: { name: string }; result: string }
  }>({
    type: 'snippet',
    name: 'hook',
    message: 'hook 이름',
    required: true,
    template: `use\${name}Form`,
  })

  const { schema } = await enquirer.prompt<{ schema: Obj }>({
    type: 'multiselect',
    name: 'schema',
    message: '필요한 Schema (Space 선택 / Enter 확정)',
    choices: schemaList,
    result(value) {
      if (!value.length) {
        throw new Error('최소 한 개 이상 선택해 주세요')
      }

      return (this as any)?.map(value)
    },
  })

  const { requiredSchema } = await enquirer.prompt<{
    requiredSchema: Obj
  }>({
    type: 'multiselect',
    name: 'requiredSchema',
    message: '필수 Schema (Space 선택 / Enter 확정)',
    choices: mappedObject(schema),
    result(value) {
      if (!value.length) {
        throw new Error('최소 한 개 이상 선택해 주세요')
      }

      return (this as any)?.map(value || [])
    },
  })

  const notRequiredSchema = differenceOfSets(schema, requiredSchema)

  return {
    hookName,
    selectedSchema: {
      required: mappedObject(requiredSchema),
      notRequired: mappedObject(notRequiredSchema),
    },
  }
}
