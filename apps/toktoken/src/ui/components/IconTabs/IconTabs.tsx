import React from 'react'

import { twMerge } from 'tailwind-merge'

import { ExternalOnIcon, InternalOnIcon } from '../../generated/icons'
import { Tabs } from '../@headless/Tabs'
import { useTabProps } from '../@headless/Tabs/contexts/useTabs'

interface IconTabsProps extends useTabProps {
  onChange: (index: number) => void
  className?: string
}

const IconTabs = ({
  defaultIndex,
  selectedTabIndex,
  onChange,
  className,
}: IconTabsProps) => {
  const itemClasses = twMerge(
    'flex items-center gap-[2px]',
    'ui-selected:text-brand-500',
    'ui-not-selected:text-text-disabled',
  )
  return (
    <Tabs
      defaultIndex={defaultIndex}
      selectedTabIndex={selectedTabIndex}
      onChange={onChange}
      className={twMerge(className)}
    >
      <Tabs.List className="px-[16px] flex gap-[12px] h-[40px] items-center">
        <Tabs.Item className={itemClasses}>
          <InternalOnIcon className={itemClasses} />
          Internal
        </Tabs.Item>
        <Tabs.Item className={itemClasses}>
          <ExternalOnIcon className={itemClasses} />
          External
        </Tabs.Item>
      </Tabs.List>
    </Tabs>
  )
}

export default IconTabs
