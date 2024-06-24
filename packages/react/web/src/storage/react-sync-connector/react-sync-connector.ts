import { ReactSynced } from '../react-synced'

/**
 *
 * @category Storage
 *
 * 알림함수를 관리하고,{@link @toktokhan-dev/react-web#SyncedStorage | `SyncedStorage`} 와 {@link @toktokhan-dev/react-web#useSyncWebStorage | `useSyncWebStorage`} 를 연결 하는 모듈입니다.
 *
 * @remarks {@link @toktokhan-dev/react-web#useSyncWebStorage | `useSyncWebStorage`}로 부터 리랜더링을 촉발시키는 알림함수 를 받아 관리하고,
 * {@link @toktokhan-dev/react-web#SyncedStorage | `SyncedStorage`} 모듈에 알림 함수를 넘겨주어  {@link @toktokhan-dev/react-web#useSyncWebStorage | `useSyncWebStorage`}와 연결시켜주는 역할을 합니다.
 *
 * @example
 * ```ts
 * const textStorage = new SyncedStorage<string>("text", localStorage)
 * const textStorageConnector = new ReactSyncConnector(textStorage)
 *
 * // Some Action
 * textStorage.set("Hello, World!")
 *
 * // Some component
 * const text = useSyncWebStorage(textStorageConnector) // Wrapping Hook with useSyncWebStorage
 * console.log(text) // "Hello, World!"
 * ```
 */
export class ReactSyncConnector<Data> {
  /**
   * 알림함수를 저장하는 배열입니다.
   */
  public listeners: Array<() => void> = []

  /**
   * ReactSynced 인터페이스를 구현한 객체 또는 null입니다. Storage 모듈에 해당합니다.
   */
  private synced: ReactSynced<Data> | null

  /**
   * 서버 초깃값에 해당합니다.
   */
  private serverSynced?: Data | null

  /**
   * ReactSyncConnector 인스턴스를 생성합니다.
   * Storage 모듈에 emitChange 함수를 연결합니다.
   *
   * @param synced - ReactSynced 인터페이스를 구현한 객체입니다.
   * @param serverSynced - 사용자가 제공하는 서버 초기값입니다.
   */
  constructor(synced: ReactSynced<Data> | null, serverSynced?: Data) {
    this.synced = synced
    this.serverSynced = serverSynced
    this.synced?.connect(this.emitChange)
  }

  /**
   * {@link https://react.dev/reference/react/useSyncExternalStore | `useSyncExternalStore`}에서 알림함수를 받고, 저장해둡니다.
   *
   * @param listener - 변경 사항을 처리할 콜백 함수입니다.
   * @returns 정리 함수를 반환합니다.
   */
  public subscribe = (listener: () => void) => {
    if (this.synced) this.listeners = [...this.listeners, listener]
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  /**
   * 알림함수가 실행되어, 리랜더링 될 시 조회할 데이터를 넘겨줍니다.
   *
   * @returns 동기화된 데이터 또는 null을 반환합니다.
   */
  public getSnapshot = () => {
    return this.synced?.data ?? null
  }

  /**
   * 서버 데이터의 스냅샷을 반환합니다.
   *
   * @returns 서버 초깃값 또는 null을 반환합니다.
   */
  public getServerSnapShot = () => {
    return this.serverSynced ?? null
  }

  /**
   * 알림함수를 실행시켜 구독 모듈에 알림이 전달해 리랜더링을 촉발시킵니다.
   */
  private emitChange = () => {
    for (const listener of this.listeners) {
      listener()
    }
  }
}
