import { useRef, useState } from 'react'

export const useMutation = <
  T extends (...args: any[]) => Promise<any>,
  P extends Parameters<T>,
  R extends Awaited<ReturnType<T>>,
>(
  reqestFn: T,
  options?: {
    onSuccess: (data: R, params: P) => void
    onError: (error: any) => void
    onFinally: () => void
  },
) => {
  const { onSuccess, onError, onFinally } = options || {}

  const optionsRef = useRef(options)
  optionsRef.current = options

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const mutate = async (...params: P): Promise<R> => {
    setIsLoading(true)
    try {
      const data = await reqestFn(...params)
      onSuccess?.(data, params)
      return data
    } catch (error) {
      onError?.(error)
      throw error
    } finally {
      setIsLoading(false)
      onFinally?.()
    }
  }

  return { mutate, isLoading }
}
