import { ReactNode, forwardRef } from 'react'

import { ReactRef, useGSAP } from '@gsap/react'
import { ArrowRightIcon, GithubIcon } from '@site/src/generated/icons'
import { WithClass } from '@site/src/types/withClass'
import { animateFrom, animateTo } from '@site/src/utils/animations'
import { docUrl } from '@site/src/utils/doc-url'
import Heading from '@theme/Heading'

import { twJoin, twMerge } from 'tailwind-merge'

import DocLink from '../../DocLink'

interface HeroContentProps {
  ref?: ReactRef
  children?: ReactNode
}

const HeroContent = forwardRef<HTMLDivElement, WithClass<HeroContentProps>>(
  ({ children, className }, ref) => {
    useGSAP(
      () => {
        animateTo('.enjoy', { text: 'Enjoy ' })
        animateTo('.with-our-tools', { text: 'with our tools', delay: 0.3 })
        animateTo('.and-join', { text: 'and join', delay: 0.8 })
        animateTo('.your-ideas', { text: 'Your Ideas', delay: 1 })

        animateFrom('.subtitle', { opacity: 0, y: -100, delay: 0.8 })
        animateFrom('.hero-button', {
          opacity: 0,
          y: 50,
          delay: 1,
          stagger: 0.2,
        })
      },
      { scope: ref as React.RefObject<HTMLDivElement> },
    )

    return (
      <div
        ref={ref}
        className={twMerge(
          'hero-content',
          'flex flex-col items-center gap-[56px] h-auto',
          'text-center',
          // 'pb-[103px]',
          // 'pt-[195px] pb-[103px]',
          // 'bg-red-500',
          className,
        )}
      >
        <div className="z-50 flex flex-col gap-[20px]">
          <Heading
            as="h1"
            className={twMerge(
              'font-jaro',
              'whitespace-pre-line',
              'leading-[120%] text-center text-[#4850FF] font-[400]',
              'base:text-[40px] tracking-[-0.4px]',
              'md:text-[56px] tracking-[-0.56px]',
              'lg:text-[72px] tracking-[-0.72px]',
            )}
          >
            <span className="enjoy" />
            <span
              className={twMerge('with-our-tools text-tokColor-text.primary')}
            />
            {'\n'} <span className="and-join" />{' '}
            <span
              className={twMerge('your-ideas text-tokColor-text.primary')}
            />
          </Heading>
          <h3
            className={twMerge(
              'subtitle',
              'tokFont-pre-heading-03',
              'm-[0px]',
              'tracking-[-0.4px]',
              'text-tokColor-text.secondary',
            )}
          >
            To boost productivity efficiency
          </h3>
        </div>
        <div
          className={twJoin(
            'hero-button',
            'flex',
            'items-center',
            'justify-center',
            'gap-x-6',
          )}
        >
          <DocLink
            variant={'primary'}
            to={docUrl('docs/intro')}
            rightIcon={<ArrowRightIcon />}
            iconGap="8px"
          >
            Get started
          </DocLink>
          <DocLink
            to={'https://github.com/TOKTOKHAN-DEV/toktokhan-dev'}
            leftIcon={<GithubIcon className={'fill-tokColor-icon.primary'} />}
            iconGap="4px"
          >
            Github
          </DocLink>
        </div>
        {children}
      </div>
    )
  },
)

HeroContent.displayName = 'HeroContent'

export default HeroContent
