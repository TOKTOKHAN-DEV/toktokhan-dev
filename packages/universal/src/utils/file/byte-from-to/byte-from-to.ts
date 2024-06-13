import { CurriedFunction2 } from 'lodash'
import { curry, flow } from 'lodash/fp'

import { ByteUnit } from '../../../types/static/byte-unit'
import { pass } from '../../fn'
import { byteFrom } from '../byte-from'
import { byteTo } from '../byte-to'

/**
 * @category Utils/File
 *
 * 특정 바이트 단위를 다른 바이트 단위로 변환합니다.
 *
 * @param from - 변환할 바이트 단위
 * @param to - 변환될 바이트 단위
 * @param value - 변환할 값
 *
 * @returns 변환된 바이트 값
 *
 * @example
 * ```ts
 * const KbToB = byteFromTo('KB', 'B')
 * KbToB(1) // 1024
 *
 * const GBToMb = byteFromTo('gb', 'mb')
 * GBToMb(1) // 1024
 *
 * byteFromTo('KB', 'B', 1) // 1024
 * byteFromTo('KB')('B')(1) // 1024
 * ```
 */
export const byteFromTo: {
  (from: ByteUnit, to: ByteUnit, value: number): number
  (from: ByteUnit, to: ByteUnit): (value: number) => number
  (from: ByteUnit): CurriedFunction2<ByteUnit, number, number>
} = curry((from: ByteUnit, to: ByteUnit, value: number) =>
  flow(pass(value), byteFrom(from), byteTo(to))(),
)
