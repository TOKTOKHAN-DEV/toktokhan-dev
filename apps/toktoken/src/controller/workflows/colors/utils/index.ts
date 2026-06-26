import {
  filter,
  flow,
  head,
  isEqual,
  isObject,
  prop,
  some,
  toLower,
} from 'lodash/fp'

import { rgbToHex } from './rgb-To-Hex'

export const findTargetCollection =
  (targets: string[]) =>
  (collection: VariableCollection[]): VariableCollection | undefined =>
    flow(
      filter(
        flow(prop('name'), toLower, (name) =>
          some((target) => target === name, targets),
        ),
      ),
      head,
    )(collection)

export const isVariableAlias = (value: unknown): value is VariableAlias =>
  isObject(value) && (value as { type?: string }).type === 'VARIABLE_ALIAS'

export const resolveColorValue = (
  value: unknown,
  varMap: Record<string, Variable>,
  modeId?: string,
  visited: Set<string> = new Set(),
): string | undefined => {
  if (!isObject(value)) return undefined

  if (isVariableAlias(value)) {
    const { id } = value
    if (visited.has(id)) return undefined
    visited.add(id)

    const target = varMap[id]
    if (!target) return undefined

    const byMode = target.valuesByMode
    const next =
      modeId && modeId in byMode ? byMode[modeId] : head(Object.values(byMode))
    return resolveColorValue(next, varMap, modeId, visited)
  }

  const rgba = value as Partial<RGBA>
  if ('r' in rgba && 'g' in rgba && 'b' in rgba) {
    return rgbToHex(rgba as RGBA)
  }
  return undefined
}

export const getTargetVariables =
  (targetId: string) => (variables: Variable[]) =>
    flow(filter(flow(prop('variableCollectionId'), isEqual(targetId))))(
      variables,
    )

export const isColorSchema = (variable: Variable) => {
  const value = Object.values(variable.valuesByMode)[0]
  if (!isObject(value)) return false
  if ('r' in value && 'g' in value && 'b' in value) {
    return true
  }
  return false
}

export const isSemanticToken = (variable: Variable) => {
  const value = Object.values(variable.valuesByMode)[0]
  if (!isObject(value)) return false

  if ('type' in value && 'id' in value && value.type === 'VARIABLE_ALIAS') {
    return true
  }
  return false
}
