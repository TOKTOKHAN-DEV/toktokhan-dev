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

  const memozied: T = useCallback(
    ((...params) => callbackRef.current(...params)) as T,
    [],
  )

  return memozied
}
