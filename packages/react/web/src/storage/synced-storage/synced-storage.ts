import { DataOrFn, runIfFn } from '@toktokhan-dev/universal'

import { ReactSynced } from '../react-synced'

/**
 * @category Storage
 *
 * 데이터를 동기화하는 SyncedStorage 클래스입니다. 데이터가 업데이트될 때 리스너 함수를 호출합니다.
 * {@link @toktokhan-dev/react-web#ReactSyncConnector | `ReactSyncConnector`} 와 연결하여 사용합니다.
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
 * textStorage.remove()
 *
 * textStorage.get() // null
 * ```
 *
 */
export class SyncedStorage<Data> extends ReactSynced<Data> {
  /**
   * SyncedStorage 인스턴스를 생성합니다.
   * 데이터를 저장할 키와 Storage 객체를 받습니다.
   *
   * 생성될때, storage 이벤트가 등록되며 다른 브라우저에서의 change event를 감지하여, 최신값을 가져옵니다.
   *
   * @param key - 데이터를 저장할 키입니다.
   * @param storage - 데이터를 저장할 Storage 객체입니다.
   */
  constructor(
    public key: string,
    private storage: Storage,
  ) {
    super()
    this.key = key
    this.storage = storage
    this.data = this.get()

    typeof window !== 'undefined' &&
      window.addEventListener('storage', (data) => {
        if (this.key === data.key) {
          this.data = this.get()
        }
      })
  }

  /**
   * Storage에 저장된 json 데이터를 parse 한 후 가져옵니다.
   */
  get = (): Data | null => {
    const item = this.storage.getItem(this.key)
    if (item === null) return null
    return JSON.parse(item)
  }

  /**
   * Storage에 데이터를 저장합니다.
   * 저장할 데이터 혹은 함수를 받아서 데이터를 저장합니다.
   */
  set = (data: DataOrFn<Data | null>): void => {
    this.data = runIfFn(data, this.data)
    this.storage.setItem(this.key, JSON.stringify(this.data))
  }

  /**
   * Storage에 저장된 데이터를 삭제합니다.
   */
  remove = (): void => {
    this.data = null
    this.storage.removeItem(this.key)
  }
}
