import { useCallback, useEffect, useState } from 'react'

export const useFetch = <T>(
  reqestFn: () => Promise<T>,
  options?: { deps?: any[] },
) => {
  const { deps } = options || {}
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  const refetch = useCallback(() => {
    setIsLoading(true)
    reqestFn()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    setIsLoading(true)
    reqestFn()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false))
  }, [...(deps || [])])

  return { data, isLoading, error, refetch }
}
