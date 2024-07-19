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

export type WithSetter<T extends Obj> = T & {
  set: Setter<T>
  reset: Resetter<T>
}

export const withSetter =
  <
    T extends Obj,
    Mps extends [StoreMutatorIdentifier, unknown][] = [],
    Mcs extends [StoreMutatorIdentifier, unknown][] = [],
  >(
    initializer: StateCreator<T, Mps, Mcs>,
  ): StateCreator<WithSetter<T>, Mps, Mcs> =>
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
