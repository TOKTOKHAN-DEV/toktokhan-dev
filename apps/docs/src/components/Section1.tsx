import {
  CodeBlockIcon,
  DiamondsFourIcon,
  GitIcon,
} from '@site/src/generated/icons'

import Tilt from 'react-parallax-tilt'

export const Section1 = () => {
  return (
    <div className="flex flex-col items-center justify-center base:mt-[64px] md:mt-[80px]">
      {/* Add transform-style: preserve-3d to your tilt element.
      Add a transform: translateZ(20px) to your inner elements that have to pop out. */}

      <Tilt
        scale={1}
        tiltMaxAngleX={25}
        tiltMaxAngleY={25}
        className="relative transform-3d perspective-1000"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        <span
          className="typo-uncut-display-02 whitespace-pre-line text-content-1 text-center block pointer-events-none"
          style={{ transform: 'translate3d(0px, 0px, 20px)' }}
        >
          Open,
        </span>
        <span
          className="typo-uncut-display-02 whitespace-pre-line text-content-1 text-center block pointer-events-none"
          style={{ transform: 'translate3d(0px, 0px, 50px)' }}
        >
          Create,
        </span>
        <span
          className="typo-uncut-display-02 whitespace-pre-line text-content-1 text-center block pointer-events-none"
          style={{ transform: 'translate3d(0px, 0px, 40px)' }}
        >
          Brew.
        </span>
        <div
          className="absolute base:top-[36.5px] md:top-[99px] base:left-[-98px] md:left-0 md:-translate-x-[50%] cursor-pointer z-10 hover:z-30
          transform-3d translate-z-[0px]"
        >
          <div className="flex items-center justify-center bg-accent-brewin-red base:rounded-[16px] md:rounded-[24px] base:px-[12px] md:px-[24px] base:py-[8px] md:py-[16px] base:gap-[4px] md:gap-[6px]">
            <DiamondsFourIcon className="base:size-[16px] md:size-[28px]" />
            <span className="typo-uncut-heading-03 text-white my-[0]">
              Component
            </span>
          </div>
        </div>
        <div
          className="absolute base:top-[115.5px] md:top-[296px] base:left-[-31px] md:left-[16.5px] cursor-pointer z-30"
          style={{ transform: 'translate3d(0px, 0px, 45px)' }}
        >
          <div className="flex items-center justify-center bg-accent-brewin-yellow base:rounded-[16px] md:rounded-[24px] base:px-[12px] md:px-[24px] base:py-[8px] md:py-[16px] base:gap-[4px] md:gap-[6px]">
            <CodeBlockIcon className="base:size-[16px] md:size-[28px]" />
            <span className="typo-uncut-heading-03 text-white my-[0]">API</span>
          </div>
        </div>
        <div
          className="absolute base:top-[52.5px] md:top-[131px] right-0 base:right-[-58.5px] md:right-0 md:-translate-x-[-50%] cursor-pointer z-30"
          style={{ transform: 'translate3d(0px, 0px, 40px)' }}
        >
          <div className="flex items-center justify-center bg-accent-brewin-blue base:rounded-[16px] md:rounded-[24px] base:px-[12px] md:px-[24px] base:py-[8px] md:py-[16px] base:gap-[4px] md:gap-[6px]">
            <GitIcon className="base:size-[16px] md:size-[28px]" />
            <span className="typo-uncut-heading-03 text-white my-[0]">
              Github
            </span>
          </div>
        </div>
        <div
          className="absolute base:top-[125.5px] md:top-[332px] base:right-[-27.5px] md:right-[17px] cursor-pointer z-10 hover:z-30"
          style={{ transform: 'translate3d(0px, 0px, 70px)' }}
        >
          <div className="flex items-center justify-center bg-accent-brewin-green base:rounded-[16px] md:rounded-[24px] base:px-[12px] md:px-[24px] base:py-[8px] md:py-[16px] base:gap-[4px] md:gap-[6px]">
            <DiamondsFourIcon className="base:size-[16px] md:size-[28px]" />
            <span className="typo-uncut-heading-03 text-white my-[0]">
              Plugin
            </span>
          </div>
        </div>
      </Tilt>
      <span className="base:hidden md:block whitespace-pre-line text-center typo-pre-body-04 text-content-2 mt-[40px]">
        tokript는 똑똑한개발자에서 개발한 cli-tool(JS/TS)로, 업무 효율을 높이는
        데 사용해요{'\n'}아이콘, 이미지, 폰트, api, page template 등 다양한
        작업에 도움을 줄 수 있으니, tokript를 통해 더 효율적으로 개발해보세요!
      </span>
      <span className="base:block md:hidden whitespace-pre-line text-center typo-pre-body-04 text-content-2 mt-[64px]">
        tokript는 똑똑한개발자에서 개발한 cli-tool(JS/TS)로,{'\n'}업무 효율을
        높이는 데 사용해요{'\n'}아이콘, 이미지, 폰트, api, page template 등
        {'\n'}
        다양한 작업에 도움을 줄 수 있으니,{'\n'}tokript를 통해 더 효율적으로
        개발해보세요!
      </span>
    </div>
  )
}
