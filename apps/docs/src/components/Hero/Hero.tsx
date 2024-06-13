import { useRef } from 'react'

import { useGSAP } from '@gsap/react'
import { MY_IMAGES } from '@site/src/generated/images'
import { calcAngleDegrees } from '@site/src/utils/animations'

import { gsap } from 'gsap'
import { twJoin, twMerge } from 'tailwind-merge'

import Image from '../Image'
import HeroContent from './components/HeroContent'

const Hero = () => {
  const wrapper = useRef()

  const container = useRef()

  const { contextSafe } = useGSAP({ scope: container })

  const onEnter = contextSafe(({ currentTarget }) => {
    gsap.to(currentTarget, { rotation: '+=360' })
  })

  const onHover = contextSafe(({ currentTarget }) => {
    gsap.to(currentTarget, { rotation: '+=20' })
  })

  useGSAP(
    () => {
      const heroImages = [
        '.hero_img_a',
        '.hero_img_b',
        '.hero_img_c',
        '.hero_img_d',
        '.hero_img_arrow',
      ]
      heroImages.forEach((img) => {
        gsap.fromTo(
          img,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 1.1 + Math.random() * 0.5,
            ease: 'back.out(1.7)',
          },
        )
      })
    },
    { scope: wrapper },
  )

  useGSAP(() => {
    const arrowEl = document.querySelector('.hero_img_arrow')
    const arrowRect = arrowEl.getBoundingClientRect()

    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const { innerWidth, innerHeight } = window
      const centerX = innerWidth / 2
      const centerY = innerHeight / 2
      const deltaX = (clientX - centerX) / centerX
      const deltaY = (clientY - centerY) / centerY

      const arrowDegByPoint = calcAngleDegrees(
        event.clientX - arrowRect.left - arrowRect.width / 2,
        event.clientY - arrowRect.top - arrowRect.height / 2,
      )

      const animateArrow = (degree: number) => {
        gsap.to('.hero_img_arrow', {
          rotation: degree + 130,
          duration: 0,
        })
      }

      const animateImage = (
        selector: string,
        xMultiplier: number,
        yMultiplier: number,
      ) => {
        gsap.to(selector, {
          x: deltaX * xMultiplier,
          y: deltaY * yMultiplier,
          ease: 'power2.out',
        })
      }

      animateArrow(arrowDegByPoint)

      animateImage('.hero_img_a', -5, -5)
      animateImage('.hero_img_b', -5, 5)
      animateImage('.hero_img_c', 10, 20)
      animateImage('.hero_img_d', 5, -5)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={wrapper}
      className={twJoin('h-screen flex justify-center items-center')}
    >
      <HeroContent
        ref={container}
        className={twMerge(
          'relative w-fit',
          'base:w-[287px] h-[287px]',
          'sm:w-[406px] h-[281px]',
          'md:w-[516px] h-[318px]',
        )}
      >
        {/* Left Images */}
        <Image
          {...MY_IMAGES['3D_X']}
          className={twMerge(
            'hero_img_d',
            'opacity-0',
            'w-[172px] h-[164px]',
            'absolute',
            '-left-[calc(172px+462px)]',
            // '-top-[41px]',
            '-top-[141px]',
          )}
          onMouseEnter={onEnter}
          onMouseLeave={onEnter}
          onMouseMove={onHover}
        />
        <Image
          {...MY_IMAGES['3D_D']}
          className={twMerge(
            'hero_img_b',
            'opacity-0',
            'w-[215px] h-[171px]',
            'absolute',
            '-left-[calc(215px+229px)]',
            'top-[47px]',
          )}
          onMouseEnter={onEnter}
          onMouseLeave={onEnter}
          onMouseMove={onHover}
        />

        <Image
          {...MY_IMAGES['3D_ARROW']}
          className={twMerge(
            'hero_img_arrow',
            'opacity-0',
            'w-[147px] h-[157px]',
            'absolute',
            '-left-[calc(70px+147px)]',
            '-top-[100px]',
            'transition-none',
            // '-top-[56px]',
            '-top-[156px]',
          )}
        />
        <Image
          {...MY_IMAGES['3D_U']}
          className={twMerge(
            'hero_img_a',
            'opacity-0',
            'w-[159px] h-[130px]',
            'absolute',
            '-left-[calc(159px+407px)]',
            // '-bottom-[49px]',
            '-bottom-[149px]',
          )}
          onMouseEnter={onEnter}
          onMouseLeave={onEnter}
          onMouseMove={onHover}
        />
        <Image
          {...MY_IMAGES['3D_CHAIN']}
          className={twMerge(
            'hero_img_c',
            'opacity-0',
            'w-[197px] h-[167px]',
            'absolute',
            '-left-[calc(197px+70px)]',
            // '-bottom-[35px]',
            '-bottom-[135px]',
          )}
          onMouseEnter={onEnter}
          onMouseLeave={onEnter}
          onMouseMove={onHover}
        />

        {/* Right Images */}
        <Image
          {...MY_IMAGES['3D_X2']}
          className={twMerge(
            'hero_img_c',
            'opacity-0',
            'w-[169px] h-[177px]',
            'absolute',
            '-right-[calc(169px+100px)]',
            // 'top-0',
            '-top-[100px]',
          )}
          onMouseEnter={onEnter}
          onMouseLeave={onEnter}
          onMouseMove={onHover}
        />
        <Image
          {...MY_IMAGES['3D_SPRING']}
          className={twMerge(
            'hero_img_b',
            'opacity-0',
            'w-[172px] h-[164px]',
            'absolute',
            // '-right-[calc(172px+161px)]',
            '-bottom-[84px]',
            '-right-[calc(172px+10px)]',
            // '-bottom-[184px]',
          )}
          onMouseEnter={onEnter}
          onMouseLeave={onEnter}
          onMouseMove={onHover}
        />
        <Image
          {...MY_IMAGES['3D_EXCLAIMATION']}
          className={twMerge(
            'hero_img_a',
            'opacity-0',
            'w-[166px] h-[175px]',
            'absolute',
            '-right-[calc(166px+378px)]',
            // '-bottom-[3px]',
            '-bottom-[103px]',
          )}
          onMouseEnter={onEnter}
          onMouseLeave={onEnter}
          onMouseMove={onHover}
        />
        <Image
          {...MY_IMAGES['3D_W']}
          className={twMerge(
            'hero_img_d',
            'opacity-0',
            'w-[217px] h-[171px]',
            'absolute',
            '-right-[calc(217px+347px)]',
            // '-top-[66px]',
            '-top-[166px]',
          )}
          onMouseEnter={onEnter}
          onMouseLeave={onEnter}
          onMouseMove={onHover}
        />
      </HeroContent>
    </div>
  )
}

export default Hero
