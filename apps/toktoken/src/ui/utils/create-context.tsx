import {
  ReactNode,
  createContext as _createContext,
  useContext as _useContext,
} from 'react'

export type CreateContextReturn<T> = [
  React.Provider<T>,
  () => T,
  React.Context<T>,
]

export const createContext = <T,>(useHook: () => T) => {
  const context = _createContext({} as T)

  const useContext = () => _useContext(context)

  const Provider = ({ children, value }: { children: ReactNode; value: T }) => {
    const _value = useHook()
    return (
      <context.Provider value={value || _value}>{children}</context.Provider>
    )
  }

  return [Provider, useContext, context] as unknown as CreateContextReturn<T>
}
