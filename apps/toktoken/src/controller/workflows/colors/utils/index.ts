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

export const findTargetCollection =
  (targets: string[]) =>
  (collection: VariableCollection[]): VariableCollection =>
    flow(
      filter(
        flow(prop('name'), toLower, (name) =>
          some((target) => target === name, targets),
        ),
      ),
      head,
    )(collection)

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
