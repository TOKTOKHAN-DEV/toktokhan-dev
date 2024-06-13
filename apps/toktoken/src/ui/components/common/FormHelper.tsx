import { ReactElement, ReactNode, cloneElement } from 'react'

import { twMerge } from 'tailwind-merge'

interface FormControlOptions {
  isRequired?: boolean
  isDisabled?: boolean
  isReadOnly?: boolean
}

interface FormHelperProps extends FormControlOptions {
  label: string
  children: ReactNode
  state?: 'error' | 'success'
  errorText?: string
  successText?: string
  helperText?: string
}
const FormHelper = ({
  label,
  errorText,
  successText,
  helperText,
  children,
  isRequired,
  isDisabled,
  isReadOnly,
  ...props
}: FormHelperProps) => {
  const isShowErrorText = !!errorText
  const isShowSuccessText = !!successText && !isShowErrorText
  const isShowHelper = !!helperText && !isShowErrorText && !isShowSuccessText

  const inputClasses = twMerge([
    'block w-full p-2 text-gray-900 border rounded-lg bg-gray-50 text-xs',
    'disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none',

    // custom
    'text-field', // This token was added by the developer
    isShowErrorText ?
      'border-red-500 border text-red-600 focus:outline-none focus:ring-inset focus:ring-red-500'
    : 'border-none focus:outline-none focus:ring-inset focus:ring-[1px] focus:ring-button-primary',

    // system
    'h-[40px]',
    'placeholder:text-text-disabled-on placeholder:text-field',
    'rounded-[4px]',
    'bg-field-solid',
    'fill-field-solid',
    'px-[12px] py-[8px]',

    isShowSuccessText ? 'border-green-500 text-green-600' : '',
  ])

  return (
    <div>
      {/*  This token was added by the developer: pre-cation01 */}
      <label htmlFor="small-input" className="block mb-[4px] pre-caption01">
        {label}
        {isRequired && <span style={{ color: '#E2483D' }}> *</span>}
      </label>
      {cloneElement(
        children as ReactElement<HTMLInputElement | HTMLTextAreaElement>,
        {
          disabled: isDisabled,
          readOnly: isReadOnly,
          required: isRequired,
          className: twMerge(inputClasses),
        },
      )}
      <div className="mt-1">
        {isShowErrorText && <p className="text-red-500 text-xs">{errorText}</p>}
        {isShowSuccessText && (
          <p className="text-blue-500 text-xs">{successText}</p>
        )}
        {isShowHelper && (
          <p className="text-gray-500 text-xs mx-2">{helperText}</p>
        )}
      </div>
    </div>
  )
}

export default FormHelper
