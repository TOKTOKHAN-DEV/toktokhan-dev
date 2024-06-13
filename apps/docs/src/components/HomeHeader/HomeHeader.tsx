import { ArrowRightIcon, GithubIcon } from '@site/src/generated/icons'
import { docUrl } from '@site/src/utils/doc-url'
import Heading from '@theme/Heading'

import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import Button from '../Button'
import DocLink from '../DocLink'

const HomeHeader = () => {
  return (
    <div
      className={twMerge(
        // 'mx-auto',
        // 'max-w-screen-lg',
        'flex flex-col items-center gap-[56px] h-auto',
        'text-center',
        'pt-[195px] pb-[103px]',
      )}
    >
      <div className="flex flex-col gap-[20px]">
        <Heading
          as="h1"
          className={twMerge(
            // 'base:text-2xl',
            // 'sm:text-5xl',
            'whitespace-pre-line',
            'text-center text-[72px] leading-[120%] tracking-[-0.72px] text-[#4850FF]',
            'font-[400]',
            'font-jaro',
          )}
        >
          Enjoy{' '}
          <span className={twMerge('text-tokColor-text.primary')}>
            with our tools
          </span>
          {'\n'} and join{' '}
          <span className={twMerge('text-tokColor-text.primary')}>
            Your Ideas
          </span>
        </Heading>
        <h3
          className={twMerge(
            'text-tokColor-text.secondary',
            'tokFont-pre-heading-03',
            'm-[0px]',
            'tracking-[-0.4px]',
          )}
        >
          To boost productivity efficiency
        </h3>
      </div>
      <div
        className={clsx('flex', 'items-center', 'justify-center', 'gap-x-6')}
      >
        <DocLink
          variant={'primary'}
          to={docUrl('docs/intro')}
          rightIcon={<ArrowRightIcon />}
          iconGap="8px"
        >
          Get started
        </DocLink>
        <DocLink to={docUrl('index')} leftIcon={<GithubIcon />} iconGap="4px">
          Github
        </DocLink>
      </div>
    </div>
  )
}

export default HomeHeader
