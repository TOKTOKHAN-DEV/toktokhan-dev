import { InputHTMLAttributes, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef(({ ...props }: InputProps, ref: any) => {
  return (
    <input
      ref={ref}
      type="text"
      className={twMerge(props.className)}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export default Input
