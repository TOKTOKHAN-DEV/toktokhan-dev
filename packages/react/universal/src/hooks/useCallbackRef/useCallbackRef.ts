import { useCallback, useEffect, useRef } from 'react'

import { Fn } from '@toktokhan-dev/universal'

/**
 * @category Hooks
 */
export const useCallbackRef = <T extends Fn>(callback: T): T => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoized: T = useCallback(
    ((...params) => {
      if (callbackRef.current) {
        return callbackRef.current(...params)
      }
    }) as T,
    [],
  )

  return memoized
}
