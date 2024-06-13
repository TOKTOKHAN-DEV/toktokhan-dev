import { gsap } from 'gsap'

export const animateTo = (selector: string, options: gsap.TweenVars) => {
  gsap.to(selector, {
    duration: 1,
    ease: 'power4.out',
    ...options,
  })
}
export const animateFrom = (selector: string, options: gsap.TweenVars) => {
  gsap.from(selector, {
    duration: 0.5,
    ease: 'power4.out',
    ...options,
  })
}

export const calcAngleDegrees = (x: number, y: number) => {
  return (Math.atan2(y, x) * 180) / Math.PI
}
