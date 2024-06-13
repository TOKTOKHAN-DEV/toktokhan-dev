import { Children, ReactNode } from 'react'

import { ClassNameValue, twMerge } from 'tailwind-merge'

export const Sections = ({
  children,
  className,
  hasDivider = true,
}: {
  children: ReactNode
  className?: ClassNameValue
  hasDivider?: boolean
}) => {
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div className="flex flex-col flex-1">
      <div className={twMerge('px-[16px] py-[20px]', className)}>
        {Children.toArray(
          childrenArray.map((child) => <div className="h-full">{child}</div>),
        )}
      </div>
      {hasDivider && <div className="border-b-[1px] border-border-secondary" />}
    </div>
  )
}
