import { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

interface EmptyViewProps {
  isEmpty: boolean
  children: ReactNode
  fallback: ReactNode
  className?: string
}

const EmptyView = ({
  isEmpty,
  children,
  fallback,
  className,
}: EmptyViewProps) => {
  if (isEmpty) return fallback

  return (
    <div
      className={twMerge(
        'h-full',
        'transition-opacity ease-in-out duration-300',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default EmptyView
