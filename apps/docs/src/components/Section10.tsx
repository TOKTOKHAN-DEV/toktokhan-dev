import { useCallback, useEffect, useRef, useState } from 'react'

import Link from '@docusaurus/Link'
import tailwindConfig from '@site/tailwind.config'

import gsap from 'gsap'
import { createPortal } from 'react-dom'

import { ArrowRightIcon, HandPeaceIcon } from '../generated/icons'
import { useScreenVarient } from '../hooks/useScreenVarient'
import { cn } from '../utils/cn'

// Constants
const COLORS = [
  'accent-brewin-blue',
  'accent-brewin-yellow',
  'accent-brewin-red',
  'accent-brewin-green',
] as const // blue, yellow, red, green
// Create slide colors with one clone for infinite loop
const slideColors = [
  COLORS,
  COLORS,
  COLORS,
  COLORS,
  COLORS,
  COLORS,
  COLORS,
  COLORS,
  COLORS,
  COLORS,
  COLORS,
  COLORS,
].flat()
const SLIDE_DURATION = 700 // ms
const INTERVAL_DURATION = 2000 // ms
const TRANSITION =
  'background 0.7s cubic-bezier(0.4,0,0.2,1), color 0.7s cubic-bezier(0.4,0,0.2,1)'

export const Section10 = () => {
  const { isBase, isLargerOrEqualMd } = useScreenVarient()

  const [isHovered, setIsHovered] = useState(false)
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const textScaleRef = useRef<gsap.core.Tween | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)
  const mainTextRef = useRef<HTMLParagraphElement>(null)

  // Handle slide transition
  const handleSlideTransition = useCallback(
    (timestamp: number) => {
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = timestamp
      }

      const elapsed = timestamp - lastUpdateTimeRef.current

      if (elapsed >= INTERVAL_DURATION) {
        setCurrent((prev) => {
          if (prev + 1 === slideColors.length) {
            setTimeout(() => {
              setIsTransitioning(false)
              setCurrent(0)
              setTimeout(() => setIsTransitioning(true), 20)
            }, SLIDE_DURATION)
            return prev + 1
          }
          return prev + 1
        })
        lastUpdateTimeRef.current = timestamp
      }

      if (isHovered) {
        animationFrameRef.current = requestAnimationFrame(handleSlideTransition)
      }
    },
    [isHovered, slideColors.length],
  )

  // Start/stop slide animation
  useEffect(() => {
    if (isHovered) {
      setCurrent(0)
      setIsTransitioning(true)
      lastUpdateTimeRef.current = 0
      animationFrameRef.current = requestAnimationFrame(handleSlideTransition)
    } else {
      setCurrent(0)
      setIsTransitioning(true)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isHovered, handleSlideTransition])

  // Handle mouse events
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [isLargerOrEqualMd])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isLargerOrEqualMd])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current || !isHovered) return

      const rect = containerRef.current.getBoundingClientRect()
      const isOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom

      if (isOutside) {
        handleMouseLeave()
        return
      }

      requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        })
      })
    },
    [isHovered, handleMouseLeave],
  )

  useEffect(() => {
    if (!isLargerOrEqualMd || !mainTextRef.current) return

    // Kill any existing animation
    if (textScaleRef.current) {
      textScaleRef.current.kill()
    }

    // Create new animation
    textScaleRef.current = gsap.to(mainTextRef.current, {
      scale: isHovered ? 0.8 : 1,
      duration: 0.3,
      ease: 'power2.out',
    })

    return () => {
      if (textScaleRef.current) {
        textScaleRef.current.kill()
        textScaleRef.current = null
      }
    }
  }, [isLargerOrEqualMd, isHovered])

  // Calculate slide index
  const slideIndex = current === slideColors.length ? 0 : current

  // Common styles
  const baseTextStyle = {
    transition: TRANSITION,
    willChange: 'color',
  }

  const mainTextStyle = {
    ...baseTextStyle,
  }

  useEffect(() => {
    if (isBase) {
      setIsHovered(false)
    }
  }, [isBase])

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !isHovered) return

      const rect = containerRef.current.getBoundingClientRect()
      const isOutside =
        mousePosition.x < rect.left ||
        mousePosition.x > rect.right ||
        mousePosition.y < rect.top ||
        mousePosition.y > rect.bottom

      if (isOutside) {
        handleMouseLeave()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isHovered, mousePosition, handleMouseLeave])

  return (
    <div>
      <div
        ref={containerRef}
        className={cn([
          'relative overflow-hidden gap-0 flex flex-col items-center justify-center',
          'w-full md:min-h-[400px] md:py-[80px] px-[40px] base:mt-[160px] md:mt-[240px]',
          'base:bg-background-basic-1',
          isHovered ? 'md:bg-accent-brewin-blue' : 'md:bg-background-basic-1',
        ])}
        style={{
          transition: TRANSITION,
          willChange: 'background',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* Slide background */}
        {isHovered && (
          <div
            className={`absolute inset-0 flex will-change-transform base:hidden md:flex ${isTransitioning ? 'transition-transform duration-700' : ''}`}
            style={{
              width: `${slideColors.length * 100}%`,
              transform: `translateX(-${slideIndex * (100 / slideColors.length)}%)`,
            }}
            aria-hidden
          >
            {slideColors.map((color, idx) => (
              <div key={idx} className={cn(['w-full h-full', `bg-${color}`])} />
            ))}
          </div>
        )}

        {/* Content */}
        <div
          className={cn([
            'relative z-10 w-full flex flex-col items-center justify-center',
            'base:text-content-1',
            isHovered ? 'md:text-content-8' : 'md:text-content-1',
          ])}
        >
          <p className="text-center p-0 m-0" style={baseTextStyle}>
            아이디어를 현실로.
          </p>
          <p
            className="text-center whitespace-pre-line p-0 m-0"
            style={baseTextStyle}
          >
            함께 만들고 싶은 무언가가 있다면,
          </p>
          <p
            ref={mainTextRef}
            className="typo-uncut-display-01 base:mt-[16px] md:mt-0 text-center"
            style={mainTextStyle}
          >
            let&apos;s team up!
          </p>
          <FloatingButtonPortal
            isHovered={isHovered}
            mousePosition={mousePosition}
            currentColor={slideColors[current]}
          />
        </div>
      </div>
      <div className="base:flex md:hidden flex justify-center items-center w-[100%] pt-[64px]">
        <FloatingLinkButton
          className={`bg-accent-brewin-green text-content-8 w-fit rounded-[16px] hover:text-content-8`}
        />
      </div>
    </div>
  )
}

