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
import { useAnimatedBox } from '../hooks/useAnimatedBox'
import { cn } from '../utils/cn'

type IconProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
}

const IconComponent = ({ Icon, color }: IconProps) => (
  <div
    className={cn(
      'size-[64px] md:size-[128px]',
      'rounded-[16px] md:rounded-[32px]',
      'flex items-center justify-center',
      'text-content-8',
      `bg-accent-brewin-${color}`,
    )}
  >
    <Icon className="size-[40px] md:size-[80px] text-content-8" />
  </div>
)

const ICON_DATA: IconProps[][] = [
  [
    { Icon: BoundingBoxIcon, color: 'red' },
    { Icon: ChatCircleDotsIcon, color: 'yellow' },
    { Icon: CodeBlockIcon, color: 'blue' },
    { Icon: CursorIcon, color: 'green' },
    { Icon: DiamondsFourIcon, color: 'red' },
    { Icon: FigmaLogoIcon, color: 'yellow' },
    { Icon: MapPinAreaIcon, color: 'green' },
    { Icon: PawPrintIcon, color: 'red' },
  ],
  [
    { Icon: GitIcon, color: 'blue' },
    { Icon: MapPinAreaIcon, color: 'green' },
    { Icon: PawPrintIcon, color: 'red' },
    { Icon: ScanSmileyIcon, color: 'yellow' },
    { Icon: StackOverflowLogoIcon, color: 'blue' },
    { Icon: ArrowFatRightIcon, color: 'green' },
    { Icon: BoundingBoxIcon, color: 'red' },
    { Icon: BraceIcon, color: 'yellow' },
  ],
  [
    { Icon: BoundingBoxIcon, color: 'red' },
    { Icon: BraceIcon, color: 'yellow' },
    { Icon: CodeBlockIcon, color: 'blue' },
    { Icon: CursorIcon, color: 'green' },
    { Icon: DiamondsFourIcon, color: 'red' },
    { Icon: FigmaLogoIcon, color: 'yellow' },
    { Icon: GitIcon, color: 'blue' },
    { Icon: MapPinAreaIcon, color: 'green' },
  ],
]

const ICON_SET = ICON_DATA.map((iconSet) =>
  iconSet.map((iconData, idx) => <IconComponent key={idx} {...iconData} />),
)

