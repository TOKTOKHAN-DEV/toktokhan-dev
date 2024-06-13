import React, { ReactNode, forwardRef } from 'react'

import { CircleIcon } from '@site/src/generated/icons'

import { twJoin, twMerge } from 'tailwind-merge'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subTitle: string
  description: string
  children: ReactNode
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ title, subTitle, description, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          className,
          'w-full h-screen bg-tokColor-background.secondary',
          // 'px-[96ox]',
          'flex justify-center items-center',
          'base:py-[56px] md:py-[64px] xl:py-[72px]',
          'base:px-[16px] lg:px-0',
          // 'border-solid border-[1px] border-tokColor-border.primary',
          // 'base:px-2'
          'h-full',
        )}
        {...props}
      >
        <div
          className={twJoin(
            'flex flex-col gap-y-[56px] items-center',
            'sm:max-w-screen-sm md:max-w-screen-md',
          )}
        >
          <div className={twJoin('flex flex-col gap-y-[24px] items-center')}>
            <div className="flex flex-col gap-y-[8px] items-center">
              <h1
                className={twJoin(
                  'font-jaro, text-tokColor-text.brand',
                  'flex gap-[8px] items-center',
                )}
              >
                <CircleIcon className="fill-tokColor-icon.brand" />
                {title}
                <CircleIcon className="fill-tokColor-icon.brand" />
              </h1>
              <h2
                className={twJoin(
                  'bg-tokColor-background.primary',
                  'py-[8px] px-[20px]',
                  'border-solid',
                  'border-[1px]',
                  'border-tokColor-border.primary',
                  'rounded-full',
                  'text-tokColor-text.primary',
                  'tokFont-pre-body-06',
                  'mb-[0px]',
                )}
              >
                {subTitle}
              </h2>
            </div>
            <p
              className={twJoin(
                'text-tokColor-text.primary',
                'tokFont-pre-body-02',
                'text-center',
              )}
            >
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    )
  },
)

Section.displayName = 'Section'
export default Section
