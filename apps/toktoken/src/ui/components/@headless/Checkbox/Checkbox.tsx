import React, { ReactNode } from 'react'

import { twMerge } from 'tailwind-merge'

import { CheckboxOffIcon, CheckboxOnIcon } from '../../../generated/icons'
import {
  CheckboxContext,
  useCheckboxContext,
  useCheckboxProps,
} from './contexts/useCheckbox'

interface RootCheckboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    useCheckboxProps {
  children: ReactNode
}

const Checkbox = ({
  children,
  name,
  defaultChecked,
  isChecked,
  isDisabled,
  value,
  onChange,
  isIndeterminate,
}: RootCheckboxProps) => {
  return (
    <CheckboxContext.Consumer>
      {({
        value: _value,
        name: _name,
        isChecked: _isChecked,
        onChange: _onChange,
        defaultChecked: _defaultChecked,
        isDisabled: _isDisabled,
        isIndeterminate: _isIndeterminate,
        styles: _styles,
      }) => (
        <label
          data-toktoken-state={isChecked ? 'selected' : 'not-selected'}
          className="flex items-center cursor-pointer"
        >
          <input
            className={'hidden'}
            type="checkbox"
            name={name ?? _name}
            defaultChecked={defaultChecked ?? _defaultChecked}
            checked={isChecked ?? _isChecked}
            disabled={isDisabled ?? _isDisabled}
            value={value ?? _value}
            onChange={onChange ?? _onChange}
            ref={(input) => {
              if (input) {
                input.indeterminate =
                  isIndeterminate ?? _isIndeterminate ?? false
              }
            }}
          />
          {isChecked ?
            <CheckboxOnIcon />
          : <CheckboxOffIcon />}
          {/* This token was added by the developer */}
          <div className="flex ml-[4px] text-field">{children}</div>
        </label>
      )}
    </CheckboxContext.Consumer>
  )
}

export default Checkbox
