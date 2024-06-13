import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import { isObject } from 'lodash'

import { createContext } from '../../../../utils/create-context'

export type EventOrValue = React.ChangeEvent<HTMLInputElement> | string | number

export interface useCheckboxGroupProps {
  onChange?: (eventOrValue: EventOrValue) => void
  isDisabled?: boolean
  defaultValues?: (string | number)[]
  values?: (string | number)[]
  styles?: {
    _default: string
    _selected: string
  }
}
function isInputEvent(value: any): value is { target: HTMLInputElement } {
  return value && isObject(value) && 'target' in value && isObject(value.target)
}
const defaultChecked = false

export const useCheckboxGroup = (): useCheckboxGroupProps => {
  const [values, setValues] = useState<(string | number)[]>([])
  const [isIndeterminate, setIsIndeterminate] = useState(false)

  const handleChange = useCallback(
    (eventOrValue: EventOrValue) => {
      if (!values) return

      const checked =
        isInputEvent(eventOrValue) ?
          eventOrValue.target.checked
        : !values.includes(eventOrValue)

      const selectedValue =
        isInputEvent(eventOrValue) ? eventOrValue.target.value : eventOrValue

      const nextValue =
        checked ?
          [...values, selectedValue]
        : values.filter((v) => String(v) !== String(selectedValue))

      setValues(nextValue)
    },
    [setValues, values],
  )
  const styles = useMemo(() => {
    return {
      _default: 'caption01-bold text-text-disabled',
      _selected: 'caption01-bold text-brand-500',
    }
  }, [])

  return { values, onChange: handleChange, styles }
}

export const [
  CheckboxGroupProvider,
  useCheckboxGroupContext,
  CheckboxGroupContext,
] = createContext(useCheckboxGroup)
