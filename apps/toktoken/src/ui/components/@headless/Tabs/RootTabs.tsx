import { ReactNode } from 'react'

import { TabsProvider, useTabProps, useTabs } from './contexts/useTabs'

interface RootTabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    useTabProps {
  children: ReactNode
}
const RootTabs = ({
  children,
  defaultIndex,
  selectedTabIndex,
  styles,
  onChange,
  ...props
}: RootTabsProps) => {
  const {
    onChange: _onChange,
    defaultIndex: _defaultIndex,
    styles: _styles,
    selectedTabIndex: _selectedTabIndex,
  } = useTabs()

  return (
    <TabsProvider
      value={{
        defaultIndex: defaultIndex ?? _defaultIndex,
        selectedTabIndex: selectedTabIndex ?? _selectedTabIndex,
        onChange: onChange ?? _onChange,
        styles: styles ?? _styles,
      }}
    >
      <div {...props}>{children}</div>
    </TabsProvider>
  )
}

export default RootTabs
