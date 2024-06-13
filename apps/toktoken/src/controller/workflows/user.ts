export const STORAGE_KEY = {
  TOKTOKAHN_USER: 'TOKTOKHAN_USER',
} as const

export const getUserToken = async (): Promise<string> => {
  return await figma.clientStorage.getAsync(STORAGE_KEY.TOKTOKAHN_USER)
}

export const setUserToken = async (userId: string): Promise<void> =>
  await figma.clientStorage.setAsync(STORAGE_KEY.TOKTOKAHN_USER, userId)

export const getCurrentUser = async (): Promise<string | null> =>
  (await figma.currentUser?.id) || null
