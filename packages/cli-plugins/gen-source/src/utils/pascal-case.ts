import { camelCase } from 'lodash'

export const pascalCase = (str: string) => {
  const converted = camelCase(str)
  return converted.charAt(0).toUpperCase() + converted.slice(1)
}
