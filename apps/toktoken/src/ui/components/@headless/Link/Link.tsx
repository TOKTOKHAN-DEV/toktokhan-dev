import { AnchorHTMLAttributes, ReactNode } from 'react'

import { ClassNameValue, twMerge } from 'tailwind-merge'

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  icon?: ReactNode
  children?: ReactNode
  className?: ClassNameValue
  iconSpacing?: string
  styles?: {
    _base?: ClassNameValue
    _hover?: ClassNameValue
  }
}

const Link = ({
  icon,
  children,
  iconSpacing,
  className,
  styles,
  ...props
}: LinkProps) => {
  const baseClasses = twMerge(
    'bg-blue-500 text-white font-medium rounded-lg text-xs px-3 py-2 text-center me-1 inline-flex items-center',
    styles?._base,
  )

  const hoverClasses = twMerge('hover:bg-blue-800', `hover:${styles?._hover}`)

  return (
    <a
      className={twMerge(
        `flex gap-[${iconSpacing || '4px'}]`,
        baseClasses,
        hoverClasses,
        className,
      )}
      {...props}
    >
      {children}
      {icon}
    </a>
  )
}

export default Link
