import { DataOrFn, isNotNullish, runIfFn } from '@toktokhan-dev/universal'

import { Cookies } from 'react-cookie'

import { ReactSynced } from '../react-synced'

export type CookieOptions = Parameters<Cookies['set']>[2]

/**
 * @category Storage
 *
 * 데이터를 쿠키에 동기화하는 SyncedCookie 클래스입니다. 데이터가 업데이트될 때 리스너 함수를 호출합니다.
 * {@link @toktokhan-dev/react-web#ReactSyncConnector | `ReactSyncConnector`}와 연결하여 사용합니다.
 *
 * @example
 * ```ts
 * const cookieStorage = new SyncedCookie<string>("cookie-key", { path: '/' })
 * const cookieConnector = new ReactSyncConnector(cookieStorage)
 *
 * cookieStorage.set("Hello, Cookie!")
 * cookieStorage.set((prev) => prev + "!")
 *
 * cookieStorage.get() // "Hello, Cookie!!"
 * cookieStorage.remove()
 *
 * cookieStorage.get() // null
 * ```
 *
 */
export class SyncedCookie<Data> extends ReactSynced<Data> {
  public storage = new Cookies()
  public defaultOptions: CookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  }

  /**
   * SyncedCookie 인스턴스를 생성합니다.
   * 데이터를 저장할 키와 쿠키 옵션을 받습니다.
   *
   * @param key - 데이터를 저장할 키입니다.
   * @param options - 쿠키 옵션입니다.
   */
  constructor(
    public key: string,
    options?: CookieOptions,
  ) {
    super()
    if (options) {
      this.defaultOptions = Object.assign({}, this.defaultOptions, options)
    }
    this.key = key
    this.data = this.get()
  }

  /**
   * 쿠키에서 데이터를 가져옵니다.
   * 저장된 json 데이터를 parse 한 후 가져옵니다.
   */
  get = (): Data | null => {
    const item = this.storage.get(this.key)
    if (!isNotNullish(item)) return null
    return item
  }

  /**
   * 쿠키에 데이터를 저장합니다.
   * 저장할 데이터 혹은 함수를 받아서 데이터를 저장합니다.
   *
   * @param data - 저장할 데이터 혹은 데이터를 반환하는 함수입니다.
   * @param options - 쿠키 옵션입니다.
   */
  set = (data: DataOrFn<Data | null>, options?: CookieOptions): void => {
    this.data = runIfFn(data, this.data)
    const finalOptions = Object.assign({}, this.defaultOptions, options)
    this.storage.set(this.key, this.data, finalOptions)
  }

  /**
   * 쿠키에 저장된 데이터를 삭제합니다.
   *
   * @param options - 쿠키 옵션입니다.
   */
  remove = (options?: CookieOptions): void => {
    this.data = null
    const finalOptions = Object.assign({}, this.defaultOptions, options)
    this.storage.remove(this.key, finalOptions)
  }
}
