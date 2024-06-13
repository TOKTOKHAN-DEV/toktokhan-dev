import React, { HTMLAttributes, ReactNode } from 'react'

import { isArray } from 'lodash'

import { useTabsContext } from './contexts/useTabs'

interface TabListProps
  extends HTMLAttributes<HTMLUListElement | HTMLDivElement> {
  children: ReactNode
}

const TabList = ({ children, ...props }: TabListProps) => {
  const { selectedTabIndex, onChange } = useTabsContext()

  if (!isArray(children)) return <div {...props}>{children}</div>

  return (
    <ul {...props}>
      {children.map((child, index) => {
        return React.cloneElement(child, {
          onClick: () => onChange?.(index),
          selected: index === selectedTabIndex,
          key: index,
        })
      })}
    </ul>
  )
}

export default TabList
