import { useEffect, useState } from 'react'

import resolveConfig from 'tailwindcss/resolveConfig'

import tailwindConfig from '../../tailwind.config'
import { useScreenWidth } from './useScreenWidth'

const fullConfig = resolveConfig(tailwindConfig)

export const useScreenVarient = () => {
  const screenWidth = useScreenWidth()
  const screens = fullConfig.theme.screens

  const { md, lg, xl } = Object.fromEntries(
    Object.entries(screens).map(([key, value]) => [
      key,
      parseInt((value as string).split('px')[0]),
    ]),
  )

  const [currentScreen, setCurrentScreen] = useState<
    'base' | 'sm' | 'md' | 'lg' | 'xl'
  >('base')

  useEffect(() => {
    if (screenWidth >= xl) {
      setCurrentScreen('xl')
    } else if (screenWidth >= lg) {
      setCurrentScreen('lg')
    } else if (screenWidth >= md) {
      setCurrentScreen('md')
    } else {
      setCurrentScreen('base')
    }
  }, [screenWidth])

  return {
    isMd: currentScreen === 'md',
    isLg: currentScreen === 'lg',
    isXl: currentScreen === 'xl',
    isBase: currentScreen === 'base',
  }
}
