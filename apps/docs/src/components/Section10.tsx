import { useCallback, useEffect, useRef, useState } from 'react'

// Constants
const COLORS = ['#2563eb', '#eab308', '#ef4444', '#22c55e'] as const // blue, yellow, red, green
const SLIDE_DURATION = 700 // ms
const INTERVAL_DURATION = 2000 // ms
const TRANSITION =
  'background 0.7s cubic-bezier(0.4,0,0.2,1), color 0.7s cubic-bezier(0.4,0,0.2,1)'

export const Section10 = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [current, setCurrent] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const animationFrameRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)

  // Create slide colors with one clone for infinite loop
  const slideColors = [...COLORS, COLORS[0]]

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
    fontFamily: 'Uncut Sans Variable',
    fontSize: '220px',
    fontWeight: 700,
    lineHeight: '100%',
    letterSpacing: '-8.4px',
  }

  return (
    <div
      className="relative w-full flex flex-col items-center justify-center py-[80px] px-[40px] gap-0 overflow-hidden"
      style={{
        background: isHovered ? '#2563eb' : 'white',
        transition: TRANSITION,
        minHeight: 400,
        willChange: 'background',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        <p style={mainTextStyle}>let&apos;s team up!</p>
      </div>
    </div>
  )
}
