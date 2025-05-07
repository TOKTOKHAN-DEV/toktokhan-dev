import { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'

import {
  CalendarDotsIcon,
  HandPeaceIcon,
  LegoSmileyIcon,
  PaperPlaneTiltIcon,
  ShareFatIcon,
  SmileyMeltingIcon,
} from '../generated/icons'

export const Section3 = () => {
  return (
    <div className={`flex flex-col h-full mt-[320px] pb-[180px]`}>
      <div className={'flex flex-col items-center'}>
        {/* top content */}
        <div className={'flex flex-col items-center flex-1 gap-y-[8px]'}>
          <Badge />
          <div className={'flex flex-col items-center gap-y-[40px]'}>
            <span className="inline-block typo-uncut-display-03 text-center text-content-1 md:tracking-[-2.4px] base:tracking-[-1.44px] md:whitespace-normal base:whitespace-pre-line">
              {`SVG to\nComponent.`}
            </span>
            <p className="flex flex-col items-center m-[0px]">
              <span
                className={
                  'inline-block text-center whitespace-pre-line typo-pre-body-04 text-content-2 tracking-[-0.32px]'
                }
              >
                {`SVG 파일들을 Chakra UI에 맞는 아이콘 컴포넌트로,`}
              </span>
              <span
                className={
                  'inline-block text-center base:whitespace-pre-line md:whitespace-normal typo-pre-body-04 text-content-2 tracking-[-0.32px]'
                }
              >
                {`반복 작업 없이 스타일, 크기, 색상까지\n간편하게 조절할 수 있어요`}
              </span>
            </p>
          </div>
        </div>
        {/* bottom content */}
        <div className="flex flex-col items-center base:px-[4px] md:px-[240px] base:pb-[160px] md:pb-[105px] max-w-[1440px] translate-y-[180px]">
          <div className="relative base:aspect-[404/272] md:aspect-[1032/695] base:max-w-[404px] md:max-w-[1032px]">
            <div className="flex flex-row justify-center base:gap-x-[8px] md:gap-x-[16px] base:h-[40px] md:h-[80px] absolute inset-x-0 base:translate-y-[-26px] md:translate-y-[-53px] z-[-1]">
              {ITEMS.map((item) => (
                <IconBox key={`svg-${item.id}`} {...item} />
              ))}
            </div>
            <img
              src={'/img/ui/section-3-feature.webp'}
              alt="section-3-feature"
              className="w-max z-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const getResponsiveY = () => {
  if (window.innerWidth >= 768) return -40 // md
  return -20 // base
}

const IconBox = ({
  color,
  icon: Icon,
}: {
  color: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<SVGSVGElement>(null)

  const [yOffset, setYOffset] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
    gsap.to(boxRef.current, {
      backgroundColor: color,
      duration: 0.1,
      y: yOffset,
    })
  }
  const handleMouseLeave = () => {
    setIsHovered(false)
    gsap.to(boxRef.current, {
      backgroundColor: 'transparent',
      duration: 0.1,
      y: 0,
    })
  }

  useEffect(() => {
    setYOffset(getResponsiveY())

    const handleResize = () => setYOffset(getResponsiveY())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div
      ref={boxRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseEnter}
      onTouchEnd={handleMouseLeave}
      className={`transition-all flex flex-col items-center justify-center base:p-[8px] md:p-[16px] base:size-[40px] md:size-[80px] rounded-[30%] bg-transparent`}
    >
      <Icon
        ref={iconRef}
        className={isHovered ? 'text-content-8' : 'text-content-1'}
      />
    </div>
  )
}

const Badge = () => {
  return (
    <div className="flex items-center justify-center w-max px-[12px] py-[8px] rounded-[12px] bg-accent-brewin-green">
      <span className="inline-block typo-uncut-body-05 text-content-8">
        gen:icon
      </span>
    </div>
  )
}

const ITEMS = [
  {
    id: 0,
    color: '#e81b30',
    icon: ShareFatIcon,
  },
  {
    id: 1,
    color: '#317e47',
    icon: CalendarDotsIcon,
  },
  {
    id: 2,
    color: '#095e96',
    icon: HandPeaceIcon,
  },
  {
    id: 3,
    color: '#f7bc3c',
    icon: CalendarDotsIcon,
  },
  {
    id: 4,
    color: '#f9bdc3',
    icon: LegoSmileyIcon,
  },
  {
    id: 5,
    color: '#095e96',
    icon: PaperPlaneTiltIcon,
  },
  {
    id: 6,
    color: '#f68926',
    icon: SmileyMeltingIcon,
  },
] as const
