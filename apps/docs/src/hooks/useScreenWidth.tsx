import { useEffect, useState } from 'react'

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setScreenWidth(window.innerWidth)
      }, 200)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  return screenWidth
}
