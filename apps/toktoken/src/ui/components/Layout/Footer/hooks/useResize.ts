import { useEffect, useRef } from 'react'

import { uiAction } from '../../../../../action/ui'
import { useMutation } from '../../../../hooks/useMutation'

const useResize = () => {
  const cornerRef = useRef<SVGSVGElement>(null)

  const { mutate } = useMutation(uiAction.resize.request)

  useEffect(() => {
    const corner = cornerRef.current
    const resizeWindow = (e: PointerEvent) => {
      const size = {
        w: Math.max(50, Math.floor(e.clientX + 5)),
        h: Math.max(50, Math.floor(e.clientY + 5)),
      }
      mutate(size)
    }

    if (corner) {
      corner.onpointerdown = (e) => {
        corner.onpointermove = resizeWindow
        corner.setPointerCapture(e.pointerId)
      }
      corner.onpointerup = (e) => {
        corner.onpointermove = null
        corner.releasePointerCapture(e.pointerId)
      }
    }

    return () => {
      if (corner) {
        corner.onpointerdown = null
        corner.onpointerup = null
      }
    }
  }, [])

  useEffect(() => {
    mutate({ w: 450, h: 650 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    cornerRef,
  }
}

export default useResize
