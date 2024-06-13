import { isArray } from 'lodash'
import { Fragment } from 'react/jsx-runtime'

interface SwitchProps<Key extends string> {
  value: Key
  mapper: Record<Key, JSX.Element>
}

export const Switch = <Key extends string>({
  value,
  mapper,
}: SwitchProps<Key>) => {
  // return mapper[value];
  const resolvedChildren =
    mapper[value].type === Fragment ?
      isArray(mapper[value].props.children) ? mapper[value].props.children
      : [mapper[value].props.children]
    : [mapper[value]]

  return resolvedChildren
}
