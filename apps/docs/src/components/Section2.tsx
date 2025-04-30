import { useEffect, useRef, useState } from 'react'

import gsap from 'gsap'

import {
  ArrowFatRightIcon,
  BoundingBoxIcon,
  BraceIcon,
  ChatCircleDotsIcon,
  CodeBlockIcon,
  CursorIcon,
  DiamondsFourIcon,
  FigmaLogoIcon,
  GitIcon,
  MapPinAreaIcon,
  PawPrintIcon,
  ScanSmileyIcon,
  StackOverflowLogoIcon,
} from '../generated/icons'

const iconSets = [
  [
    <BoundingBoxIcon
      key="1"
      className="size-[80px] p-[24px] bg-accent-brewin-red rounded-[32px]"
    />,
    <ChatCircleDotsIcon
      key="2"
      className="size-[80px] p-[24px] bg-accent-brewin-yellow rounded-[32px]"
    />,
    <CodeBlockIcon
      key="3"
      className="size-[80px] p-[24px] bg-accent-brewin-blue rounded-[32px]"
    />,
    <CursorIcon
      key="4"
      className="size-[80px] p-[24px] bg-accent-brewin-green rounded-[32px]"
    />,
    <DiamondsFourIcon
      key="5"
      className="size-[80px] p-[24px] bg-accent-brewin-red rounded-[32px]"
    />,
    <FigmaLogoIcon
      key="6"
      className="size-[80px] p-[24px] bg-accent-brewin-yellow rounded-[32px]"
    />,
  ],
  [
    <GitIcon
      key="1"
      className="size-[80px] p-[24px] bg-accent-brewin-blue rounded-[32px]"
    />,
    <MapPinAreaIcon
      key="2"
      className="size-[80px] p-[24px] bg-accent-brewin-green rounded-[32px]"
    />,
    <PawPrintIcon
      key="3"
      className="size-[80px] p-[24px] bg-accent-brewin-red rounded-[32px]"
    />,
    <ScanSmileyIcon
      key="4"
      className="size-[80px] p-[24px] bg-accent-brewin-yellow rounded-[32px]"
    />,
    <StackOverflowLogoIcon
      key="5"
      className="size-[80px] p-[24px] bg-accent-brewin-blue rounded-[32px]"
    />,
    <ArrowFatRightIcon
      key="6"
      className="size-[80px] p-[24px] bg-accent-brewin-green rounded-[32px]"
    />,
  ],
  [
    <BoundingBoxIcon
      key="1"
      className="size-[80px] p-[24px] bg-accent-brewin-red rounded-[32px]"
    />,
    <BraceIcon
      key="2"
      className="size-[80px] p-[24px] bg-accent-brewin-yellow rounded-[32px]"
    />,
    <CodeBlockIcon
      key="3"
      className="size-[80px] p-[24px] bg-accent-brewin-blue rounded-[32px]"
    />,
    <CursorIcon
      key="4"
      className="size-[80px] p-[24px] bg-accent-brewin-green rounded-[32px]"
    />,
    <DiamondsFourIcon
      key="5"
      className="size-[80px] p-[24px] bg-accent-brewin-red rounded-[32px]"
    />,
    <FigmaLogoIcon
      key="6"
      className="size-[80px] p-[24px] bg-accent-brewin-yellow rounded-[32px]"
    />,
  ],
]

export const Section2 = () => {
  const leftIconsRef = useRef<(HTMLDivElement | null)[]>([])
  const rightIconsRef = useRef<(HTMLDivElement | null)[]>([])
  const [currentSetIndex, setCurrentSetIndex] = useState(0)

  useEffect(() => {
    const animateIcons = () => {
      const leftIcons = leftIconsRef.current
      const rightIcons = rightIconsRef.current
      const tl = gsap.timeline()

      // 왼쪽 아이콘들 스케일 아웃
      tl.to(leftIcons.slice(0, 1), {
        scale: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
        .to(leftIcons.slice(1, 2), {
          scale: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        })
        .to(leftIcons.slice(2, 3), {
          scale: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        })

        // 오른쪽 아이콘들 스케일 아웃
        .to(rightIcons.slice(0, 1), {
          scale: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        })
        .to(rightIcons.slice(1, 2), {
          scale: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        })
        .to(rightIcons.slice(2, 3), {
          scale: 0,
          duration: 0.3,
          ease: 'power2.inOut',
        })
        .add(() => {
          setCurrentSetIndex((prev) => (prev + 1) % iconSets.length)
        })

        // 왼쪽 아이콘들 스케일 인
        .to(leftIcons.slice(0, 1), {
          scale: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        })
        .to(leftIcons.slice(1, 2), {
          scale: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        })
        .to(leftIcons.slice(2, 3), {
          scale: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        })

        // 오른쪽 아이콘들 스케일 인
        .to(rightIcons.slice(0, 1), {
          scale: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        })
        .to(rightIcons.slice(1, 2), {
          scale: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        })
        .to(rightIcons.slice(2, 3), {
          scale: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        })
    }

    const interval = setInterval(animateIcons, 3000)
    return () => clearInterval(interval)
  }, [])

  const currentSet = iconSets[currentSetIndex]
  const leftIcons = currentSet.slice(0, 3)
  const rightIcons = currentSet.slice(3, 6)

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center">
        {/* 왼쪽 아이콘들 */}
        <div className="flex flex-row items-center gap-[24px]">
          {leftIcons.map((icon, index) => (
            <div
              key={`left-${index}`}
              ref={(el) => (leftIconsRef.current[index] = el)}
              className="flex items-center justify-center"
            >
              {icon}
            </div>
          ))}
        </div>

        {/* 중앙 텍스트 */}
        <p className="typo-uncut-display-03 text-content-1 px-[60px]">
          Whatever you imagine.
        </p>

        {/* 오른쪽 아이콘들 */}
        <div className="flex flex-row items-center gap-[24px]">
          {rightIcons.map((icon, index) => (
            <div
              key={`right-${index}`}
              ref={(el) => (rightIconsRef.current[index] = el)}
              className="flex items-center justify-center"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-[40px] typo-pre-body-04 text-content-2 whitespace-pre-line text-center">
        어떤 아이디어도 실현할 수 있도록, 똑똑한개발자가 깊게 우려낸 경험과
        노하우를 만나보세요{'\n'}Figma 플러그인부터, Command Line Interface,
        Component까지
      </p>
    </div>
  )
}
