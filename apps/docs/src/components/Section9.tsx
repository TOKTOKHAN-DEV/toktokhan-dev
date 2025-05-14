import { useRef } from 'react'

import gsap from 'gsap'

interface Props {
  title: string
  value: string
  unit: string
  orientation: 'top' | 'bottom'
  className?: string
}

const InfoBox = ({ title, value, unit, orientation, className }: Props) => {
  const boxRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (!boxRef.current) return

    gsap.to(boxRef.current, {
      gap: 0,
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (!boxRef.current) return

    gsap.to(boxRef.current, {
      gap: '16px',
      duration: 0.2,
      ease: 'power2.out',
    })
  }

  const justify = orientation === 'bottom' ? 'justify-end' : 'justify-start'

  return (
    <div className={`flex flex-col ${justify}`}>
      <div
        ref={boxRef}
        style={{
          height: 'fit-content',
        }}
        className={`inline-flex flex-col justify-center items-start gap-[16px] lg:p-[60px] xl:p-[80px] base:p-[48px] bg-background-inverse-1 ${className} `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="typo-uncut-heading-05 text-transparent-inverse-4 text-left transition-colors duration-300">
          {title}
        </span>
        <div className="flex flex-row items-baseline">
          <span className="text-content-8 text-left typo-uncut-display-02 transition-colors duration-300 base:text-[64px] xl:text-[160px] md:text-[120px]">
            {value}
          </span>
          <span className="text-content-8 text-center typo-uncut-display-05 ml-[4px] transition-colors duration-300">
            {unit}
          </span>
        </div>
      </div>
    </div>
  )
}

export const Section9 = () => {
  return (
    <div className="flex flex-col base:max-w-[404px]  mx-auto lg:py-[37.6px] lg:px-[56.25px] xl:py-[50px] xl:px-[75px] gap-[6px] base:mt-[160px] md:mt-[240px] base:px-[4px]">
      <div className="flex base:flex-col md:flex-row gap-[5.25px] base:gap-[4px] justify-center">
        <InfoBox
          title="Line saved"
          value="15,000"
          unit="line"
          orientation="bottom"
          className="base:rounded-[40px] md:rounded-[40px_40px_0px_40px] hover:bg-accent-brewin-green group"
        />
        <InfoBox
          title="Auto-generated Hooks API"
          value="300"
          unit="api"
          orientation="bottom"
          className="base:rounded-[40px] md:rounded-[40px_40px_0px_0px] hover:bg-accent-brewin-yellow group"
        />
        <InfoBox
          title="Less Handoff"
          value="64"
          unit="%"
          orientation="bottom"
          className="base:rounded-[40px] md:rounded-[40px_40px_40px_0px] hover:bg-accent-brewin-blue group"
        />
      </div>
      <div className="flex base:flex-col md:flex-row gap-[5.25px] base:gap-[4px] justify-center">
        <InfoBox
          title="Projects Used"
          value="50"
          unit="project"
          orientation="top"
          className="base:rounded-[40px] md:rounded-[40px_0px_40px_40px] hover:bg-accent-brewin-red group"
        />
        <InfoBox
          title="Faster Delivery"
          value="1.7"
          unit="times"
          orientation="top"
          className="md:rounded-[0px_0px_40px_40px] base:rounded-[40px] hover:bg-accent-brewin-purple group"
        />
        <InfoBox
          title="Team Satisfaction"
          value="91"
          unit="%"
          orientation="top"
          className="md:rounded-[0px_40px_40px_40px] base:rounded-[40px] hover:bg-accent-brewin-orange group"
        />
      </div>
    </div>
  )
}
