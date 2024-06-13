import { renderHook } from '@testing-library/react'

import { SyncedStorageFactory } from '../synced-storage-factory'
import { useSyncWebStorage } from './useSyncWebStorage'

describe('useSyncWebStorage', () => {
  it('should sync with external store', () => {
    const { storage, connector } = SyncedStorageFactory.createLocal<{
      todo: string[]
    }>('test')
    storage?.set({ todo: ['test'] })

    const { result } = renderHook(() => useSyncWebStorage(connector))
    expect(result.current).toStrictEqual({ todo: ['test'] })
  })
})
