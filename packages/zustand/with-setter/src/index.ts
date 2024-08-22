import {
  DataOrFn,
  DeepKeyOf,
  DeepValueOf,
  Obj,
  get,
  runIfFn,
  update,
} from '@toktokhan-dev/universal'

import { cloneDeep } from 'lodash'
import { StateCreator, StoreMutatorIdentifier } from 'zustand'

/**
 *
 * Zustand 스토어에 `set` 및 `reset` 함수를 추가하여 상태를 더욱 쉽게 업데이트하고 초기화할 수 있도록 도와주는 유틸리티 패키지입니다.
 *
 * @packageDocumentation
 */

export type SetFn<T extends Obj> = (prev: T) => Partial<T>
export type SetArg<T extends Obj> = Partial<T> | SetFn<T>
export type ResetArg<T extends Obj> = DeepKeyOf<T> | Partial<T> | SetFn<T>

export type Setter<Data extends Obj> = {
  (state: SetArg<Data>): void
  <K extends DeepKeyOf<Data>>(
    key: K,
    value: DataOrFn<DeepValueOf<Data, `${K}`>>,
  ): void
}

export type Resetter<Data extends Obj> = (initial?: ResetArg<Data>) => void

export type IWithSetter<T extends Obj> = T & {
  set: Setter<T>
  reset: Resetter<T>
}

/**
 * @category Middleware
 *
 * zustand 와 함께 사용할 수 있는 set 함수, reset 함수를 제공합니다.
 * 기존의 간단한 set 함수도 직접 정의를 해야하는 불편함을 해소하기 위해 만들어졌습니다.
 * zustand create, createStore 에서 middleware 로 사용할 수 있습니다.
 *
 * @example
 * ```ts
 * import { withSetter } from '@toktokhan-dev/zustand-with-setter'
 *
 * import { create } from 'zustand'
 *
 * type Store = {
 *   count: number
 *   nested: {
 *     count: number
 *   }
 * }
 *
 * const useStore = create(
 *   withSetter<Store>(() => ({
 *     count: 0,
 *     nested: {
 *       count: 0,
 *     },
 *   })),
 * )
 *
 * const set = useStore((store) => store.set)
 *
 * set({ count: 5, nested: { count: 5 } })
 * set((prev) => ({ count: prev.count + 1 }))
 *
 * set('count', 5)
 * set('count', (prev) => prev + 1)
 * set('nested.count', 5)
 * set('nested.count', (prev) => prev + 1)
 *
 * const reset = useStore((store) => store.reset)
 * reset()
 * reset('count')
 * reset({ count: 5 })
 * ```
 */
export const withSetter =
  <
    T extends Obj,
    Mps extends [StoreMutatorIdentifier, unknown][] = [],
    Mcs extends [StoreMutatorIdentifier, unknown][] = [],
  >(
    initializer: StateCreator<T, Mps, Mcs>,
  ): StateCreator<IWithSetter<T>, Mps, Mcs> =>
  (setState, getState, store) => {
    const initial = initializer(setState as any, getState as any, store)

    const setter: Setter<T> = (
      keyOrState: string | SetArg<T>,
      value?: unknown,
    ) => {
      if (typeof keyOrState === 'string') {
        const key = keyOrState
        return setState(update<any, any>(key, value))
      }

      const state = keyOrState
      setState((prev) => ({ ...prev, ...runIfFn(state, prev) }))
    }

    const reset: Resetter<T> = (state) => {
      const updated = cloneDeep(initial)

      if (typeof state === 'string') {
        const key = state
        const fieldInitial = get(key, initial)
        setState(update<any, any>(key, fieldInitial))
        return
      }

      setState((() => {
        if (typeof state === 'undefined') return updated
        const next = runIfFn(state, updated)

        return { ...updated, ...(next as Partial<T>) }
      }) as any)
    }

    return {
      ...initial,
      set: setter,
      reset: reset,
    }
  }
