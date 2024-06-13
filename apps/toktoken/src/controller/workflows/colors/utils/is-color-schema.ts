import { isObject } from 'lodash'

export const isColorSchema = (variable: Variable) => {
  const value = Object.values(variable.valuesByMode)[0]
  if (!isObject(value)) return false
  if ('r' in value && 'g' in value && 'b' in value) {
    return true
  }
  return false
}
