import { useCallback, useMemo, useState, useTransition } from 'react'

import { TokenKeys } from '../../../../App'

const useCheckbox = (initialState: TokenKeys[]) => {
  const [isPending, startTransition] = useTransition()
  const [checkedItems, setRealCheckedItems] = useState<Set<TokenKeys>>(
    new Set(initialState),
  )

  const allChecked = checkedItems.size === initialState.length
  const isIndeterminate = checkedItems.size > 0 && !allChecked

  const toggleItem = useCallback((value: TokenKeys) => {
    startTransition(() => {
      setRealCheckedItems((prevState) => {
        const newCheckedItems = new Set(prevState)
        if (newCheckedItems.has(value)) {
          newCheckedItems.delete(value)
        } else {
          newCheckedItems.add(value)
        }
        return newCheckedItems
      })
    })
  }, [])
  const setAll = useCallback(
    (checked: boolean) => {
      startTransition(() => {
        setRealCheckedItems(checked ? new Set(initialState) : new Set())
      })
    },
    [initialState],
  )

  return useMemo(
    () => ({
      checkedItems,
      allChecked,
      isIndeterminate,
      toggleItem,
      setAll,
      isPending,
    }),
    [allChecked, checkedItems, isIndeterminate, isPending, setAll, toggleItem],
  )
}

export default useCheckbox
