import { useContext as _useContenxt, createContext, useRef } from 'react'

import { StateCreator, StoreApi, createStore, useStore } from 'zustand'

export const createStoreContext = <T,>(initializer: StateCreator<T>) => {
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
