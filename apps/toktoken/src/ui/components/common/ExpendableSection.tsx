import { useState } from 'react'

import clsx from 'clsx'

import AccordionIcon from '../@headless/Accodion/AccordionIcon'

interface ExpendableSectionProps {
  title: string
  children: React.ReactNode
  className?: string
  initialExpanded?: boolean
  hideIcon?: boolean
}

export const ExpendableSection = ({
  title,
  children,
  className,
  hideIcon,
  initialExpanded = true,
}: ExpendableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded)
  return (
    <div className={className}>
      <div
        className={clsx(
          'h-[40px] py-[8px]',
          'text-primary text-[12px] font-[600] leading-[150%] tracking-[-0.24px]',
          'flex items-center justify-between cursor-pointer',
          'border-b-[1px] border-border-secondary',
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3>{title}</h3>
        {!hideIcon && (
          <div>
            <AccordionIcon isExpanded={!!isExpanded} />
          </div>
        )}
      </div>
      {isExpanded && <div className="py-[16px]">{children}</div>}
    </div>
  )
}
