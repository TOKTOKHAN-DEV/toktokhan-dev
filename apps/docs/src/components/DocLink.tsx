import { ReactNode } from 'react'

import Link from '@docusaurus/Link'

import { twMerge } from 'tailwind-merge'

const COMMON_CLASSES = twMerge(
  // 'focus-visible:outline',
  // 'focus-visible:outline-2',
  // 'focus-visible:outline-offset-2',
  // 'focus-visible:outline-white',
  'tokFont-pre-body-03',
  'rounded-[8px]',
  'w-[193px] h-[56px]',
  'flex items-center justify-center',
  'hover:no-underline',
)

const VARIANTS = {
  unStyled: '',
  base: twMerge(
    COMMON_CLASSES,
    'dark:shadow-sm',
    'border-solid border-[1px] border-tokColor-border.primary',
    'text-tokColor-text.primary',
    'hover:bg-tokColor-button.tertiary.hover',
    'hover:text-tokColor-text.primary',
    'bg-tokColor-button.tertiary',
  ),
  primary: twMerge(
    COMMON_CLASSES,
    'text-[#FFFFFF]',
    // 'text-tokColor-text.primary.inverse',
    'bg-tokColor-icon.primary.inverse',
    'hover:bg-tokColor-button.primary.hover',
    'hover:text-tokColor-text.primary.inverse',
    'bg-tokColor-button.primary',
  ),
}

type LinkVariant = keyof typeof VARIANTS

interface DocLinkProps {
  variant?: LinkVariant
  to: string
  children: ReactNode
  className?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  iconGap?: string
}

const DocLink = ({
  variant = 'base',
  to,
  children,
  className,
  leftIcon,
  rightIcon,
  iconGap,
}: DocLinkProps) => {
  const classes = twMerge(VARIANTS[variant], className)

  return (
    <Link
      to={to}
      className={twMerge(classes, `flex gap-[${iconGap ?? '0px'}]`)}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  )
}

export default DocLink
