import { ReactNode } from 'react'

import { twJoin } from 'tailwind-merge'

import LoadingView from '../../common/LoadingView'

interface GithubGuardProps {
  isConfirmed?: boolean
  fallback?: ReactNode
  children: ReactNode
  isLoading: boolean
}

const GithubGuard = ({
  isLoading,
  isConfirmed,
  children,
  fallback,
}: GithubGuardProps) => {
  return (
    <LoadingView isLoading={isLoading}>
      <div className={twJoin(isConfirmed ? 'h-full flex flex-col' : 'hidden')}>
        {children}
      </div>
      <div className={twJoin(isConfirmed ? 'hidden' : 'block')}>{fallback}</div>
    </LoadingView>
  )
}

export default GithubGuard
