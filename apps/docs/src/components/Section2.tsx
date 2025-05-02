import { useEffect, useRef, useState } from 'react'

import Link from '@docusaurus/Link'

import gsap from 'gsap'
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider'

import {
  ArrowFatRightIcon,
  ArrowRightIcon,
  BoundingBoxIcon,
  BraceIcon,
  ChatCircleDotsIcon,
  CodeBlockIcon,
  CursorIcon,
  DiamondsFourIcon,
  FigmaIcon,
  FigmaLogoIcon,
  GitIcon,
  GithubIcon,
  HandIcon,
  MapPinAreaIcon,
  PawPrintIcon,
  ScanSmileyIcon,
  StackOverflowLogoIcon,
} from '../generated/icons'

const ICON_SET = [
  [
    <div
      key="1"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-red flex items-center justify-center"
    >
      <BoundingBoxIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="2"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-yellow flex items-center justify-center"
    >
      <ChatCircleDotsIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="3"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-blue flex items-center justify-center"
    >
      <CodeBlockIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="4"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-green flex items-center justify-center"
    >
      <CursorIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="5"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-red flex items-center justify-center"
    >
      <DiamondsFourIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="6"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-yellow flex items-center justify-center"
    >
      <FigmaLogoIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="7"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-green flex items-center justify-center"
    >
      <MapPinAreaIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="8"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-red flex items-center justify-center"
    >
      <PawPrintIcon className="size-[40px] md:size-[80px]" />
    </div>,
  ],
  [
    <div
      key="1"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-blue flex items-center justify-center"
    >
      <GitIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="2"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-green flex items-center justify-center"
    >
      <MapPinAreaIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="3"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-red flex items-center justify-center"
    >
      <PawPrintIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="4"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-yellow flex items-center justify-center"
    >
      <ScanSmileyIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="5"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-blue flex items-center justify-center"
    >
      <StackOverflowLogoIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="6"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-green flex items-center justify-center"
    >
      <ArrowFatRightIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="7"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-red flex items-center justify-center"
    >
      <BoundingBoxIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="8"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-yellow flex items-center justify-center"
    >
      <BraceIcon className="size-[40px] md:size-[80px]" />
    </div>,
  ],
  [
    <div
      key="1"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-red flex items-center justify-center"
    >
      <BoundingBoxIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="2"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-yellow flex items-center justify-center"
    >
      <BraceIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="3"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-blue flex items-center justify-center"
    >
      <CodeBlockIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="4"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-green flex items-center justify-center"
    >
      <CursorIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="5"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-red flex items-center justify-center"
    >
      <DiamondsFourIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="6"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-yellow flex items-center justify-center"
    >
      <FigmaLogoIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="7"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-blue flex items-center justify-center"
    >
      <GitIcon className="size-[40px] md:size-[80px]" />
    </div>,
    <div
      key="8"
      className="size-[64px] md:size-[128px] rounded-[16px] md:rounded-[32px] bg-accent-brewin-green flex items-center justify-center"
    >
      <MapPinAreaIcon className="size-[40px] md:size-[80px]" />
    </div>,
  ],
]

