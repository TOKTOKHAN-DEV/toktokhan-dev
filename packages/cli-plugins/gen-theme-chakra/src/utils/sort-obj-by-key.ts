import { Obj } from '@toktokhan-dev/universal'

import { keys } from 'lodash/fp'

/**
 * 넘겨진 정렬 함수를 이용하여 객체의 선언 순서를 정렬하는 함수를 반환합니다.
 */
export const sortObjByKey =
  <T extends Obj>(sortFn: (a: keyof T, b: keyof T) => number) =>
  (obj: T): T => {
    const sizes = keys(obj)
    return sizes.sort(sortFn).reduce((acc, cur) => {
      const val = obj[cur]
      return {
        ...acc,
        [cur]: val,
      }
    }, {} as T)
  }
