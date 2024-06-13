import { twJoin } from 'tailwind-merge'

import { ArrowUpRightIcon } from '../../../../generated/icons'
import Link from '../../../@headless/Link'
import { LinkProps } from '../../../@headless/Link/Link'

//  This token was added by the developer : pre-caption01
const DocsLink = ({ ...props }: LinkProps) => {
  return (
    <Link
      target="_blank"
      href="https://toktokhan-dev-docs.vercel.app/docs/docs/toktoken/Introduction"
      className={twJoin([
        'flex justify-center pre-caption01 text-[#9F9F9F] px-[8px] py-[6px]',
        'bg-white border-[1px] rounded-[8px] border-[#EAEAEA]',
      ])}
      styles={{
        _base: 'bg-button-secondary',
        _hover: 'bg-button-secondary-hover',
      }}
      icon={<ArrowUpRightIcon />}
      iconSpacing="4px"
      {...props}
    >
      How to set
    </Link>
  )
}

export default DocsLink
