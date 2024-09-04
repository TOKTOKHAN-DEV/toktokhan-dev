import { ComponentType, ReactNode } from 'react'

import { createContext, useContextSelector } from 'use-context-selector'

import { PropsOf } from '../../types'

export type CreateContextSelectorReturn<T, P> = {
  useContext: <Selected>(selector: (value: T) => Selected) => Selected
  Provider: ({
    children,
    params,
  }: {
    children: ReactNode
    params?: P
  }) => JSX.Element
  withProvider: <C extends ComponentType<any>>(
    Component: C,
    params?: P,
  ) => (props: PropsOf<C>) => JSX.Element
}

/**
 * @category Utils/React
 * 커스텀 훅을 기반으로 컨텍스트와 관련된 유틸리티를 생성하는 함수입니다.
 * 이 함수는 주어진 훅을 컨텍스트로 감싸는 `Provider`, `useContext` 훅,
 * 그리고 컴포넌트를 컨텍스트로 감싸는 `withProvider` HOC를 반환합니다.
 *
 * @template T - 컨텍스트에서 사용할 데이터 타입
 * @template P - 훅의 파라미터 타입
 * @param useHook - 컨텍스트에서 사용할 커스텀 훅
 * @param initialProps - `useHook`에 전달될 초기 파라미터 (선택적)
 * @returns `{ useContext, Provider, withProvider }` - 생성된 컨텍스트 유틸리티들
 *
 * @example
 * ```tsx
 * // 커스텀 훅 정의
 * const useTimer = ({ timeLimit = 1000 }: { timeLimit?: number }) => {
 *   const [time, setTime] = useState(timeLimit);
 *   // 타이머 로직...
 *   return { time, start: () => { //타이머 시작 }};
 * };
 *
 * // createContextSelector로 컨텍스트 유틸리티 생성
 * const { Provider: TimerProvider, useContext: useTimerContext } = createContextSelector(useTimer);
 *
 * // 타이머를 표시하는 컴포넌트
 * const TimerDisplay = () => {
 *   const time = useTimerContext(ctx => ctx.time);
 *   return <div>Time: {time}</div>;
 * };
 *
 * // 방법 1. TimerProvider로 감싸기
 * const App = () => (
 *   <TimerProvider params={{timeLimit: 1000}}>
 *     <TimerDisplay />
 *   </TimerProvider>
 * );
 *
 * // 방법 2. withProvider로 컴포넌트 감싸기
 * const App = () => (
 *     <TimerDisplay />
 * );
 * export default withTimerProvider(App, { timeLimit: 1000 });
 * ```
 *
 */

export const createContextSelector = <T, P = undefined>(
  useHook: (param?: P) => T,
  initialProps?: P,
): CreateContextSelectorReturn<T, P> => {
  const context = createContext({} as T)

  const useContext = <Selected,>(selector: (value: T) => Selected) =>
    useContextSelector<T, Selected>(context, selector)

  const Provider = ({
    children,
    params,
  }: {
    children: ReactNode
    params?: P
  }) => {
    const value = useHook(params || initialProps)
    return <context.Provider value={value}>{children}</context.Provider>
  }

  const withProvider =
    <C extends ComponentType<any>>(Component: C, params?: P) =>
    // eslint-disable-next-line react/display-name
    (props: PropsOf<C>) => {
      return (
        <Provider params={params || initialProps}>
          <Component {...props} />
        </Provider>
      )
    }

  return { useContext, Provider, withProvider }
}
