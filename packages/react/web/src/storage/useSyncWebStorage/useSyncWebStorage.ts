import { useSyncExternalStore } from 'react'

import { ReactSyncConnector } from '../react-sync-connector'

/**
 * @category Storage
 *
 * useSyncExternalStore 의 wrapper 입니다.
 * {@link @toktokhan-dev/react-web#ReactSyncConnector | `ReactSyncConnector`}를 통해 외부 스토리지와 동기화를 합니다.
 *
 * @example
 * ```ts
 * const textStorage = new SyncedStorage<string>("text", localStorage)
 * const textConnector = new ReactSyncConnector(textStorage)
 *
 * textStorage.set("Hello, World!")
 * textStorage.set((prev) => prev + "!")
 *
 * textStorage.get() // "Hello, World!!"
 *
 * const text = useSyncWebStorage(textConnector)
 *
 * console.log(text) // "Hello, World!!"
 * ```
 */
export const useSyncWebStorage = <T>(connector: ReactSyncConnector<T>) => {
  return useSyncExternalStore(
    connector.subscribe,
    connector.getSnapshot,
    connector.getServerSnapShot,
  )
}
