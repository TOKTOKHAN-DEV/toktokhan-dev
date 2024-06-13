import { memo, useEffect } from 'react'

import 'prism-themes/themes/prism-one-light.css'
import Prism from 'prismjs'
import { twJoin } from 'tailwind-merge'

import { CopyIcon } from '../../generated/icons'
import useToast from '../../hooks/useToast'
import { copyToClipboard } from '../Sections/github/utils/copy-to-clipboard'
import Button from './Button'

const Code = ({
  code,
  language,
  className,
  hasCopyButton,
}: {
  code: string
  language: string
  className?: string
  hasCopyButton?: boolean
}) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  const { showToast, ToastComponent } = useToast()
  return (
    <div className="relative">
      {hasCopyButton && (
        <Button
          onClick={() => {
            copyToClipboard(code)
            showToast('Copied to clipboard', 3000)
          }}
          variant="unstyled"
          className={twJoin('absolute right-3 top-3')}
        >
          {ToastComponent}
          <CopyIcon className={twJoin('w-[18px] h-[18px] stroke-gray-500')} />
        </Button>
      )}
      <pre className={className}>
        <code className={`language-${language} text-[10px]`}>{code}</code>
      </pre>
    </div>
  )
}

export default memo(Code)
