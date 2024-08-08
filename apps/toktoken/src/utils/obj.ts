import { ValueOf, awaited, pass } from '@toktokhan-dev/universal'

import { flow, map } from 'lodash/fp'

export const mapObjAsPromise =
  <T, NewKey extends string | number | symbol, NewValue>(
    mapper: (
      entry: [key: keyof T, value: ValueOf<T>],
    ) => PromiseLike<[NewKey, NewValue]> | [NewKey, NewValue],
  ) =>
  (obj: T): Promise<Record<NewKey, NewValue>> =>
    flow(
      pass(obj),
      Object.entries,
      map(mapper),
      (v) => Promise.all(v),
      awaited(Object.fromEntries),
    )()

export const mapValuesAsPromise =
  <T, New>(mapper: (value: ValueOf<T>) => PromiseLike<New>) =>
  (obj: T): Promise<Record<keyof T, New>> =>
    mapObjAsPromise<T, keyof T, New>(async ([key, value]) => [
      key,
      await mapper(value),
    ])(obj)
