import { ComponentType, ReactNode } from 'react'

import { createContext, useContextSelector } from 'use-context-selector'

import { PropsOf } from '../../types'

export type CreateContextSelectorReturn<T> = {
  useContext: <Selected>(selector: (value: T) => Selected) => Selected
  Provider: ({ children }: { children: ReactNode }) => JSX.Element
  withProvider: <C extends ComponentType<any>>(
    Component: C,
  ) => (props: PropsOf<C>) => JSX.Element
}

export const createContextSelector = <T,>(
  useHook: () => T,
): CreateContextSelectorReturn<T> => {
  const context = createContext({} as T)

  const useContext = <Selected,>(selector: (value: T) => Selected) =>
    useContextSelector<T, Selected>(context, selector)

  const Provider = ({ children }: { children: ReactNode }) => {
    const value = useHook()
    return <context.Provider value={value}>{children}</context.Provider>
  }

  const withProvider =
    <C extends ComponentType<any>>(Component: C) =>
    // eslint-disable-next-line react/display-name
    (props: PropsOf<C>) => {
      return (
        <Provider>
          <Component {...props} />
        </Provider>
      )
    }

  return { useContext, Provider, withProvider }
}
