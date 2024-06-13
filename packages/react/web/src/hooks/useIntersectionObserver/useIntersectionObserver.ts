import { useCallback, useEffect, useRef } from 'react'

import { useCallbackRef } from '@toktokhan-dev/react-universal'

type UseIntersectionObserverParams = {
  onVisible?: (
    entry?: IntersectionObserverEntry,
    observer?: IntersectionObserver,
  ) => void
  onHidden?: (
    entry?: IntersectionObserverEntry,
    observer?: IntersectionObserver,
  ) => void
  options?: IntersectionObserverInit
}

/**
 * @category Hooks
 */
export const useIntersectionObserver = ({
  onVisible,
  onHidden,
  options = { threshold: 0.5 },
}: UseIntersectionObserverParams) => {
  const targetRef = useRef<HTMLDivElement>(null)

  const onVisibleRef = useCallbackRef(onVisible || (() => {}))
  const onHiddenRef = useCallbackRef(onHidden || (() => {}))

  const isPassedVisibleCallback = !!onVisible
  const isPassedHiddenCallback = !!onHidden

  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (entry.isIntersecting && isPassedVisibleCallback) {
        onVisibleRef(entry, observer)
      }
      if (!entry.isIntersecting && isPassedHiddenCallback) {
        onHiddenRef(entry, observer)
      }
    },
    [
      onHiddenRef,
      onVisibleRef,
      isPassedVisibleCallback,
      isPassedHiddenCallback,
    ],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: options.root,
      rootMargin: options.rootMargin,
      threshold: options.threshold,
    })

    const target = targetRef.current

    if (target) {
      observer.observe(target)
    }

    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [
    handleIntersection, //
    options.root,
    options.rootMargin,
    options.threshold,
  ])

  return { targetRef }
}
