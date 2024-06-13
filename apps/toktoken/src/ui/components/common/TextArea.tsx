import { TextareaHTMLAttributes, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = forwardRef(({ ...props }: TextAreaProps, ref: any) => {
  return <textarea ref={ref} className={twMerge(props.className)} {...props} />
})

TextArea.displayName = 'TextArea'

export default TextArea
