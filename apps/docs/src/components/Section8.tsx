import { useEffect, useMemo, useRef, useState } from 'react'

import gsap from 'gsap'
import Marquee from 'react-fast-marquee'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import { QuoteIcon } from '../generated/icons'

const interviewers = [
  {
    title: '툴이 진짜 팀 속도를 끌어올려준 느낌이에요',
    description: `반복작업 줄여주고, 코드 퀄리티도 잘 지켜줘서 리팩토링보다\n기능에 집중할 수 있게 됐어요. 프로젝트 퀄리티가 나오니 뿌듯해요.`,
    position: '프로젝트 매니저',
    name: '양지은',
    emoji: '/img/ui/section-8-Interviewer-1.png',
  },
  {
    title: '이젠 API 설명만 잘 해두면 되네요',
    description: `예전엔 응답 구조 바뀌면 다 같이 맞춰줘야 했는데,\n지금은 Swagger만 잘 정리해두면 프론트가 알아서 훅 만들어서 써요.`,
    position: '백엔드 개발자',
    name: '황재승',
    emoji: '/img/ui/section-8-Interviewer-2.png',
  },
  {
    title: '핸드오프 속도가 완전히 달라졌어요',
    description: `gen:api 명령어를 실행하면 타입 정의된 custom hook까지 자동 생성됐어요.\n기존에 수동으로 설정하던 시간이 아예 줄어서, API 연동이 정말 빠르게 끝났어요.`,
    position: '프로덕트 디자이너',
    name: '정찬호',
    emoji: '/img/ui/section-8-Interviewer-3.png',
  },
  {
    title: '이제 훅은 직접 안 짜요',
    description: `하나하나 API 훅 짜고 타입 맞추는 데 시간 꽤 들었는데,\n
    gen:api 한 줄이면 거의 다 해결돼서 기능 개발에만 집중하게 됐어요.`,
    position: '프론트엔드 개발자',
    name: '김태진',
    emoji: '/img/ui/section-8-Interviewer-4.png',
  },
  {
    title: '복잡한 세팅 없이 바로 쓸 수 있어서 좋아요',
    description: `매번 초기 설정하는 데 반나절씩 썼었는데,\nAPI나 컴포넌트도 그냥 한 줄로 붙이면 끝이에요. 시간도 줄고 실수도 없어요.`,
    position: '프론트엔드 개발자',
    name: '손은경',
    emoji: '/img/ui/section-8-Interviewer-5.png',
  },
  {
    title: '구현 가능성보다 기능 자체에 집중하게 돼요',
    description: `이거는 된다, 안 된다 고민할 필요 없이\n '어떻게 만들지'보다 '무엇을 만들지'로 얘기가 시작돼요.`,
    position: '프로젝트 매니저',
    name: '김재완',
    emoji: '/img/ui/section-8-Interviewer-6.png',
  },
  {
    title: '기본기에 신경 쓸 여유가 생겼어요',
    description: `예전엔 구현에 쫓겨서 코드 성능을 기대하기 어려웠는데,\n이제는 구조랑 네이밍까지 챙길 시간이 나요.`,
    position: '프론트엔드 개발자',
    name: '김영주',
    emoji: '/img/ui/section-8-Interviewer-7.png',
  },
  {
    title: '작은 수정은 커뮤니케이션 없이 끝나요',
    description: `필드 하나만 바꿔도 예전엔 회의부터 했었는데,\n 이제는 문서만 고치면 프론트가 바로 반영해요.`,
    position: '백엔드 개발자',
    name: '윤준구',
    emoji: '/img/ui/section-8-Interviewer-8.png',
  },
]

export interface Props {
  title: string
  description: string
  position: string
  name: string
  emoji: string
}

