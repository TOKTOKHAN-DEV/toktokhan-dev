import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'

import { createContext } from '../../../../utils/create-context'

export interface useTabProps {
  defaultIndex?: number
  selectedTabIndex?: number
  onChange?: (index: number) => void
  styles?: {
    _selected: string
    _default: string
  }
}

const defaultIndex = 0

export const useTabs = (): useTabProps => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(defaultIndex)

  const handleChange = useCallback(
    (index: number) => setSelectedTabIndex(index),
    [],
  )

  //  This token was added by the developer: pre-cation01
  const styles = useMemo(() => {
    return {
      _default: 'pre-caption01 text-text-disabled',
      _selected: 'pre-caption01 text-brand-500',
    }
  }, [])

  return { defaultIndex, selectedTabIndex, onChange: handleChange, styles }
}

export const [TabsProvider, useTabsContext, tabContext] = createContext(useTabs)
