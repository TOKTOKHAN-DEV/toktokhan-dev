import { Dispatch, useCallback, useMemo, useState } from 'react'

import { createContext } from '../../../../utils/create-context'

export interface useAccordionProps {
  defaultIndex?: number
  openIndexes?: Set<number>
  setOpenIndexes?: Dispatch<React.SetStateAction<Set<number>>>
  allowMultiple?: boolean
  onToggle?: (index?: number) => void
  checkIsExpanded?: (index?: number) => boolean
  hasDivider?: boolean
  styles?: {
    _container?: string
    _item?: string
    _button?: string
    _panel?: string
  }
}

const defaultIndex = 0

export const useAccordion = (): useAccordionProps => {
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set())

  const toggle = useCallback((index?: number) => {
    if (index === undefined) return
    setOpenIndexes((prevIndexes) => {
      const newIndexes = new Set(prevIndexes)
      newIndexes.clear()
      newIndexes.add(index)
      return newIndexes
    })
  }, [])

  const styles = useMemo(() => {
    return {
      _item: '',
      _button: '',
      _panel: '',
    }
  }, [])

  const checkIsExpanded = useCallback(
    (index?: number) => openIndexes.has(index !== undefined ? index : 9999999),
    [openIndexes],
  )

  return {
    defaultIndex,
    openIndexes,
    setOpenIndexes,
    onToggle: toggle,
    checkIsExpanded,
    styles,
    hasDivider: false,
  }
}

export const [AccordionProvider, useAccordionContext, AccordionContext] =
  createContext(useAccordion)
