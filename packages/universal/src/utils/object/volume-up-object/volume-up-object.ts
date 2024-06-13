import { curry, flow, reduce, setWith } from 'lodash/fp'

import { Obj } from '../../../types'
import { pass } from '../../fn'

/**
 * @category Utils/Object
 *
 * 객체의 key 에서 flag 를 찾아서 해당 flag 를 기준으로 중첩 객체를 만들어주는 함수입니다.
 *
 * @param flag - object 생성 기준이 되는 flag 입니다.
 * @param obj - flag 를 기준으로 중첩 객체를 만들 객체입니다.
 *
 * @returns flag 를 기준으로 중첩 객체를 만들어 반환합니다.
 *
 * @example
 * ```ts
 * const obj = {
 *  a: 1,
 * 'b.a': 2,
 * 'b.b': 3,
 * 'c.a.a': 6,
 * }
 *
 * const result = volumeUpObject('.', obj)
 *
 * console.log(result)
 *
 * // {
 * //   a: 1,
 * //   b: {
 * //     a: 3,
 * //     b: 4,
 * //   },
 * //   c: {
 * //     a: {
 * //       a: 6,
 * //     },
 * //   },
 * // }
 * ```
 */
export const volumeUpObject: {
  (flag: string, obj: Obj): Obj
  (flag: string): (obj: Obj) => Obj
} = curry((flag: string, obj: Obj) =>
  flow(
    pass(obj),
    Object.entries,
    reduce((prev, [key, value]) => {
      const path = key.replaceAll(flag, '.')
      return setWith(Object, path, value, { ...prev })
    }, {}),
  )(),
)
