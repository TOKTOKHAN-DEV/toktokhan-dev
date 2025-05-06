'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

import { MY_IMAGES } from '../generated/images'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

export const Section4 = () => {
  // 모바일 여부 관리
  const [isMobile, setIsMobile] = useState(false)

  // 애니메이션 target refs
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightContentRef = useRef<HTMLDivElement>(null)
  const milestoneListRef = useRef<HTMLDivElement>(null)
  const typingRef = useRef<HTMLDivElement>(null)

  // 애니메이션 상태 관리
  const [typingDone, setTypingDone] = useState(false)
  const [progress, setProgress] = useState<'idle' | 'progress' | 'check'>(
    'idle',
  )

  useLayoutEffect(() => {
    const matchMedia = gsap.matchMedia()

    matchMedia.add('(min-width: 1440px)', () => {
      if (
        !sectionRef.current ||
        !leftContentRef.current ||
        !rightContentRef.current ||
        !milestoneListRef.current ||
        !typingRef.current
      )
        return

      // milestoneList 초기 상태
      gsap.set(milestoneListRef.current, { y: 0 })

      const tl = gsap.timeline({ paused: true })
      // 1. 타이핑 플러그인 실행
      tl.to(typingRef.current, {
        duration: 2,
        text: 'yarn tokript gen:api',
        ease: 'power1.out',
        onComplete: () => {
          setTypingDone(true) // 타이핑이 끝나면
          setProgress('progress')
        },
      })

      // 2. 타이핑이 끝나야 milestoneListRef y:100% & progress 시작
      tl.to(milestoneListRef.current, {
        y: '105%',
        duration: 1,
        ease: 'back.in(0.8)',
        onStart: () => {
          setProgress('progress') // 마일스톤 이동되면 프로그레스 시작
        },
        onComplete: () => {
          setProgress('check') // 마일스톤 이동 끝나면 check로 변경
        },
      })

      // st1(왼쪽 pin)
      const st1 = ScrollTrigger.create({
        pin: leftContentRef.current,
        trigger: leftContentRef.current,
        start: 'top+=200px center',
        endTrigger: sectionRef.current,
        end: 'bottom bottom',
        scrub: true,
        // markers: { startColor: 'green', endColor: 'green', fontSize: '16px' },
      })

      // st2(오른쪽 pin + 타임라인 트리거)
      const st2 = ScrollTrigger.create({
        pin: rightContentRef.current,
        trigger: rightContentRef.current,
        start: 'bottom center+=18px',
        endTrigger: sectionRef.current,
        end: 'bottom bottom',
        scrub: true,
        // markers: { startColor: 'orange', endColor: 'orange', fontSize: '20px' },
        onEnter: () => tl.play(),
        onLeaveBack: () => {
          tl.pause(0)
          // tl.reverse()
          setTypingDone(false)
          setProgress('idle')
          gsap.set(milestoneListRef.current, { y: 0 })
          if (typingRef.current) typingRef.current.textContent = ''
        },
      })

      // cleanup 함수 반환
      return () => {
        st1.kill()
        st2.kill()
        tl.kill()
      }
    })

    return () => matchMedia.revert()
  }, [])

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1440) {
        setTypingDone(false)
        setProgress('idle')
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    handleResize() // mount 시에도 1회 실행

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      className={`flex flex-col base:pt-[0px] md:pt-[319px] base:mb-[160px] md:mb-[180px] mx-auto max-w-[1269px] base:w-[380px] md:w-full base:h-[1210px] md:h-[2252px]`}
    >
      <div
        className={
          'flex base:flex-col md:flex-row justify-between base:gap-y-[64px] w-full'
        }
      >
        {/* 왼쪽 컨텐츠 */}
        <div className="max-w-[501px] w-full" ref={leftContentRef}>
          <LeftContent />
        </div>
        {/* 오른쪽 컨텐츠 */}
        <div
          className={
            'flex base:flex-col-reverse md:flex-col base:gap-y-[4px] md:gap-y-[8px] max-w-[608px] w-full h-auto overflow-hidden'
          }
          ref={rightContentRef}
        >
          {/* 마일스톤 리스트 */}
          <div
            ref={milestoneListRef}
            className={'flex flex-col base:gap-y-[4px] md:gap-y-[8px] w-full'}
            style={{ zIndex: 0 }}
          >
            {API_ROUTES_LIST.map((route) => {
              return (
                <img
                  key={`item-${route.id}`}
                  src={route.img.src}
                  alt={`item-${route.img.alt}`}
                  className="w-max base:h-[60px] md:h-[88px]"
                />
              )
            })}
          </div>
          {/* 타이핑 애니메이션 */}
          <div
            className="relative base:max-w-[380px] md:max-w-[608px] w-full h-[100px]"
            style={{ zIndex: 1 }}
          >
            <div className="rounded-[16px] bg-background-inverse-1 p-[40px] w-full h-[100px] text-content-8 flex items-center font-['Monaspace_Neon'] text-[20px] font-semibold gap-x-[10px]">
              <div className="flex items-center gap-x-[10px]">
                <span className="text-content-8">{`> ${isMobile ? 'yarn tokript gen:api' : ''}`}</span>
                <span ref={typingRef} className="text-content-8" />
                {typingDone && progress === 'progress' && (
                  <div className="w-8 h-8 flex items-center justify-center">
                    <svg
                      className="animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                      fill="none"
                    >
                      <path
                        d="M35 19C35 21.1011 34.5861 23.1817 33.7821 25.1229C32.978 27.0641 31.7994 28.828 30.3137 30.3137C28.828 31.7994 27.0641 32.978 25.1229 33.7821C23.1817 34.5861 21.1011 35 19 35C16.8988 35 14.8183 34.5861 12.8771 33.7821C10.9359 32.978 9.17203 31.7994 7.68629 30.3137C6.20055 28.828 5.022 27.0641 4.21793 25.1229C3.41385 23.1817 3 21.1011 3 19C3 16.8988 3.41385 14.8183 4.21793 12.8771C5.022 10.9359 6.20056 9.17203 7.68629 7.68629C9.17203 6.20055 10.9359 5.022 12.8771 4.21793C14.8183 3.41385 16.8989 3 19 3C21.1012 3 23.1817 3.41385 25.1229 4.21793C27.0641 5.022 28.828 6.20056 30.3137 7.68629C31.7994 9.17203 32.978 10.9359 33.7821 12.8771C34.5861 14.8183 35 16.8989 35 19L35 19Z"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="5.33333"
                      />
                      <path
                        d="M35 19C35 21.1011 34.5861 23.1817 33.7821 25.1229C32.978 27.0641 31.7994 28.828 30.3137 30.3137C28.828 31.7994 27.0641 32.978 25.1229 33.7821C23.1817 34.5861 21.1011 35 19 35C16.8988 35 14.8183 34.5861 12.8771 33.7821C10.9359 32.978 9.17203 31.7994 7.68629 30.3137C6.20055 28.828 5.022 27.0641 4.21793 25.1229C3.41385 23.1817 3 21.1011 3 19"
                        stroke="white"
                        strokeWidth="5.33333"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                )}
                {progress === 'check' && (
                  <div className="w-8 h-8 rounded-full bg-accent-brewin-green flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M5 10.5L9 14.5L15 7.5"
                        stroke="#000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-[50px] bg-content-8 absolute bottom-0 inset-x-0 z-[-1]" />
          </div>
        </div>
      </div>
    </div>
  )
}

const LeftContent = () => {
  return (
    <div className={'flex flex-col gap-y-[8px] max-w-[501px] w-full'}>
      <Badge />
      <div className={'flex flex-col gap-y-[40px]'}>
        <span
          className={
            'whitespace-pre-line typo-uncut-display-03 tracking-[-2.4px] text-content-1'
          }
        >
          {`Code less,\nDo mooooore.`}
        </span>
        <span
          className={
            'typo-uncut-body-03 text-content-2 whitespace-pre-line tracking-[-0.32px] '
          }
        >
          {`Swagger 문서를 기반으로 필요한 API 코드를 자동으로 생성,\n타입까지 완벽하게 갖춰진 React Query용 훅을 단 한 줄로 만들어보세요.`}
        </span>
      </div>
    </div>
  )
}

const Badge = () => {
  return (
    <div className="flex items-center justify-center w-max px-[12px] py-[8px] rounded-[12px] bg-accent-brewin-red">
      <span className="inline-block typo-uncut-body-05 text-content-8">
        gen:api
      </span>
    </div>
  )
}

const API_ROUTES_LIST = [
  {
    id: 0,
    img: MY_IMAGES['MILESTONE_0.PNG'],
  },
  {
    id: 1,
    img: MY_IMAGES['MILESTONE_1.PNG'],
  },
  {
    id: 2,
    img: MY_IMAGES['MILESTONE_2.PNG'],
  },
  {
    id: 3,
    img: MY_IMAGES['MILESTONE_3.PNG'],
  },
  {
    id: 4,
    img: MY_IMAGES['MILESTONE_4.PNG'],
  },
  {
    id: 5,
    img: MY_IMAGES['MILESTONE_5.PNG'],
  },
  {
    id: 6,
    img: MY_IMAGES['MILESTONE_6.PNG'],
  },
  {
    id: 7,
    img: MY_IMAGES['MILESTONE_7.PNG'],
  },
  {
    id: 8,
    img: MY_IMAGES['MILESTONE_8.PNG'],
  },
  {
    id: 9,
    img: MY_IMAGES['MILESTONE_9.PNG'],
  },
  {
    id: 10,
    img: MY_IMAGES['MILESTONE_10.PNG'],
  },
  {
    id: 11,
    img: MY_IMAGES['MILESTONE_11.PNG'],
  },
] as const
