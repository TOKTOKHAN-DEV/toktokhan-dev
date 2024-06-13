export interface RelayParams<Data, NextParam, Selected> {
  /**
   * 첫번째 호출시 넘겨줄 파라미터입니다.
   */
  initialParam: NextParam
  /**
   * 다음 데이터를 가져오는 함수입니다.
   * getNextParams 으로 부터 받은 파라미터를 이용하여 데이터를 가져옵니다.
   * getNextParams 가 null 을 반환하면 getNext 는 호출되지 않습니다.
   *
   * @param nextParam - 다음 데이터를 가져오기 위한 파라미터
   */
  getNext: (nextParam: NextParam) => Promise<Data>
  /**
   * 다음 데이터를 가져오기 위한 파라미터를 반환하는 함수입니다.
   * 이전 마지막으로 여청한 getNext 에서 받은 데이터를 이용하여 다음 데이터를 가져오기 위한 파라미터를 반환합니다.
   * null 을 반환하면, 데이터를 가져오는 것을 중지합니다.
   *
   * @param last - 마지막으로 가져온 데이터
   */
  getNextParams: (last: Data) => NextParam | null
  /**
   * 각 페이지별 데이터를 포메팅하여 원하는 형태의 데이터를 반환하게끔 합니다.
   * @param data - 가져온 데이터
   */
  selector?: (data: Data[]) => Selected
}

/**
 * @category Utils/Fn
 *
 * 인자로 넘겨준 getNext 함수를 연속적으로 호출하여 데이터를 가져오는 함수입니다.
 * 호출된 데이터를 순서대로 배열로 반환합니다.
 *
 * 주로 pagination 된 데이터의 모든 페이지를 가져오는데 사용됩니다.
 *
 * @example
 *
 * ```ts
 * const list = range(0, 100)
 *
 * const getList = async (params: { offset: number; limit: number }) => {
 * const { offset, limit } = params
 * const next = offset + limit
 *
 * return {
 *  total: list.length,
 *  next: list.length - 1 < next ? null : next,
 *  data: list.slice(offset, offset + limit),
 * }
 *
 * const result = await relay({
 *  initialParam: 0,
 *  getNext: (nextParam: number) => getList({ offset: nextParam, limit: 10 }),
 *  getNextParams: (last) => {
 *    return last?.next
 * },
 *
 * console.log(result)
 *
 * // [
 * //   { total: 100, next: 10, data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
 * //   { total: 100, next: 20, data: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
 * //   { total: 100, next: 30, data: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29] },
 * //   ...
 * //   { total: 100, next: null, data: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99] },
 * // ]
 *
 *
 * ```
 */
export const relay = async <Data, NextParam, Selected = Data[]>(
  params: RelayParams<Data, NextParam, Selected>,
): Promise<Selected> => {
  const { getNext, getNextParams, initialParam, selector } = params

  const getPages = async (pages: Data[]): Promise<Data[]> => {
    const nextParam =
      pages.length === 0 ? initialParam : getNextParams(pages[pages.length - 1])

    if (nextParam === null) {
      return pages
    }

    return await getPages([...pages, await getNext(nextParam)])
  }

  const pages: Data[] = await getPages([])

  return selector ? selector(pages) : (pages as unknown as Selected)
}
