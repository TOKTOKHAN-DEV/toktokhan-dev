/**
 * @category Storage
 *
 * 데이터를 동기화하는 ReactSynced 클래스입니다. 데이터가 업데이트될 때 리스너 함수를 호출합니다.
 */
export class ReactSynced<T> {
  /**
   * 동기화된 데이터입니다.
   */
  private _data: T | null = null

  /**
   * 리스너 함수입니다.
   */
  public listener: (() => void) | null = null

  /**
   * 동기화된 데이터를 가져옵니다.
   * @returns T 타입의 동기화된 데이터 또는 데이터가 설정되지 않은 경우 null을 반환합니다.
   */
  get data(): T | null {
    return this._data
  }

  /**
   * 동기화된 데이터를 설정하고 리스너를 트리거합니다.
   * @param data - 동기화할 데이터입니다.
   */
  set data(data: T | null) {
    this._data = data
    this.listener?.()
  }

  /**
   * 데이터가 업데이트될 때 호출될 리스너 함수를 연결합니다.
   * @param listener - 호출될 리스너 함수입니다.
   */
  connect = (listener: () => void) => {
    this.listener = listener
  }

  /**
   * 리스너 함수를 연결 해제합니다.
   */
  unConnect = () => {
    this.listener = null
  }
}
