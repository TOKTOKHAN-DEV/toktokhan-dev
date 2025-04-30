import {
  CodeBlockIcon,
  DiamondsFourIcon,
  GitIcon,
} from '@site/src/generated/icons'

import Tilt from 'react-parallax-tilt'

export const Section1 = () => {
  return (
    <div className="flex flex-col items-center justify-center sm:mt-[64px] md:mt-[80px]">
      <div className="relative">
        <span className="typo-uncut-display-02 whitespace-pre-line text-content-1 text-center relative z-20 block pointer-events-none">
          Open,{'\n'}
          Create,{'\n'}
          Brew.
        </span>
        <div className="absolute sm:top-[36.5px] md:top-[99px] sm:left-[-98px] md:left-0 md:-translate-x-[50%] cursor-pointer z-10 hover:z-30">
          <Tilt scale={1} tiltMaxAngleX={50} tiltMaxAngleY={50}>
            <div className="flex items-center justify-center bg-accent-brewin-red sm:rounded-[16px] md:rounded-[24px] sm:px-[12px] md:px-[24px] sm:py-[8px] md:py-[16px] sm:gap-[4px] md:gap-[6px]">
              <DiamondsFourIcon className="sm:size-[16px] md:size-[28px]" />
              <span className="typo-uncut-heading-03 text-white my-[0]">
                Component
              </span>
            </div>
          </Tilt>
        </div>
        <div className="absolute sm:top-[115.5px] md:top-[296px] sm:left-[-31px] md:left-[16.5px] cursor-pointer z-30">
          <Tilt scale={1} tiltMaxAngleX={50} tiltMaxAngleY={50}>
            <div className="flex items-center justify-center bg-accent-brewin-yellow sm:rounded-[16px] md:rounded-[24px] sm:px-[12px] md:px-[24px] sm:py-[8px] md:py-[16px] sm:gap-[4px] md:gap-[6px]">
              <CodeBlockIcon className="sm:size-[16px] md:size-[28px]" />
              <span className="typo-uncut-heading-03 text-white my-[0]">
                API
              </span>
            </div>
          </Tilt>
        </div>
        <div className="absolute sm:top-[52.5px] md:top-[131px] right-0 sm:right-[-58.5px] md:right-0 md:-translate-x-[-50%] cursor-pointer z-30">
          <Tilt scale={1} tiltMaxAngleX={50} tiltMaxAngleY={50}>
            <div className="flex items-center justify-center bg-accent-brewin-blue sm:rounded-[16px] md:rounded-[24px] sm:px-[12px] md:px-[24px] sm:py-[8px] md:py-[16px] sm:gap-[4px] md:gap-[6px]">
              <GitIcon className="sm:size-[16px] md:size-[28px]" />
              <span className="typo-uncut-heading-03 text-white my-[0]">
                Github
              </span>
            </div>
          </Tilt>
        </div>
        <div className="absolute sm:top-[125.5px] md:top-[332px] sm:right-[-27.5px] md:right-[17px] cursor-pointer z-10 hover:z-30">
          <Tilt scale={1} tiltMaxAngleX={50} tiltMaxAngleY={50}>
            <div className="flex items-center justify-center bg-accent-brewin-green sm:rounded-[16px] md:rounded-[24px] sm:px-[12px] md:px-[24px] sm:py-[8px] md:py-[16px] sm:gap-[4px] md:gap-[6px]">
              <DiamondsFourIcon className="sm:size-[16px] md:size-[28px]" />
              <span className="typo-uncut-heading-03 text-white my-[0]">
                Plugin
              </span>
            </div>
          </Tilt>
        </div>
      </div>
      <span className="sm:hidden md:block whitespace-pre-line text-center typo-pre-body-04 text-content-2 mt-[40px]">
        tokript는 똑똑한개발자에서 개발한 cli-tool(JS/TS)로, 업무 효율을 높이는
        데 사용해요{'\n'}아이콘, 이미지, 폰트, api, page template 등 다양한
        작업에 도움을 줄 수 있으니, tokript를 통해 더 효율적으로 개발해보세요!
      </span>
      <span className="sm:block md:hidden whitespace-pre-line text-center typo-pre-body-04 text-content-2 mt-[64px]">
        tokript는 똑똑한개발자에서 개발한 cli-tool(JS/TS)로,{'\n'}업무 효율을
        높이는 데 사용해요{'\n'}아이콘, 이미지, 폰트, api, page template 등
        {'\n'}
        다양한 작업에 도움을 줄 수 있으니,{'\n'}tokript를 통해 더 효율적으로
        개발해보세요!
      </span>
    </div>
  )
}
