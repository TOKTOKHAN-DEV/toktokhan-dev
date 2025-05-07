import { ReactNode } from 'react'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

import { twMerge } from 'tailwind-merge'

type CommonLayoutProps = {
  metaData?: {
    title?: string
    description?: string
  }
  header: ReactNode
  footer: ReactNode
  children: ReactNode
}
export const CommonLayout = ({
  metaData,
  header,
  footer,
  children,
}: CommonLayoutProps) => {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout
      title={`${metaData?.title || siteConfig.title}`}
      description={`${metaData?.description || `Description will go into a meta tag in <head />`}`}
    >
      <div
        className={twMerge(
          'main-wrapper', //
          // 'min-h-[100dvh]',
          'flex flex-col',
        )}
      >
        {header}
        <div
          className={twMerge(
            // 'sm:gap-20 md:gap-28 lg:gap-40',
            // 'w-full max-w-[592px] sm:max-w-[656px] md:max-w-[896px] lg:max-w-screen-lg',
            // 'px-2 base:px-2',
            // 'pb-12 base:pb-16 sm:pb-20 md:pb-40',
            // 'pt-12 base:pt-16 sm:pt-20 md:pt-40',
            'w-full',
            'mx-auto',
          )}
        >
          {children}
        </div>
        {footer}
      </div>
    </Layout>
  )
}
