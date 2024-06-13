import { isObject } from 'lodash'

export const isSemanticToken = (variable: Variable) => {
  const value = Object.values(variable.valuesByMode)[0]
  if (!isObject(value)) return false

  if ('type' in value && 'id' in value && value.type === 'VARIABLE_ALIAS') {
    return true
  }
  return false
}
