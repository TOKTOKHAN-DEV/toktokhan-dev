import { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

import Spinner from './Spinner'

interface LoadingViewProps {
  isLoading: boolean
  children: ReactNode
  className?: string
}

const LoadingView = ({ isLoading, children, className }: LoadingViewProps) => {
  return (
    <div className={twMerge('relative h-full flex flex-col', className)}>
      {isLoading && (
        <div className="h-full w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      )}
      <div
        className={twMerge(
          'h-full flex flex-col flex-[1]',
          'transition-opacity ease-in-out duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default LoadingView
