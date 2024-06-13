import { ReactSyncConnector } from '../react-sync-connector'
import { SyncedStorage } from '../synced-storage'

/**
 * @category Storage
 *
 * 동기화된 스토리지를 생성하는 팩토리 역할을 합니다.
 * 해당 클래스의 각 method 는 {@link @toktokhan-dev/react-web#ReactSyncConnector | `ReactSyncConnector`}와 {@link @toktokhan-dev/react-web#SyncedStorage | `SyncedStorage`}를
 * 동시에 생성해줍니다.
 *
 * @example
 * ```ts
 * type TokenType = {
 *  access: string
 *  refresh: string
 * }
 * const { storage, connector } = SyncedStorageFactory.createLocal<TokenType>('token')
 *
 * storage.set({ access: 'access', refresh: 'refresh' })
 *
 * const token = useWebStorage(connector)
 * ```
 */
export class SyncedStorageFactory {
  /**
   * 로컬 스토리지를 생성합니다.
   * @param key 스토리지 키
   * @returns 생성된 스토리지와 커넥터 객체
   */
  static createLocal = <Data>(key: string) => {
    const store = typeof window === 'undefined' ? null : localStorage
    return this.create<Data>(key, store) //
  }

  /**
   * 세션 스토리지를 생성합니다.
   * @param key 스토리지 키
   * @returns 생성된 스토리지와 커넥터 객체
   */
  static createSession = <Data>(key: string) => {
    const store = typeof window === 'undefined' ? null : sessionStorage
    return this.create<Data>(key, store)
  }

  /**
   * 스토리지를 생성합니다.
   * @param key 스토리지 키
   * @param store 스토리지 객체
   * @returns 생성된 스토리지와 커넥터 객체
   */
  static create = <Data>(key: string, store: Storage | null) => {
    const storage = store ? new SyncedStorage<Data>(key, store) : null
    const connector = new ReactSyncConnector(storage)

    return { storage, connector }
  }
}