const InterviewCard = ({
  name,
  position,
  description,
  title,
  emoji,
}: Props) => {
  const [isHover, setIsHover] = useState(false)

  const quoteIconColor = !isHover ? 'text-content-1' : 'text-content-8'

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative base:p-[32px] md:p-[64px] base:h-[332px] md:h-[353px] flex flex-col rounded-[40px] bg-background-basic-5 hover:bg-background-inverse-1 w-full hover:text-content-8 base:w-full  base:max-w-[606px] md:w-[606px] text-content-1 hover:cursor-pointer group transition-all duration-300 justify-between overflow-hidden"
    >
      <div className="flex flex-col">
        <QuoteIcon
          className={`base:w-[24px] base:h-[24px] transition-colors duration-300 ${quoteIconColor}`}
        />
        <span className="typo-pre-heading-02 mt-[16px]">{title}</span>
        <span className="mt-[12px] typo-pre-body-06 base:whitespace-normal md:whitespace-pre-line">
          {description}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-content-3 typo-pre-body-05">{position}</span>
        <span className="mt-[4px] typo-pre-heading-04 whitespace-pre-line">
          {name}
        </span>
      </div>
      <div className="absolute base:bottom-[-20px] base:right-[-0px] md:bottom-[-40px] md:right-[-0px]">
        <img
          src={emoji}
          alt={`${name}-emoji`}
          className="base:p-[20px] md:p-[32px] base:w-[160px] base:h-[160px] md:w-[200px] md:h-[200px] z-1 object-cover"
        />
      </div>
    </div>
  )
}

const ProgressBar = ({ onComplete }: { onComplete: () => void }) => {
  const progressBarRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    if (progressBarRef.current) {
      if (animationRef.current) {
        animationRef.current.kill()
      }

      animationRef.current = gsap.fromTo(
        progressBarRef.current,
        { width: '0%' },
        {
          width: '100%',
          duration: 5,
          ease: 'none',
          onComplete: () => {
            onComplete()
            if (animationRef.current) {
              animationRef.current.kill()
            }
            animationRef.current = null
          },
        },
      )
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
        animationRef.current = null
      }
    }
  }, [onComplete])

  return (
    <div className="w-[80%] bg-background-basic-5 h-[4px] mt-[16px] rounded-[999px]">
      <div
        ref={progressBarRef}
        className="h-full bg-accent-brewin-blue rounded-[999px]"
      />
    </div>
  )
}

export const Section8 = () => {
  const sliderRef = useRef<Slider>(null)

  const [progressKey, setProgressKey] = useState(0)

  const sliderSettings: Settings = useMemo(() => {
    return {
      dots: false,
      infinite: true,
      arrows: false,
      cssEase: 'linear',
      slidesToScroll: 1,
      slidesToShow: 1,
    }
  }, [])

  const nextSlide = () => {
    sliderRef.current?.slickNext()
  }

  return (
    <div className="flex flex-col w-full base:mt-[360px] md:mt-[320px] base:px-[16px] base:max-w-[404px] md:max-w-full mx-auto">
      <div className="flex flex-col items-center justify-center">
        <span className="px-[12px] py-[8px] rounded-[12px] bg-accent-brewin-blue">
          <span className="text-content-8 typo-uncut-body-05">
            our team says
          </span>
        </span>
        <div className="typo-uncut-display-04 flex base:flex-col md:flex-row base:items-center base:mt-[8px] md:mt-[16px]">
          <span className="whitespace-pre-wrap">Slow-brewed, </span>
          <span>fast to use.</span>
        </div>

        <div className="base:mt-[24px] md:mt-[40px] typo-pre-body-04 text-content-2">
          천천히 우려내왔던 기술, 팀원들은 이렇게 체감하고 있어요.
        </div>

        <div className="mt-[64px] flex max-w-[100vw] base:hidden md:block">
          <Marquee gradient={false} speed={200} pauseOnHover>
            {interviewers.map((interviewer, index) => (
              <div key={`interviewer-${index}`} className="mx-[4px] h-full">
                <InterviewCard {...interviewer} />
              </div>
            ))}
          </Marquee>
        </div>
        <div className="mt-[64px] base:flex flex-col md:hidden w-full">
          <div className="flex max-w-full flex-col items-center">
            <Slider
              ref={sliderRef}
              {...sliderSettings}
              beforeChange={() => {
                setProgressKey((prev) => prev + 1)
              }}
              className="w-full flex [&_.slick-track]:flex [&_.slick-track]:gap-[8px] [&_.slick-list]:w-full [&_.slick-list]:max-w-full [&_.slick-list]:h-fit [&_.slick-slide>div]:h-full"
            >
              {interviewers.map((interviewer, index) => (
                <InterviewCard
                  key={`interviewer-slider-${index}`}
                  {...interviewer}
                />
              ))}
            </Slider>
            <ProgressBar onComplete={nextSlide} />
          </div>
        </div>
      </div>
    </div>
  )
}
