import {
  ComponentType,
  FunctionComponent,
  ReactNode,
  useContext as _useContenxt,
  createContext,
  useRef,
} from 'react'

import { StateCreator, StoreApi, createStore, useStore } from 'zustand'

export interface CreateStoreContextReturn<T> {
  Provider: FunctionComponent<{
    children: ReactNode
    initial?: Partial<T>
  }>
  useContext: <Selected>(selector: (store: T) => Selected) => Selected
  withProvider: <P extends object>(
    Component: ComponentType<P>,
    initial?: Partial<T>,
  ) => FunctionComponent<P>
}

/**
 * @category Store
 *
 * zustand 와 함께 사용할 수 있는 `createStoreContext` 함수를 제공합니다. 지역적인 상태를 zustand 로 관리할 수 있습니다.
 *
 * @example
 * ```tsx
 * import { createStoreContext } from '@toktokhan-dev/zustand-create-store-context'
 *
 * const {
 *   Provider: CountProvider,
 *   useContext: useCountContext,
 *   withProvider: withCountProvider,
 * } = createStoreContext((set, get, store) => ({
 *   count: 0,
 *   setCount: (count: number) =>
 *     set(() => {
 *       count
 *     }),
 * }))
 *
 *const Component = () => {
 *  const count = useCountContext((store) => store.count)
 *  const setCount = useCountContext((store) => store.setCount)
 *
 *  return (
 *    <div>
 *      <button onClick={() => setCount(count + 1)}>+</button>
 *      <span>{count}</span>
 *    </div>
 *  )
 * }
 *
 *  const Component2 = withProvider(Component)
 *
 * const App = () => {
 *   return (
 *     <>
 *       <CountProvider>
 *         <Component />
 *       </CountProvider>
 *
 *      <Component2 />
 *
 *      <CountProvider initialState={{ count: 10 }}>
 *        <Component />
 *      </CountProvider>
 *
 *       {withCountProvider(Component, { count: 10 })}
 *     </>
 *   )
 * }
 * ```
 *
 */
export const createStoreContext = <T,>(
  initializer: StateCreator<T>,
): CreateStoreContextReturn<T> => {
  const storeContext = createContext<StoreApi<T> | null>(null)

  const useContext = <Selected,>(selector: (store: T) => Selected) => {
    const store = _useContenxt(storeContext)
    if (!store) {
      throw new Error('missing Store Provider')
    }
    return useStore(store, selector)
  }

  const Provider = ({
    children,
    initial,
  }: {
    children: React.ReactNode
    initial?: Partial<T>
  }) => {
    const storeRef = useRef<StoreApi<T>>()
    if (!storeRef.current) {
      storeRef.current = createStore<T>(
        initial ?
          (set, get, store) => {
            return { ...initializer(set, get, store), ...initial }
          }
        : initializer,
      )
    }

    return (
      <storeContext.Provider value={storeRef.current}>
        {children}
      </storeContext.Provider>
    )
  }

  const withProvider = <P extends object>(
    Component: React.ComponentType<P>,
    initial?: Partial<T>,
  ) => {
    const Wrapped = (props: P) => (
      <Provider initial={initial}>
        <Component {...props} />
      </Provider>
    )

    return Wrapped
  }

  return { Provider, useContext, withProvider }
}
