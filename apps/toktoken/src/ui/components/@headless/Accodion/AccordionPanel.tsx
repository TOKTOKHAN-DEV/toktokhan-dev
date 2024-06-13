import { ReactNode } from 'react'

import { ClassNameValue, twJoin, twMerge } from 'tailwind-merge'

import { useAccordionContext } from './contexts/useAccodion'

interface AccordionPanelProps {
  children: ReactNode
  className?: ClassNameValue
  isExpanded?: boolean
}

const AccordionPanel = ({
  children,
  isExpanded = false,
  className,
}: AccordionPanelProps) => {
  const { styles } = useAccordionContext()
  return <div className={twMerge(styles?._panel, className)}>{children}</div>
}

export default AccordionPanel
