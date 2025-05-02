import { QuotesIcon, RabbitIcon } from '../generated/icons'

export const Section6 = () => {
  return (
    <div className="min-h-screen bg-background-basic-5 pt-[120px]">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="inline-block rounded-[12px] bg-background-inverse-1 px-[12px] py-[8px] typo-uncut-body-05 text-content-8">
          component
        </div>

        <div className="relative w-fit">
          <h1 className="mb-0 typo-uncut-display-04 text-content-1 text-center">
            Build your web <br />
            70% faster.
          </h1>
          <div className="size-[32px] bg-accent-brewin-red rounded-[8px] p-[6px] flex items-center justify-center rotate-[-9deg] absolute base:top-[-13px] md:top-[-10px] base:left-[-25px] md:left-[-20px] -z-1">
            <RabbitIcon className="size-[20px]" />
          </div>
          <div className="size-[32px] bg-accent-brewin-yellow rounded-[8px] p-[6px] flex items-center justify-center rotate-[9deg] absolute base:bottom-[15px] md:bottom-0 base:right-[-8px] md:right-[-20px]">
            <QuotesIcon className="size-[20px]" />
          </div>
        </div>

        <p className="typo-pre-body-04 text-content-2 mb-0 base:mt-[24px] md:mt-[40px]">
          자주 쓰이는 기능들, 실제 프로젝트에서 검증된 형태로 제공해요.
        </p>
        <p className="typo-pre-body-04 text-content-2 mb-0">
          빠르게 시작하고, 본질에 집중하세요.
        </p>

        <div className="relative border-solid w-[402px] h-[603px]">
          <img
            src="/img/ui/blur.webp"
            alt="blur"
            className="w-[402px] h-[680px] z-3 absolute top-[0] left-[0]"
          />
          <img
            src="/img/ui/iphone-frame.webp"
            alt="blur"
            className="w-[402px] h-[577px] z-1 absolute top-[0] left-[0]"
          />
          <img
            src="/img/ui/social-icons.webp"
            alt="blur"
            className="w-[480px] h-[160px] z-2 absolute top-[0] left-[0]"
          />
        </div>
      </div>
    </div>
  )
}
