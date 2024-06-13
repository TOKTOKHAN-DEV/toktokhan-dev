import { useEffect, useState } from 'react'

import { uiAction } from '../../../../../action/ui'
import { useFetch } from '../../../../hooks/useFetch'
import { useMutation } from '../../../../hooks/useMutation'

export const STORAGE_KEY = {
  TOKTOKAHN_USER: 'TOKTOKHAN_USER',
} as const

export const useUserStorage = (currentUserId: string | null) => {
  const { mutate } = useMutation(uiAction.setUser.request)
  const { data: userToken, isLoading: isLoadingUser } = useFetch(
    uiAction.getUser.request,
  )

  const [userId, setUserId] = useState<string | null>(null)
  const isTokTokhanUser = !!userId && userId === currentUserId
  const setUser = (userId: string) => {
    mutate(userId).then(() => {
      setUserId(userId)
    })
  }
  useEffect(() => {
    if (!userToken) return
    setUserId(userToken)
  }, [userToken])

  return { isTokTokhanUser, setUser, isLoadingUser }
}