const FloatingLinkButton = ({
  style,
  className,
}: {
  className?: string
  style?: React.CSSProperties
}) => {
  const TOKTOKHAN_URL =
    'https://www.toktokhan.dev/contact/project?utm_source=google&utm_medium=display_image_pmax&utm_campaign=pmax&utm_content=assetgroup1&gad_source=1&gad_campaignid=21463060788&gbraid=0AAAAApdFtMV2SgqT_4Jq1cxRrpo3f1N3Q&gclid=Cj0KCQjw2tHABhCiARIsANZzDWrvWf7_Sm_qLUlC8giEELkCzCmDQwBR451tsUO3Q_lpZZ6lIOFUp_kaAijtEALw_wcB'
  return (
    <Link
      href={TOKTOKHAN_URL}
      target="_blank"
      className={cn([
        'flex flex-row items-center justify-center gap-[8px]',
        'px-6 py-3 rounded-full border-none bg-white',
        'typo-uncut-heading-01 whitespace-nowrap cursor-pointer no-underline hover:no-underline pointer-events-auto',
        className,
      ])}
      style={style}
    >
      <HandPeaceIcon className="size-[24px]" />
      <span className="typo-uncut-heading-03">Collaborate!</span>
      <ArrowRightIcon className="size-[16px]" />
    </Link>
  )
}

const FloatingButtonPortal = ({
  isHovered,
  mousePosition,
  currentColor,
}: {
  isHovered: boolean
  mousePosition: { x: number; y: number }
  currentColor: string
}) => {
  if (!isHovered) return null

  console.log(currentColor)

  return createPortal(
    <div className="fixed top-0 left-0 z-[9999] base:hidden md:block">
      <FloatingLinkButton
        className={cn([
          'absolute -translate-x-[50%] -translate-y-[50%] will-change-[left,top]',
          'text-red-500',
        ])}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
    </div>,
    document.body,
  )
}
