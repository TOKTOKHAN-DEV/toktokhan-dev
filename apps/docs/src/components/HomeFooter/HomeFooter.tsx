import Link from '@docusaurus/Link'
import {
  DocusaurusIcon,
  GithubIcon,
  LinkedinIcon,
  LogoIcon,
  WebsiteIcon,
} from '@site/src/generated/icons'

import { twJoin, twMerge } from 'tailwind-merge'

import Button from '../Button'

const HomeFooter = () => {
  return (
    <div
      className={twMerge(
        'bg-tokColor-background.inverse',
        'text-tokColor-text.primary.inverse',
        'py-[56px]',
        'flex flex-col items-center gap-y-[24px]',
      )}
    >
      <LogoIcon className={twJoin('h-[22px]')} />
      <div className={twJoin('flex flex-col items-center gap-y-[8px]')}>
        <div className={twJoin('flex gap-x-[8px]')}>
          <GithubIcon className="fill-tokColor-icon.primary.inverse" />
          <LinkedinIcon className="fill-tokColor-icon.primary.inverse" />
          <WebsiteIcon className="stroke-tokColor-icon.primary.inverse" />
          {/* <Button
            variant={'unstyled'}
            icon={<GithubIcon className="fill-tokColor-icon.primary.inverse" />}
          />
          <Button
            variant={'unstyled'}
            icon={
              <LinkedinIcon className="fill-tokColor-icon.primary.inverse" />
            }
          />
          <Button
            variant={'unstyled'}
            icon={
              <WebsiteIcon className="stroke-tokColor-icon.primary.inverse" />
            }
          /> */}
        </div>
        <p className={twJoin('tokFont-pre-body-06', 'm-0')}>
          Copyright © 2024 TokDocs, Inc.
        </p>
      </div>
      <div
        className={twJoin(
          'w-fit',
          'bg-tokColor-background.inverse.secondary',
          'tokFont-pre-body-05',
          'px-[12px] py-[4px]',
          'rounded-[4px]',
          'mb-0 ',
          'flex items-center gap-[4px]',
          'whitespace-nowrap',
        )}
      >
        Built with
        <span className="flex items-center gap-[2px] tokFont-pre-body-05">
          <DocusaurusIcon />
          Docusaurus
        </span>
      </div>
    </div>
  )
}

export default HomeFooter
