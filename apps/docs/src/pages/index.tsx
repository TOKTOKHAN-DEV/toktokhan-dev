import { useEffect, useRef } from 'react'

import { useGSAP } from '@gsap/react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { twMerge } from 'tailwind-merge'

import CommonLayout from '../components/@Layout/CommonLayout'
import Section from '../components/@Layout/Section'
import Cli from '../components/Cli'
import Hero from '../components/Hero/Hero'
import HomeFooter from '../components/HomeFooter/HomeFooter'
import Templates from '../components/TemplateSection/Templates'
import { MY_IMAGES } from '../generated/images'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export default function Home() {
  const imageRef = useRef(null)
  const sectionRefs = useRef([])
  sectionRefs.current = []

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  useGSAP(() => {
    const image = imageRef.current

    const onMouseMove = (event) => {
      gsap.to(image, {
        duration: 0.6,
        rotationY: 0.1 * (window.innerWidth / 2 - event.clientX),
        rotationX: 0.1 * (window.innerHeight / 2 - event.clientY),
        ease: 'power1.out',
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [imageRef])

  useGSAP(() => {
    sectionRefs.current.forEach((section, index) => {
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight
      const difference = sectionHeight - windowHeight
      const fakeScrollRatio =
        difference > 0 ? difference / (difference + windowHeight) : 0

      if (fakeScrollRatio) {
        section.style.marginBottom = sectionHeight * fakeScrollRatio + 'px'
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'bottom bottom',
          end: () =>
            fakeScrollRatio ? `+=${section.offsetHeight}` : 'bottom top',
          pinSpacing: false,
          pin: true,
          scrub: true,
        },
      })

      if (fakeScrollRatio) {
        tl.to(section, {
          y: -difference,
          duration: 1 / (1 - fakeScrollRatio) - 1,
          ease: 'none',
        })
      }

      // 마지막페이지 제외
      if (index !== sectionRefs.current.length - 1) {
        tl.fromTo(
          section,
          { scale: 1, opacity: 1 },
          { scale: 0.5, opacity: 0.5, duration: 0.9 },
        ).to(section, { opacity: 0, duration: 0.1 })
      }
    })
  }, [sectionRefs])

  // useEffect(() => {
  //   sectionRefs.current.forEach((section, index) => {
  //     gsap.fromTo(
  //       section,
  //       { autoAlpha: 0, y: 50, scale: 0.9 },
  //       {
  //         duration: 1,
  //         autoAlpha: 1,
  //         y: 0,
  //         scale: 1,
  //         ease: 'power1.out',
  //         scrollTrigger: {
  //           trigger: section,
  //           start: 'top center+=100',
  //           toggleActions: 'play none none reverse',
  //         },
  //       },
  //     )
  //   })
  // }, [])

  return (
    <CommonLayout header={null} footer={<HomeFooter />}>
      <Hero />
      {/* <Section
        ref={addToRefs}
        title="Templates"
        subTitle="Build Your Apps with TOK's Templates"
        description="Start your project quickly by utilizing various framework folders in React, Next, RN, WebApp, etc."
      >
        <Templates />
      </Section>
      <Section
        ref={addToRefs}
        title="Modules"
        subTitle="Empower Your Development with Modules"
        description="Use various modules to develop more conveniently and flexibly. Most of the provided functions are curring so they can be used flexibly."
      >
        <img
          ref={imageRef}
          {...MY_IMAGES.MODULE}
          className="base:w-[260px] md:w-[360px] xl:w-[436px]"
        />
      </Section>
      <Section
        ref={addToRefs}
        title="CLI"
        subTitle="Develop and Share Your Own CLI Plugins"
        description="Create and share your own plugins to develop more efficiently."
      >
        <Cli />
      </Section> */}
    </CommonLayout>
  )
}
