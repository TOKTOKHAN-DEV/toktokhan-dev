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
 * 반환한 targetRef를 사용하여 대상 컴포넌트에 intersectionObserver 이벤틀르 주기 위한 hooks입니다.
 *
 * hooks 선언시 props 설정이 가능하며, 화면에 표출되는 조건에 따라 onVisible, onHidden 함수가 실행됩니다.
 *
 * @category Hooks
 *
 * @typeParam T - 배열 요소의 타입
 * @typeParam K - Map의 키 타입
 *
 * @param onVisible - targetRef 요소가 보여질 때 실행할 함수
 * @param onHidden - targetRef 요소가 보이지 않을 때 실행할 함수
 * @param options - targetRef에 설정할 intersection observer 옵션
 *
 * @returns intersection Observer 이벤트가 할당된 Element useRef
 *
 * @example
 *
 * ```tsx
 *
 * const { targetRef } = useIntersectionObserver(
 *   {
 *     onVisible: () => onVisibleLast(),
 *     onHidden: () => onHiddenLast(),
 *     options: {
 *       threshold: 0.1,
 *     },
 *   },
 *   [],
 * );
 * ...
 *
 * return (
 *  <LastItem ref={targetRef} w="100%" />
 * )
 *
 * ```
 *
 */
export const useIntersectionObserver = (
  {
    onVisible,
    onHidden,
    options = { threshold: 0.5 },
  }: UseIntersectionObserverParams,
  deps: unknown[],
) => {
  const targetRef = useRef<HTMLElement>(null)

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
    ...deps,
  ])

  return { targetRef }
}
