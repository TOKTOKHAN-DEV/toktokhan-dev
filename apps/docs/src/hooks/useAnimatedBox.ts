import { useEffect, useRef } from 'react'

import gsap from 'gsap'

interface AnimatedBoxOptions {
  enterRadius?: string
  exitRadius?: string
  enterWidth?: string
  exitWidth?: string
  threshold?: number
  rootMargin?: string
  duration?: number
  ease?: string
}

/**
 * 스크롤 시 요소의 모양을 애니메이션화하는 커스텀 훅
 * @param options - 애니메이션 옵션 설정
 * @returns 애니메이션을 적용할 요소의 ref
 */
export const useAnimatedBox = (options?: AnimatedBoxOptions) => {
  const ref = useRef<HTMLDivElement>(null)

  const {
    enterRadius = '0',
    exitRadius = '200px',
    enterWidth = '100%',
    exitWidth = 'calc(100% - 40px)',
    threshold = 0.2,
    rootMargin = '100px',
    duration = 0.5,
    ease = 'power5.inOut',
  } = options || {}

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 뷰포트에 진입할 때
            gsap.to(entry.target, {
              borderRadius: enterRadius,
              width: enterWidth,
              duration,
              ease,
            })
          } else {
            // 뷰포트에서 벗어날 때
            gsap.to(entry.target, {
              borderRadius: exitRadius,
              width: exitWidth,
              duration,
              ease,
            })
          }
        })
      },
      {
        threshold,
        rootMargin,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [
    enterRadius,
    exitRadius,
    enterWidth,
    exitWidth,
    threshold,
    rootMargin,
    duration,
    ease,
  ])

  return ref
}
