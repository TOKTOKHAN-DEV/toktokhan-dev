import { ValueOf, pass } from '@toktokhan-dev/universal'

import { flow, map } from 'lodash/fp'

export const mapObj =
  <T, NewKey extends string | number | symbol, NewValue>(
    mapper: (entry: [key: keyof T, value: ValueOf<T>]) => [NewKey, NewValue],
  ) =>
  (obj: T): Record<NewKey, NewValue> =>
    flow(pass(obj), Object.entries, map(mapper as any), Object.fromEntries)()