export const Section2 = () => {
  const leftIconsRef = useRef<(HTMLDivElement | null)[]>([])
  const rightIconsRef = useRef<(HTMLDivElement | null)[]>([])
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const blackBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 뷰포트에 진입할 때
            gsap.to(entry.target, {
              borderRadius: '0',
              width: '100%',
              duration: 0.5,
              ease: 'power5.inOut',
            })
          } else {
            // 뷰포트에서 벗어날 때
            gsap.to(entry.target, {
              borderRadius: '200px',
              width: 'calc(100% - 40px)',
              duration: 0.5,
              ease: 'power5.inOut',
            })
          }
        })
      },
      {
        threshold: 0.2, // 20% 이상 보일 때 트리거
        rootMargin: '100px', // 뷰포트 바깥 100px부터 감지 시작
      },
    )

    if (blackBoxRef.current) {
      observer.observe(blackBoxRef.current)
    }

    return () => {
      if (blackBoxRef.current) {
        observer.unobserve(blackBoxRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const animateIcons = () => {
      const leftIcons = leftIconsRef.current
      const rightIcons = rightIconsRef.current
      const tl = gsap.timeline()

      const allIcons = [...leftIcons, ...rightIcons]
      const shuffledIcons = allIcons
        .map((icon, index) => ({ icon, index }))
        .sort(() => Math.random() - 0.5)

      shuffledIcons.forEach(({ icon }, i) => {
        tl.to(
          icon,
          {
            scale: 0,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          i * 0.1,
        )
      })

      tl.add(() => {
        setCurrentSetIndex((prev) => (prev + 1) % ICON_SET.length)
      })

      const newShuffledIcons = [...leftIcons, ...rightIcons]
        .map((icon, index) => ({ icon, index }))
        .sort(() => Math.random() - 0.5)

      newShuffledIcons.forEach(({ icon }, i) => {
        tl.to(
          icon,
          {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          },
          `>-0.2`,
        )
      })
    }

    gsap.set([...leftIconsRef.current, ...rightIconsRef.current], { scale: 1 })
    const interval = setInterval(animateIcons, 4000)
    return () => clearInterval(interval)
  }, [])

  const currentSet = ICON_SET[currentSetIndex]
  const leftIcons = currentSet.slice(0, 4)
  const rightIcons = currentSet.slice(4, 8)

  return (
    <div className="flex flex-col items-center justify-center base:mt-[160px] md:mt-[427px] relative">
      <div className="overflow-x-hidden w-[100%]">
        <div className="relative w-full">
          {/* md 사이즈 레이아웃 */}
          <div className="base:hidden md:flex flex-row items-center justify-center w-full overflow-hidden">
            {/* 왼쪽 아이콘들 */}
            <div className="flex flex-row flex-1 items-center gap-[24px] left-[-48px]">
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
            <p className="typo-uncut-display-03 text-content-1 text-center px-[60px] md:min-w-[932px]">
              Whatever you imagine.
            </p>

            {/* 오른쪽 아이콘들 */}
            <div className="flex flex-row flex-1 items-center gap-[24px] right-[-48px]">
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

          {/* base 사이즈 레이아웃 */}
          <div className="flex base:block md:hidden flex-col items-center justify-center w-full overflow-hidden relative">
            {/* 중앙 텍스트 */}
            <p className="typo-uncut-display-03 text-content-1 text-center px-[24px] base:px-[60px]">
              Whatever you imagine.
            </p>
          </div>
        </div>
      </div>

      <span className="px-[16px] base:mt-[24px] md:mt-[40px] typo-pre-body-04 text-content-2 whitespace-pre-line text-center">
        어떤 아이디어도 실현할 수 있도록, 똑똑한개발자가 깊게 우려낸 경험과
        노하우를 만나보세요{'\n'}Figma 플러그인부터, Command Line Interface,
        Component까지
      </span>
      <Link
        className="base:mt-[40px] md:mt-[64px] flex flex-row items-center px-[24px] py-[16px] rounded-[16px] hover:bg-background-basic-4 border-solid border-[1px] border-border-basic-1 bg-transparent no-underline hover:no-underline transition-colors duration-200"
        href="https://github.com/TOKTOKHAN-DEV/toktokhan-dev"
      >
        <GithubIcon className="size-[24px] mr-[6px] text-content-1" />
        <span className="typo-uncut-heading-03 mr-[16px] text-content-1">
          Github
        </span>
        <ArrowRightIcon className="size-[16px] text-content-1" />
      </Link>

      {/* 아이콘들 컨테이너 */}
      <div className="w-full relative">
        {/* 왼쪽 그라데이션 */}
        <div className="absolute left-0 top-0 w-[120px] h-full bg-gradient-to-r from-background-basic-1 to-transparent z-10" />

        {/* 오른쪽 그라데이션 */}
        <div className="absolute right-0 top-0 w-[120px] h-full bg-gradient-to-l from-background-basic-1 to-transparent z-10" />

        {/* 아이콘들 */}
        <div className="flex flex-row items-center justify-center mt-[64px] overflow-hidden px-[24px] w-full base:flex md:hidden">
          <div className="flex flex-row items-center base:gap-[8px]">
            {[...leftIcons, ...rightIcons].map((icon, index) => (
              <div
                key={`mobile-${index}`}
                ref={(el) => {
                  if (index < 4) {
                    leftIconsRef.current[index] = el
                  } else {
                    rightIconsRef.current[index - 4] = el
                  }
                }}
                className="flex-shrink-0"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={blackBoxRef}
        className="bg-background-inverse-1 w-full base:h-[780px] md:h-[1200px] base:mt-[160px] md:mt-[240px] flex flex-col items-center justify-center"
      >
        <div className="flex flex-row items-center justify-center gap-[8px] base:mt-[80px] md:mt-[120px]">
          <div className="flex flex-row items-center justify-center rounded-[12px] border-solid border-[1px] border-border-inverse-2 px-[12px] py-[8px]">
            <span className="text-content-8 typo-uncut-body-05">plug-in</span>
          </div>
          <div className="flex flex-row items-center justify-center rounded-[12px] bg-accent-brewin-yellow px-[12px] py-[8px]">
            <span className="text-content-1 typo-uncut-body-05">gen:theme</span>
          </div>
        </div>

        <div className="relative">
          <span className="typo-uncut-display-03 text-content-8 whitespace-pre-line">
            Just copy,{'\n'} and paste.
          </span>
          <div className="size-[32px] bg-accent-brewin-green rounded-[8px] p-[6px] flex items-center justify-center rotate-[9deg] absolute base:top-[-10px] md:top-0 base:right-[-25px] md:right-[-20px]">
            <BoundingBoxIcon className="size-[20px]" />
          </div>
          <div className="size-[32px] bg-accent-brewin-blue rounded-[8px] p-[6px] flex items-center justify-center rotate-[-9deg] absolute base:bottom-[-10px] md:bottom-[-0px] base:left-[-25px] md:left-[-20px]">
            <CodeBlockIcon />
          </div>
        </div>
        <span className="typo-pre-body-04 text-content-6 whitespace-pre-line text-center base:mt-[24px] md:mt-[40px] base:px-[12px] md:px-0">
          클릭 한 번에 디자인 토큰이 Chakra UI Convention에 알맞는 코드로,{'\n'}
          자체 플러그인 toktoken을 통해 일관된 디자인과 코드, 혁신적인
          핸드오프를 경험해보세요
        </span>
        <Link
          className="mt-[64px] flex flex-row items-center px-[24px] py-[16px] rounded-[16px] border-solid border-[1px] bg-background-inverse-1 border-border-inverse-2 no-underline hover:no-underline hover:bg-background-inverse-3 transition-all duration-200 group"
          href="https://www.figma.com/community/plugin/1369490322908230515/toktoken-figma-design-token-extractor"
        >
          <FigmaIcon className="size-[24px] mr-[6px] text-white group-hover:text-white transition-colors duration-200" />
          <span className="typo-uncut-heading-03 mr-[16px] text-white group-hover:text-white transition-colors duration-200">
            Plug-in
          </span>
          <ArrowRightIcon className="size-[16px] text-white group-hover:text-white transition-colors duration-200" />
        </Link>
        <div className="flex flex-col flex-grow-1 base:w-[100%] md:w-[1054px] border-solid border-[1px] border-border-inverse-2 rounded-[16px] mt-[64px] overflow-hidden">
          <ReactCompareSlider
            handle={
              <div className="h-[100%] w-[1px] bg-content-8 relative">
                <div className="size-[64px] border-[1px] border-solid rounded-full backdrop-blur-[8px] border-border-inverse-2 flex items-center justify-center z-[1px] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 cursor-grab">
                  <HandIcon className="size-[32px]" />
                </div>
              </div>
            }
            boundsPadding={32}
            itemOne={
              <ReactCompareSliderImage
                src="/img/ui/toktoken.webp"
                alt="toktoken-img"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src="/img/ui/toktoken-output.webp"
                alt="toktoken-output-img"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'top',
                }}
              />
            }
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
    </div>
  )
}
