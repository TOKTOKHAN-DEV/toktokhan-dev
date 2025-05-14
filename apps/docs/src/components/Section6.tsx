import { MapPinIcon, QuotesIcon, RabbitIcon } from '../generated/icons'
import { useAnimatedBox } from '../hooks/useAnimatedBox'
import { cn } from '../utils/cn'

export const Section6 = () => {
  const animatedBoxRef = useAnimatedBox()

  return (
    <div
      ref={animatedBoxRef}
      className="bg-background-basic-5 flex flex-col items-center base:py-[80px] md:py-[120px] base:max-w-[404px] md:max-w-full overflow-x-hidden mx-auto"
    >
      {/* Badge & Title */}
      <div className="inline-block rounded-[12px] bg-background-inverse-1 px-[12px] py-[8px] typo-uncut-body-05 text-content-8 mb-[16px]">
        component
      </div>

      {/* Title with Icons */}
      <div className="relative w-fit mb-[24px] md:mb-[40px]">
        <h1 className="m-0 typo-uncut-display-04 text-content-1 text-center">
          Build your web <br />
          70% faster.
        </h1>
        <div className="size-[32px] bg-accent-brewin-red rounded-[8px] p-[6px] flex items-center justify-center rotate-[-9deg] absolute base:top-[-13px] md:top-[-10px] base:left-[-25px] md:left-[-20px] -z-1">
          <RabbitIcon className="size-[20px] text-content-8" />
        </div>
        <div className="size-[32px] bg-accent-brewin-yellow rounded-[8px] p-[6px] flex items-center justify-center rotate-[9deg] absolute base:bottom-[15px] md:bottom-0 base:right-[-8px] md:right-[-20px]">
          <QuotesIcon className="size-[20px] text-content-8" />
        </div>
      </div>

      {/* Description */}
      <p className="base:hidden md:block typo-pre-body-04 text-content-2 m-0 text-center pb-[64px] whitespace-pre-line">
        자주 쓰이는 기능들, 실제 프로젝트에서 검증된 형태로 제공해요.{'\n'}
        빠르게 시작하고, 본질에 집중하세요.
      </p>
      <p className="base:block md:hidden typo-pre-body-04 text-content-2 m-0 text-center pb-[64px] whitespace-pre-line">
        자주 쓰이는 기능들,{'\n'}실제 프로젝트에서 검증된 형태로 제공해요.{'\n'}
        빠르게 시작하고, 본질에 집중하세요.
      </p>

      {/* Cards Container */}
      <div className="flex base:flex-col md:flex-row gap-[8px] md:px-0 base:w-[404px] md:w-full mx-auto justify-center">
        <SocialLoginCard />
        <div className="flex flex-col gap-[8px] base:mx-auto md:mx-0">
          <CardContainer className="base:w-[380px] md:w-[454px] h-[316px] base:rounded-[40px] md:rounded-t-[40px] base:overflow-hidden md:overflow-visible">
            <MapPinIcon className="size-[240px] absolute top-[-40px] right-0" />
            <div className="z-10">
              <h3 className="typo-uncut-heading-02 text-content-1 text-left m-0">
                Map
              </h3>
              <p className="typo-pre-body-04 text-content-2 whitespace-pre-line m-0">
                다양한 지도 API를 React 컴포넌트로 제공해요.{'\n'}마커부터
                클러스터링까지, 타입스크립트로 쉽게 구현하세요.
              </p>
            </div>
          </CardContainer>

          <CardContainer className="base:w-[380px] md:w-[454px] h-[316px] base:rounded-[40px] md:rounded-b-[40px]">
            <img
              src="/img/ui/toss.webp"
              alt="toss"
              className="w-full h-full absolute top-0 left-0 aspect-[840/360] rounded-b-[40px]"
            />
            <div className="z-10">
              <h3 className="typo-uncut-heading-02 text-content-8 text-left m-0">
                Payment
              </h3>
              <p className="typo-pre-body-04 text-content-8 whitespace-pre-line m-0">
                PG사 연동부터 결제 검증까지, 복잡한 흐름을 쉽게 구현해요. 단 몇
                줄의 코드로 결제 시스템을 빠르게 연동해보세요.
              </p>
            </div>
          </CardContainer>
        </div>
      </div>
    </div>
  )
}

interface CardContainerProps {
  children?: React.ReactNode
  className?: string
}

const CardContainer = ({ children, className }: CardContainerProps) => {
  return (
    <div
      className={cn([
        'relative flex flex-col justify-end bg-background-basic-1 p-[40px]',
        className,
      ])}
    >
      {children}
    </div>
  )
}

const SocialLoginCard = () => {
  return (
    <div className="relative base:w-[380px] md:w-[608px] base:h-[496px] md:h-[640px] rounded-[40px] bg-background-basic-1 px-[28px] base:mx-auto md:mx-0">
      <img
        src="/img/ui/social.webp"
        alt="social"
        className="base:block md:hidden w-full h-full absolute top-0 left-0 aspect-[84/36] rounded-b-[40px]"
      />
      <img
        src="/img/ui/social.webp"
        alt="social"
        className="base:hidden md:block w-full h-full absolute top-0 left-0 aspect-[84/57] rounded-b-[40px]"
      />

      <div className="absolute left-[40px] bottom-[40px] pr-[40px]">
        <h3 className="typo-uncut-heading-02 text-[#171717] m-0">
          Social Login
        </h3>
        <p className="typo-pre-body-04 text-[#555555] whitespace-pre-line m-0">
          다양한 소셜 로그인을 몇 줄의 코드로 손쉽게 연동할 수 있어요.
          {'\n'}
          아이콘 버튼부터 팝업·링크 방식까지 모두 지원해요.
        </p>
      </div>
    </div>
  )
}
