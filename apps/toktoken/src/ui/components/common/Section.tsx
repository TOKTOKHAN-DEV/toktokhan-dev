import { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface SectionProps {
  title?: string
  icon?: ReactNode
  children: React.ReactNode
  className?: string
  rightSlot?: ReactNode
}

export const Section = ({
  title,
  icon,
  children,
  className,
  rightSlot,
}: SectionProps): ReactNode => {
  return (
    <div className={twMerge('flex flex-col h-full p-0', className)}>
      <div
        className={twMerge(
          'text-xs font-semibold', //
          'flex items-center justify-between cursor-pointer',
        )}
      >
        {title && (
          <div className="flex items-center gap-[4px]">
            {icon}
            <h3 className="body02-normal-bold tracking-[-0.32px] leading-[27.2px]">
              {title}
            </h3>
          </div>
        )}
        {rightSlot}
      </div>
      <div className="flex flex-col flex-1 pt-[16px]">{children}</div>
    </div>
  )
}
