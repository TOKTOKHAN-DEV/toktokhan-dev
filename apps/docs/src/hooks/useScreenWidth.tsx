import { useEffect, useState } from 'react'

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(0)

  useEffect(() => {
    const updateWidth = () => setScreenWidth(window.innerWidth)
    updateWidth()

    let timeoutId: NodeJS.Timeout

    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        updateWidth()
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
