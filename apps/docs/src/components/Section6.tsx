import { MapPinIcon, QuotesIcon, RabbitIcon } from '../generated/icons'
import { useAnimatedBox } from '../hooks/useAnimatedBox'
import { cn } from '../utils/cn'

export const Section6 = () => {
  const animatedBoxRef = useAnimatedBox()

  return (
    <div
      ref={animatedBoxRef}
      className="bg-background-basic-5 flex flex-col items-center base:py-[80px] md:py-[120px] w-full"
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
      <p className="typo-pre-body-04 text-content-2 m-0 text-center">
        자주 쓰이는 기능들, 실제 프로젝트에서 검증된 형태로 제공해요.
      </p>
      <p className="typo-pre-body-04 text-content-2 m-0 pb-[64px] text-center">
        빠르게 시작하고, 본질에 집중하세요.
      </p>

      {/* Cards Container */}
      <div className="flex base:flex-col md:flex-row gap-[8px] base:px-[12px] md:px-0">
        <SocialLoginCard />
        <div className="flex flex-col gap-[8px]">
          <Card
            title="Map"
            description={
              '다양한 지도 API를 React 컴포넌트로 제공해요.\n마커부터 클러스터링까지, 타입스크립트로 쉽게 구현하세요.'
            }
            className="base:w-full md:w-[454px] h-[316px] base:rounded-[40px] md:rounded-t-[40px]"
          >
            <MapPinIcon className="size-[240px] absolute top-[-40px] right-0" />
          </Card>

          <Card
            title="Payment"
            description={
              'PG사 연동부터 결제 검증까지, 복잡한 흐름을 쉽게 구현해요.\n단 몇 줄의 코드로 결제 시스템을 빠르게 연동해보세요.'
            }
            className="base:w-full md:w-[454px] h-[316px] base:rounded-[40px] md:rounded-b-[40px]"
          >
            <MapPinIcon className="size-[240px] absolute top-[-40px] right-0" />
          </Card>
        </div>
      </div>
    </div>
  )
}

interface CardProps {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
}

const Card = ({ title, description, children, className }: CardProps) => {
  return (
    <div
      className={cn([
        'relative flex flex-col justify-end bg-background-basic-1 p-[40px]',
        className,
      ])}
    >
      {children}
      <h3 className="typo-uncut-heading-02 text-content-1 text-left m-0">
        {title}
      </h3>
      <p className="typo-pre-body-04 text-content-2 whitespace-pre-line m-0">
        {description}
      </p>
    </div>
  )
}

const SocialLoginCard = () => {
  return (
    <div className="relative w-[608px] h-[640px] rounded-[40px] bg-background-basic-1">
      <img
        src="/img/ui/iphone-frame.webp"
        alt="iphone-frame"
        className="w-full h-full absolute top-0 left-0 z-[1]"
      />
      <img
        src="/img/ui/blur.webp"
        alt="blur"
        className="w-full h-[400px] absolute bottom-0 left-0 z-[2]"
      />
      <img
        src="/img/ui/social-icons.webp"
        alt="social-icons"
        className="w-[480px] h-[160px] aspect-[840/360] absolute top-[161px] left-1/2 -translate-x-1/2 z-[3]"
      />
      <div className="absolute left-[40px] bottom-[40px] z-[4]">
        <h3 className="typo-uncut-heading-02 text-content-1 m-0">
          Social Login
        </h3>
        <p className="typo-pre-body-04 text-content-2 whitespace-pre-line m-0">
          다양한 소셜 로그인을 몇 줄의 코드로 손쉽게 연동할 수 있어요.
          {'\n'}
          아이콘 버튼부터 팝업·링크 방식까지 모두 지원해요.
        </p>
      </div>
    </div>
  )
}
