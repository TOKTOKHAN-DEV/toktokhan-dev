import React, { ReactNode } from 'react'

import { isArray } from 'lodash'

import { useTabsContext } from './contexts/useTabs'

interface TabPanelsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}
const TabPanels = ({ children, ...props }: TabPanelsProps) => {
  const { selectedTabIndex } = useTabsContext()

  if (!isArray(children)) return <div>{children}</div>

  return <div {...props}>{children[selectedTabIndex || 0]}</div>
}

export default TabPanels
