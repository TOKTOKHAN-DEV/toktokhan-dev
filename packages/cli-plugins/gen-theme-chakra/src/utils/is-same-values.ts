import { Obj } from '@toktokhan-dev/universal'

import { values } from 'lodash/fp'

/**
 * 객체의 값들이 모두 같은지 확인합니다.
 */
export const isSameValues = (obj: Obj) => {
  const vals = values(obj)
  return vals.every((v) => v === vals[0])
}
