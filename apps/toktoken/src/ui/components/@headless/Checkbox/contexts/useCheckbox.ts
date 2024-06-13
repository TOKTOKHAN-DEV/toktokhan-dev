import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import { createContext } from '../../../../utils/create-context'

export interface useCheckboxProps {
  name?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  defaultChecked?: boolean
  isChecked?: boolean
  isDisabled?: boolean
  value?: string | number
  isIndeterminate?: boolean
  styles?: {
    _default: string
    _selected: string
  }
}

const defaultChecked = false

export const useCheckbox = (): useCheckboxProps => {
  const [isChecked, setIsChecked] = useState(!!defaultChecked)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.currentTarget.checked)
  }, [])

  const styles = useMemo(() => {
    return {
      _default: 'caption01-bold text-text-disabled',
      _selected: 'caption01-bold text-brand-500',
    }
  }, [])

  return { isChecked, onChange: handleChange, styles }
}

export const [CheckboxProvider, useCheckboxContext, CheckboxContext] =
  createContext(useCheckbox)
