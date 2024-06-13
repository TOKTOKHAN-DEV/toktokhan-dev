import { HTMLAttributes, PropsWithChildren } from 'react'

import { twMerge } from 'tailwind-merge'

import { useTabsContext } from './contexts/useTabs'

interface TabItemProps extends HTMLAttributes<HTMLLIElement> {
  selected?: boolean
}

const TabItem = ({
  children,
  selected,
  className,
  ...props
}: PropsWithChildren<TabItemProps>) => {
  const { styles } = useTabsContext()

  return (
    <li
      data-toktoken-state={selected ? 'selected' : 'not-selected'}
      className={twMerge(
        'cursor-pointer',
        selected ? twMerge(styles?._selected) : twMerge(styles?._default),
        className,
      )}
      {...props}
    >
      {children}
    </li>
  )
}

export default TabItem
