import { useCallback, useEffect, useRef, useState } from 'react'

import Link from '@docusaurus/Link'

import { ArrowRightIcon, HandPeaceIcon } from '../generated/icons'

// Constants
const COLORS = ['#2563eb', '#eab308', '#ef4444', '#22c55e'] as const // blue, yellow, red, green
const SLIDE_DURATION = 700 // ms
const INTERVAL_DURATION = 2000 // ms
const TRANSITION =
  'background 0.7s cubic-bezier(0.4,0,0.2,1), color 0.7s cubic-bezier(0.4,0,0.2,1)'

// FloatingLinkButton 컴포넌트 분리
const FloatingLinkButton = ({
  left,
  top,
  color,
  href,
  handIconColor,
  arrowIconColor,
  style,
  className,
}: {
  left: number
  top: number
  color: string
  href: string
  handIconColor?: string
  arrowIconColor?: string
  className?: string
  style?: React.CSSProperties
}) => (
  <Link
    href={href}
    target="_blank"
    className={`absolute border-none bg-white px-6 py-3 rounded-full font-medium whitespace-nowrap typo-uncut-heading-01 flex flex-row items-center justify-center gap-[8px] cursor-pointer no-underline hover:no-underline pointer-events-auto ${className}`}
    style={{
      left: `${left}px`,
      top: `${top}px`,
      transform: 'translate(-50%, -50%)',
      willChange: 'left, top',
      color,
      ...style,
    }}
  >
    <HandPeaceIcon
      className="size-[24px]"
      style={{ color: handIconColor || color }}
    />
    <span>Collaborate!</span>
    <ArrowRightIcon
      className="size-[16px]"
      style={{ color: arrowIconColor || color }}
    />
  </Link>
)

export const Section10 = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)

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

  // Calculate slide index
  const slideIndex = current === slideColors.length ? 0 : current

  // Common styles
  const baseTextStyle = {
    color: isHovered ? 'white' : 'black',
    transition: TRANSITION,
    willChange: 'color',
  }

  const mainTextStyle = {
    ...baseTextStyle,
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        })
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center py-[80px] px-[40px] gap-0 overflow-hidden base:mt-[160px] md:mt-[240px]"
      style={{
        background: isHovered ? '#2563eb' : 'white',
        transition: TRANSITION,
        minHeight: 400,
        willChange: 'background',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Slide background */}
      {isHovered && (
        <div
          className={`absolute inset-0 flex will-change-transform ${isTransitioning ? 'transition-transform duration-700' : ''}`}
          style={{
            width: `${slideColors.length * 100}%`,
            transform: `translateX(-${slideIndex * (100 / slideColors.length)}%)`,
          }}
          aria-hidden
        >
          {slideColors.map((color, idx) => (
            <div
              key={idx}
              style={{
                width: `${100 / slideColors.length}%`,
                height: '100%',
                background: color,
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
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
          className="typo-uncut-display-01 base:mt-[16px] md:mt-0 text-center"
          style={mainTextStyle}
        >
          let&apos;s team up!
        </p>
        {isHovered && (
          <div className="fixed top-0 left-0 z-[9999] base:hidden md:block">
            <FloatingLinkButton
              left={mousePosition.x}
              top={mousePosition.y}
              color={slideColors[current]}
              href="https://www.toktokhan.dev/contact/project?utm_source=google&utm_medium=display_image_pmax&utm_campaign=pmax&utm_content=assetgroup1&gad_source=1&gad_campaignid=21463060788&gbraid=0AAAAApdFtMV2SgqT_4Jq1cxRrpo3f1N3Q&gclid=Cj0KCQjw2tHABhCiARIsANZzDWrvWf7_Sm_qLUlC8giEELkCzCmDQwBR451tsUO3Q_lpZZ6lIOFUp_kaAijtEALw_wcB"
              handIconColor={slideColors[current]}
              arrowIconColor={slideColors[current]}
            />
          </div>
        )}
      </div>
      <div className="base:block md:hidden fixed justify-center items-center">
        <FloatingLinkButton
          left={mousePosition.x}
          top={mousePosition.y}
          style={{}}
          className="relative"
          color={slideColors[current]}
          href="https://www.toktokhan.dev/contact/project?utm_source=google&utm_medium=display_image_pmax&utm_campaign=pmax&utm_content=assetgroup1&gad_source=1&gad_campaignid=21463060788&gbraid=0AAAAApdFtMV2SgqT_4Jq1cxRrpo3f1N3Q&gclid=Cj0KCQjw2tHABhCiARIsANZzDWrvWf7_Sm_qLUlC8giEELkCzCmDQwBR451tsUO3Q_lpZZ6lIOFUp_kaAijtEALw_wcB"
          handIconColor={slideColors[current]}
          arrowIconColor={slideColors[current]}
        />
      </div>
    </div>
  )
}
