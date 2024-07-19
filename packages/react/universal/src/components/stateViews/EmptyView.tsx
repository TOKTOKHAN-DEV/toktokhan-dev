import { ReactNode } from 'react'

export interface EmptyViewProps {
  /**
   * 데이터가 존재할 때 렌더링될 UI 요소
   */
  children: ReactNode
  /**
   * 데이터가 비어 있을 때 렌더링될 UI 요소
   */
  fallback: ReactNode
  /**
   * 검사할 데이터 배열
   */
  data?: unknown[] | null
}

/**
 * `EmptyView` 컴포넌트는 데이터가 비어있는 경우 `fallback`을,
 * 데이터가 존재하는 경우 `children`을 렌더링합니다.
 *
 * @category Components
 * @returns 조건에 따라 `children` 또는 `fallback`을 렌더링합니다.
 * @example
 * ```tsx
 * import EmptyView from './components/StateViews/EmptyView';
 *
 * const MyComponent = ({ data }) => (
 *   <EmptyView data={data} fallback={<div>데이터가 없습니다.</div>}>
 *     <div>데이터가 존재합니다.</div>
 *   </EmptyView>
 * );
 * ```
 */
export const EmptyView = ({ children, data, fallback }: EmptyViewProps) => {
  if (data?.length) return <>{children}</>
  return <>{fallback}</>
}
