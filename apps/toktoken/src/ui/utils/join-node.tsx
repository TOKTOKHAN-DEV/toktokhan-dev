import { Children, ReactNode } from 'react'

import { curry } from 'lodash/fp'

export const joinNode: {
  (nodes: ReactNode[], divider: ReactNode): ReactNode
  (nodes: ReactNode[]): (divider: ReactNode) => ReactNode
} = curry((nodes: ReactNode[], divider: ReactNode): ReactNode => {
  return (
    <>
      {Children.toArray(
        nodes.reduce((prev, node, idx) => {
          if (!Array.isArray(prev)) return node
          if (idx === 0) return [node]
          return [...prev, divider, node]
        }, [] as Array<ReactNode>),
      )}
    </>
  )
})
