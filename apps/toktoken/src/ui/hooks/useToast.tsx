import { useCallback, useEffect, useState } from 'react'

import { twMerge } from 'tailwind-merge'

import { LogoIcon } from '../generated/icons'

const useToast = () => {
  const [toastProps, setToastProps] = useState({
    message: '',
    visibility: 'hidden',
  })

  const showToast = useCallback((message: string, duration = 3000) => {
    setToastProps({ message, visibility: 'appearing' })
    setTimeout(() => setToastProps({ message, visibility: 'visible' }), 500)
    setTimeout(
      () => setToastProps({ message, visibility: 'disappearing' }),
      duration,
    )
    setTimeout(
      () =>
        setToastProps((prevState) => ({ ...prevState, visibility: 'hidden' })),
      duration + 500,
    )
  }, [])

  useEffect(() => {
    const clearToast = setTimeout(() => {
      setToastProps((prevState) => ({ ...prevState, visibility: 'hidden' }))
    }, 3000)

    return () => clearTimeout(clearToast)
  }, [])

  const toastClassNames = twMerge(
    'flex items-center gap-[2px] justify-center z-50',
    'fixed bottom-3 left-1/2 transform -translate-x-1/2',
    'bg-text-primary text-white caption01-regular py-2 px-2 rounded transition-opacity duration-300',
    toastProps.visibility === 'appearing' && 'animate-fadeIn',
    toastProps.visibility === 'visible' && 'opacity-100',
    toastProps.visibility === 'disappearing' && 'animate-fadeOut',
    toastProps.visibility === 'hidden' && 'opacity-0',
  )

  const ToastComponent = (
    <div className={toastClassNames}>
      <LogoIcon />
      {toastProps.message}
    </div>
  )

  return { showToast, ToastComponent }
}

export default useToast
