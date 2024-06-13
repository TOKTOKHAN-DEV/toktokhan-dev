import { ReactNode } from 'react'

import _ from 'lodash'

import {
  CheckboxGroupProvider,
  useCheckboxGroup,
  useCheckboxGroupProps,
} from './contexts/useCheckboxGroup'

interface CheckboxGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    useCheckboxGroupProps {
  children: ReactNode
}
const CheckboxGroup = ({
  children,
  onChange,
  className,
  isDisabled,
  values,
  styles,
  ...props
}: CheckboxGroupProps) => {
  const {
    onChange: _onChange,
    values: _values,
    isDisabled: _isDisabled,
    styles: _styles,
  } = useCheckboxGroup()
  return (
    <CheckboxGroupProvider
      value={{
        onChange: onChange ?? _onChange,
        styles: styles ?? _styles,
        isDisabled: isDisabled ?? _isDisabled,
        values: values ?? _values,
      }}
    >
      <div className="flex gap-[12px]">{children}</div>
    </CheckboxGroupProvider>
  )
}

export default CheckboxGroup
