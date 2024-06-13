import { curry } from 'lodash/fp'

import { ByteUnit } from '../../../types/static/byte-unit'
import { devide } from '../../math'

/**
 * @category Utils/File
 *
 * 바이트를 특정 바이트 단위로 변환합니다.
 *
 * @param to - 변환할 바이트 단위
 * @param value - 변환할 값
 *
 * @returns 변환된 바이트 값
 *
 * @example
 * ```ts
 * byteTo('KB', 1024) // 1
 * byteTo('KB')(1024) // 1
 * ```
 */
export const byteTo: {
  (to: ByteUnit, value: number): number
  (to: ByteUnit): (value: number) => number
} = curry((to: ByteUnit, value: number) => {
  switch (to) {
    case 'B':
      return value
    case 'KB':
      return devide(value, 1024)
    case 'MB':
      return devide(value, 1024 ** 2)
    case 'GB':
      return devide(value, 1024 ** 3)
    case 'TB':
      return devide(value, 1024 ** 4)
    default:
      return value
  }
})
