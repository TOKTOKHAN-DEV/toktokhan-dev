import {
  BrewinLogoIcon,
  GithubIcon,
  InstagramLogoIcon,
  YoutubeLogoIcon,
} from '@site/src/generated/icons'

import { ClassNameValue, twJoin, twMerge } from 'tailwind-merge'

export const HomeFooter = () => {
  return (
    <div
      className={twMerge(
        'bg-background-basic-1',
        'py-[80px] px-[65px]',
        'flex flex-col items-center',
        'border-t-[1px] border-x-0 border-b-0 border-solid border-t-border-basic-1',
      )}
    >
      <a href="/">
        <BrewinLogoIcon
          className={twJoin(
            'h-[22px]',
            'text-content-1',
            'w-[100px]',
            'h-[24px]',
          )}
        />
      </a>
      <div
        className={twJoin(
          'flex base:flex-col md:flex-row justify-center items-center gap-[20px] mt-[32px]',
        )}
      >
        <p className={twJoin('typo-uncut-body-06', 'm-0', 'text-content-2')}>
          © 2021 toktokhan.dev All Rights Reserved.
        </p>
        <Divider className="hidden md:block" />
        <div className={twJoin('flex gap-x-[8px] items-center justify-center')}>
          <a
            href="https://github.com/TOKTOKHAN-DEV/toktokhan-dev"
            className="h-[24px]"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon className="text-content-2 size-[24px]" />
          </a>
          <a
            href="https://www.youtube.com/@toktokhandev"
            className="h-[24px]"
            target="_blank"
            rel="noreferrer"
          >
            <YoutubeLogoIcon className="text-content-2 size-[24px]" />
          </a>
          <a
            href="https://www.instagram.com/toktokhan.dev/"
            className="h-[24px]"
            target="_blank"
            rel="noreferrer"
          >
            <InstagramLogoIcon className="text-content-2 size-[24px]" />
          </a>
        </div>
      </div>
      <div className="flex base:flex-col md:flex-row items-center gap-[6px] base:mt-[20px] md:mt-[14px]">
        <div className="flex flex-row gap-[12px] items-center">
          <p className={twJoin('typo-uncut-body-06', 'm-0', 'text-content-2')}>
            서울 마포구 동교로12안길 39
          </p>
          <Divider />
          <p className={twJoin('typo-uncut-body-06', 'm-0', 'text-content-2')}>
            대표 서장원
          </p>
        </div>
        <div className="flex flex-row gap-[12px] items-center">
          <a
            className={twJoin(
              'typo-uncut-body-06',
              'm-0',
              'text-content-2',
              'hover:text-content-2',
              'no-underline',
              'hover:no-underline',
            )}
            href="tel:02-336-6777"
          >
            대표번호 02-336-6777
          </a>
          <Divider />
          <a
            className={twJoin(
              'typo-uncut-body-06',
              'm-0',
              'text-content-2',
              'hover:text-content-2',
              'no-underline',
              'hover:no-underline',
            )}
            href="tel:02-336-6777"
          >
            팩스 02-336-6779
          </a>
        </div>
        <div className="flex flex-row ml-[6px] gap-[12px] items-center">
          <Divider className="base:hidden md:block" />
          <p className={twJoin('typo-uncut-body-06', 'm-0', 'text-content-2')}>
            사업자등록번호 476-81-01694
          </p>
        </div>
      </div>
    </div>
  )
}

const Divider = ({ className }: { className?: ClassNameValue }) => {
  return <div className={twJoin('w-[1px] h-[8px] bg-content-5', className)} />
}
