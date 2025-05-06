import { useState } from 'react'

import Marquee from 'react-fast-marquee'

import {
  Interviewer1Icon,
  Interviewer2Icon,
  Interviewer3Icon,
  Interviewer4Icon,
  Interviewer5Icon,
  Interviewer6Icon,
  Interviewer7Icon,
  Interviewer8Icon,
  Interviewer9Icon,
  QuoteIcon,
} from '../generated/icons'

const interviewers = [
  {
    title: '툴이 진짜 팀 속도를 끌어올려준 느낌이에요',
    description: `반복작업 줄여주고, 코드 퀄리티도 잘 지켜줘서 리팩토링보다\n기능에 집중할 수 있게 됐어요. 프로젝트 퀄리티가 나오니 뿌듯해요.`,
    position: '프로젝트 매니저',
    name: '양지은',
    emoji: <Interviewer1Icon />,
  },
  {
    title: '이젠 API 설명만 잘 해두면 되네요',
    description: `예전엔 응답 구조 바뀌면 다 같이 맞춰줘야 했는데,\n지금은 Swagger만 잘 정리해두면 프론트가 알아서 훅 만들어서 써요.`,
    position: '백엔드 개발자',
    name: '황재승',
    emoji: <Interviewer2Icon />,
  },
  {
    title: '핸드오프 속도가 완전히 달라졌어요',
    description: `gen:api 명령어를 실행하면 타입 정의된 custom hook까지 자동 생성됐어요.\n기존에 수동으로 설정하던 시간이 아예 줄어서, API 연동이 정말 빠르게 끝났어요.`,
    position: '프로덕트 디자이너',
    name: '정찬호',
    emoji: <Interviewer3Icon />,
  },
  {
    title: '이제 훅은 직접 안 짜요',
    description: `하나하나 API 훅 짜고 타입 맞추는 데 시간 꽤 들었는데,\n
    gen:api 한 줄이면 거의 다 해결돼서 기능 개발에만 집중하게 됐어요.`,
    position: '프론트엔드 개발자',
    name: '김태진',
    emoji: <Interviewer4Icon />,
  },
  {
    title: '이젠 API 설명만 잘 해두면 되네요',
    description: `예전엔 응답 구조 바뀌면 다 같이 맞춰줘야 했는데,\n지금은 Swagger만 잘 정리해두면 프론트가 알아서 훅 만들어서 써요.`,
    position: '백엔드 개발자',
    name: '황재승',
    emoji: <Interviewer5Icon />,
  },
  {
    title: '복잡한 세팅 없이 바로 쓸 수 있어서 좋아요',
    description: `매번 초기 설정하는 데 반나절씩 썼었는데,\nAPI나 컴포넌트도 그냥 한 줄로 붙이면 끝이에요. 시간도 줄고 실수도 없어요.`,
    position: '프론트엔드 개발자',
    name: '손은경',
    emoji: <Interviewer6Icon />,
  },
  {
    title: '구현 가능성보다 기능 자체에 집중하게 돼요',
    description: `이거는 된다, 안 된다 고민할 필요 없이\n ‘어떻게 만들지’보다 ‘무엇을 만들지’로 얘기가 시작돼요.`,
    position: '프로젝트 매니저',
    name: '김재완',
    emoji: <Interviewer7Icon />,
  },
  {
    title: '기본기에 신경 쓸 여유가 생겼어요',
    description: `예전엔 구현에 쫓겨서 코드 성능을 기대하기 어려웠는데,\n이제는 구조랑 네이밍까지 챙길 시간이 나요.`,
    position: '프론트엔드 개발자',
    name: '김영주',
    emoji: <Interviewer8Icon />,
  },
  {
    title: '작은 수정은 커뮤니케이션 없이 끝나요',
    description: `필드 하나만 바꿔도 예전엔 회의부터 했었는데,\n 이제는 문서만 고치면 프론트가 바로 반영해요.`,
    position: '백엔드 개발자',
    name: '윤준구',
    emoji: <Interviewer9Icon />,
  },
]

interface Props {
  name: string
  position: string
  description: string
  title: string
  emoji: React.ReactNode
}

const InterviewCard = ({
  name,
  position,
  description,
  title,
  emoji,
}: Props) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="p-[64px] flex flex-col rounded-[40px] bg-background-basic-5 hover:bg-[#191919] hover:text-white w-[606px] relative text-content-1 hover:cursor-pointer group transition-all duration-300 "
    >
      <QuoteIcon
        fill={isHover ? 'white' : '#191919'}
        className="w-[40px] h-[40px] transition-colors duration-300"
      />
      <span className="typo-pre-heading-02 mt-[16px]">{title}</span>
      <span className="mt-[12px]  typo-pre-body-06">{description}</span>
      <span className="mt-[40px] text-content-3 typo-pre-body-05">
        {position}
      </span>
      <span className="mt-[4px]  typo-pre-heading-04">{name}</span>
      <div className="absolute bottom-[0px] right-[10px] flex items-center justify-center">
        {emoji}
      </div>
    </div>
  )
}

export const Section8 = () => {
  return (
    <div className="flex flex-col w-full mt-[320px]">
      <div className="flex flex-col items-center justify-center">
        <span className="px-[12px] py-[8px] rounded-[12px] bg-accent-brewin-blue">
          <span className="text-content-8 typo-uncut-body-05">
            our team says
          </span>
        </span>
        <div className="mt-[16px] typo-uncut-display-04">
          Slow-brewed, fast to use.
        </div>
        <div className="mt-[40px] typo-uncut-body-04 text-content-2">
          천천히 우려내왔던 기술, 팀원들은 이렇게 체감하고 있어요.
        </div>
        <div className="mt-[64px] flex max-w-[100vw]">
          <Marquee gradient={false} speed={200} pauseOnHover>
            {interviewers.map((interviewer) => (
              <div key={interviewer.name} className="mx-[12px]">
                <InterviewCard {...interviewer} />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  )
}
