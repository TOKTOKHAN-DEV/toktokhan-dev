import React, { ReactNode, useState } from 'react'

import { twMerge } from 'tailwind-merge'

interface TooltipProps {
  children: ReactNode
  content: ReactNode
}
const Tooltip = ({ children, content }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}
      {showTooltip && (
        <div
          className={twMerge(
            'absolute z-10 w-auto px-[4px] py-[2px] bg-button-primary text-white rounded-[4px] bottom-full mb-2 right-0',
            'overflow-auto',
            'caption02-regular',
          )}
        >
          {content}
        </div>
      )}
    </div>
  )
}

export default Tooltip
