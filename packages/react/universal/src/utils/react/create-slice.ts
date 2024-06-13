import { Immutable, produce } from 'immer'

import { ActionsByMap, ReducerMap } from './types/reducer'

type CreateReducerParams<S, R extends ReducerMap<S, any>> = {
  initialState: S
  reducers: R
}

const NOTHING: unique symbol = Symbol.for('immer-nothing')

type ValidRecipeReturnType<State> =
  | State
  | void
  | undefined
  | (State extends undefined ? typeof NOTHING : never)

/**
 * @param
 * @category Utils/React
 */
export const createSlice = <S, R extends ReducerMap<S, any>>({
  initialState,
  reducers,
}: CreateReducerParams<S, R>) => {
  const reducer = produce((state: S, action: ActionsByMap<S, R>) => {
    const reducer = reducers[action.type]
    return reducer(state, action.payload)
  })
  return { initialState, reducer } as {
    initialState: S
    reducer: void | S extends ValidRecipeReturnType<S> ?
      (base: Immutable<S>, action: ActionsByMap<S, R>) => S
    : never
  }
}