const HeaderSection = ({
  leftIcons,
  rightIcons,
  leftIconsRef,
  rightIconsRef,
}: {
  leftIcons: React.ReactNode[]
  rightIcons: React.ReactNode[]
  leftIconsRef: React.MutableRefObject<(HTMLDivElement | null)[]>
  rightIconsRef: React.MutableRefObject<(HTMLDivElement | null)[]>
}) => (
  <>
    {/* Desktop Layout */}
    <div className="base:hidden md:flex flex-row items-center justify-center w-full overflow-hidden">
      {/* Left Icons */}
      <div className="flex flex-row flex-1 items-center gap-[24px] left-[-48px]">
        {leftIcons.map((icon, index) => (
          <div
            key={`left-${index}`}
            ref={(el) => {
              // Ensure proper reference for left icons
              if (el) leftIconsRef.current[index] = el
            }}
            className="flex items-center justify-center"
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Center Text */}
      <p className="typo-uncut-display-03 text-content-1 text-center px-[60px] md:min-w-[932px]">
        Whatever you imagine.
      </p>

      {/* Right Icons */}
      <div className="flex flex-row flex-1 items-center gap-[24px] right-[-48px]">
        {rightIcons.map((icon, index) => (
          <div
            key={`right-${index}`}
            ref={(el) => {
              // Ensure proper reference for right icons
              if (el) rightIconsRef.current[index] = el
            }}
            className="flex items-center justify-center"
          >
            {icon}
          </div>
        ))}
      </div>
    </div>

    {/* Mobile Layout */}
    <div className="base:block md:hidden text-center w-full">
      <p className="typo-uncut-display-03 text-content-1 px-[24px] whitespace-pre-line text-center">
        Whatever{'\n'}you imagine.
      </p>
    </div>
  </>
)

const MobileIconsRow = ({
  icons,
  leftIconsRef,
  rightIconsRef,
}: {
  icons: React.ReactNode[]
  leftIconsRef: React.MutableRefObject<(HTMLDivElement | null)[]>
  rightIconsRef: React.MutableRefObject<(HTMLDivElement | null)[]>
}) => (
  <div className="w-full relative base:flex md:hidden">
    {/* Gradient Overlays */}
    <div className="absolute left-0 top-0 w-[120px] h-full bg-gradient-to-r from-background-basic-1 to-transparent z-10" />
    <div className="absolute right-0 top-0 w-[120px] h-full bg-gradient-to-l from-background-basic-1 to-transparent z-10" />

    {/* Icons Container */}
    <div className="flex items-center justify-center mt-[64px] overflow-hidden px-[24px] w-full">
      <div className="flex items-center base:gap-[8px]">
        {icons.map((icon, index) => (
          <div
            key={`mobile-${index}`}
            ref={(el) => {
              if (index < 4) {
                leftIconsRef.current[index + 8] = el
              } else {
                rightIconsRef.current[index + 4] = el
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
)

const BlackBoxSection = ({
  animatedBoxRef,
}: {
  animatedBoxRef: React.RefObject<HTMLDivElement>
}) => (
  <div
    ref={animatedBoxRef}
    className="bg-background-inverse-1 w-full base:max-w-[404px] md:max-w-full base:h-[780px] md:h-[1200px] base:mt-[160px] md:mt-[240px] flex flex-col items-center justify-center"
  >
    {/* Badge Row */}
    <div className="flex items-center gap-[8px] base:mt-[80px] md:mt-[120px]">
      <div className="rounded-[12px] border-solid border-[1px] border-border-inverse-2 px-[12px] py-[8px]">
        <span className="text-content-8 typo-uncut-body-05">plug-in</span>
      </div>
      <div className="rounded-[12px] bg-accent-brewin-yellow px-[12px] py-[8px]">
        <span className="text-content-1 typo-uncut-body-05">gen:theme</span>
      </div>
    </div>

    {/* Title with Icons */}
    <div className="relative mt-[24px]">
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

    {/* Description */}
    <span className="base:hidden md:block typo-pre-body-04 text-content-6 whitespace-pre-line text-center base:mt-[24px] md:mt-[40px] base:px-[12px] md:px-0">
      클릭 한 번에 디자인 토큰이 Chakra UI Convention에 알맞는 코드로,{'\n'}
      자체 플러그인 toktoken을 통해 일관된 디자인과 코드, 혁신적인 핸드오프를
      경험해보세요
    </span>
    <span className="base:block md:hidden typo-pre-body-04 text-content-6 whitespace-pre-line text-center base:mt-[24px] md:mt-[40px] base:px-[12px] md:px-0">
      클릭 한 번에 디자인 토큰이{'\n'}Chakra UI Convention에 알맞는 코드로,
      {'\n'}
      자체 플러그인 toktoken을 통해 일관된 디자인과 코드,{'\n'}혁신적인
      핸드오프를 경험해보세요
    </span>

    {/* Figma Link */}
    <Link
      className="mt-[64px] flex items-center px-[24px] py-[16px] rounded-[16px] border-solid border-[1px] bg-background-inverse-1 border-border-inverse-2 no-underline hover:no-underline hover:bg-background-inverse-3 transition-all duration-200 group"
      href="https://www.figma.com/community/plugin/1369490322908230515/toktoken-figma-design-token-extractor"
    >
      <FigmaIcon className="size-[24px] mr-[6px] text-content-8 group-hover:text-content-8" />
      <span className="typo-uncut-heading-03 mr-[16px] text-content-8 group-hover:text-content-8">
        Plug-in
      </span>
      <ArrowRightIcon className="size-[16px] text-content-8 group-hover:text-content-8" />
    </Link>

    {/* Comparison Slider */}
    <CompareSlider />
  </div>
)

const CompareSlider = () => (
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
)

export const Section2 = () => {
  const leftIconsRef = useRef<(HTMLDivElement | null)[]>(Array(12).fill(null))
  const rightIconsRef = useRef<(HTMLDivElement | null)[]>(Array(12).fill(null))
  const [currentSetIndex, setCurrentSetIndex] = useState(0)
  const animatedBoxRef = useAnimatedBox()

  useEffect(() => {
    const animateIcons = () => {
      // Get left and right icons separately to animate them differently
      const leftIcons = leftIconsRef.current.filter(Boolean)
      const rightIcons = rightIconsRef.current.filter(Boolean)

      // Combine all icons to create completely random timings
      const allIcons = [...leftIcons, ...rightIcons]

      // Create completely random delays for each icon
      const randomDelays = allIcons.map(() => gsap.utils.random(0, 0.7))

      // Animate each icon with completely different random timing
      allIcons.forEach((icon, index) => {
        gsap.to(icon, {
          opacity: 0,
          scale: gsap.utils.random(0.3, 0.7),
          duration: gsap.utils.random(0.3, 0.7),
          delay: randomDelays[index],
          ease: 'power2.inOut',
        })
      })

      // Change icon set after all animations complete
      gsap.delayedCall(1.2, () => {
        // Update state to change icons
        setCurrentSetIndex((prev) => (prev + 1) % ICON_SET.length)

        // Animate new icons with completely random timings
        setTimeout(() => {
          // Get fresh references after state update
          const newLeftIcons = leftIconsRef.current.filter(Boolean)
          const newRightIcons = rightIconsRef.current.filter(Boolean)
          const newAllIcons = [...newLeftIcons, ...newRightIcons]

          // Generate new random delays for each icon's entrance
          const newRandomDelays = newAllIcons.map(() =>
            gsap.utils.random(0, 0.9),
          )

          // Animate each icon with its own random timing
          newAllIcons.forEach((icon, index) => {
            gsap.fromTo(
              icon,
              {
                opacity: 0,
                scale: gsap.utils.random(0.4, 0.8),
              },
              {
                opacity: 1,
                scale: 1,
                duration: gsap.utils.random(0.5, 0.8),
                delay: newRandomDelays[index],
                ease: 'back.out(1.7)',
              },
            )
          })
        }, 100) // Short delay to allow state update
      })
    }

    // Initialize all icons to be visible
    const allIcons = [...leftIconsRef.current, ...rightIconsRef.current].filter(
      Boolean,
    )
    gsap.set(allIcons, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      y: 0,
      x: 0,
    })

    // Set up animation interval
    const interval = setInterval(animateIcons, 4000)

    // Clean up on component unmount
    return () => clearInterval(interval)
  }, [])

  const currentSet = ICON_SET[currentSetIndex]
  const leftIcons = currentSet.slice(0, 4)
  const rightIcons = currentSet.slice(4, 8)

  return (
    <div className="flex flex-col items-center base:mt-[160px] md:mt-[427px]">
      {/* Header Section with Icons */}
      <div className="w-full overflow-x-hidden">
        <HeaderSection
          leftIcons={leftIcons}
          rightIcons={rightIcons}
          leftIconsRef={leftIconsRef}
          rightIconsRef={rightIconsRef}
        />
      </div>

      {/* Description */}
      <p className="base:hidden md:block px-[16px] md:mt-[40px] typo-pre-body-04 text-content-2 whitespace-pre-line text-center">
        어떤 아이디어도 실현할 수 있도록, 똑똑한개발자가 깊게 우려낸 경험과
        노하우를 만나보세요{'\n'}Figma 플러그인부터, Command Line Interface,
        Component까지
      </p>
      <p className="base:block md:hiddenpx-[16px] base:mt-[24px] typo-pre-body-04 text-content-2 whitespace-pre-line text-center">
        어떤 아이디어도 실현할 수 있도록, 똑똑한개발자가 깊게{'\n'}우려낸 경험과
        노하우를 만나보세요{'\n'}Figma 플러그인부터, Command Line Interface,
        {'\n'}
        Component까지
      </p>

      {/* GitHub Link */}
      <Link
        className="base:mt-[40px] md:mt-[64px] flex items-center px-[24px] py-[16px] rounded-[16px] hover:bg-background-basic-4 border-solid border-[1px] border-border-basic-1 bg-transparent no-underline hover:no-underline transition-colors duration-200"
        href="https://github.com/TOKTOKHAN-DEV/toktokhan-dev"
      >
        <GithubIcon className="size-[24px] mr-[6px] text-content-1" />
        <span className="typo-uncut-heading-03 mr-[16px] text-content-1">
          Github
        </span>
        <ArrowRightIcon className="size-[16px] text-content-1" />
      </Link>

      {/* Mobile Icons Row */}
      <MobileIconsRow
        icons={[...leftIcons, ...rightIcons]}
        leftIconsRef={leftIconsRef}
        rightIconsRef={rightIconsRef}
      />

      {/* Black Box Section */}
      <BlackBoxSection animatedBoxRef={animatedBoxRef} />
    </div>
  )
}
