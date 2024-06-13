import React, { ReactNode } from 'react'

import { twJoin, twMerge } from 'tailwind-merge'

import { ExternalOnIcon, InternalOnIcon } from '../../../generated/icons'
import { Tabs } from '../../@headless/Tabs'
import { useTabProps } from '../../@headless/Tabs/contexts/useTabs'

interface PreviewTabsProps extends useTabProps {
  onChange: (index: number) => void
}

const PreviewTabs = ({
  defaultIndex,
  selectedTabIndex,
  onChange,
}: PreviewTabsProps) => {
  const itemClasses = twMerge(
    'p-0',
    'rounded-[9999px] px-[12px] py-[4px]',
    'caption01-bold',
    'ui-selected:bg-button-primary',
    'ui-selected:text-text-primary-inverse',
    'ui-not-selected:bg-button-disabled',
    'ui-not-selected:text-text-disabled-on',
  )
  return (
    <Tabs
      defaultIndex={defaultIndex}
      selectedTabIndex={selectedTabIndex}
      onChange={onChange}
    >
      <Tabs.List className="flex gap-[4px] items-center mb-[16px]">
        <Tabs.Item className={itemClasses}>Json</Tabs.Item>
        <Tabs.Item className={itemClasses}>Parsed</Tabs.Item>
      </Tabs.List>
      {/* <Tabs.Panels>
        <div>Content 1</div>
        <div>Content 2</div>
      </Tabs.Panels> */}
    </Tabs>
  )
}

export default PreviewTabs
