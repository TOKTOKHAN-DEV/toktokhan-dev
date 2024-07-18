import { ReactNode } from 'react'

export interface LoadingViewProps {
  /**
   * 로딩이 완료되었을 때 렌더링될 UI 요소
   */
  children: ReactNode
  /**
   * 로딩 중일 때 렌더링될 UI 요소
   */
  fallback: ReactNode
  /**
   * 로딩 상태를 나타내는 boolean 값
   */
  isLoading?: boolean
}

/**
 * `LoadingView` 컴포넌트는 로딩 상태를 처리하여 로딩 중일 때는 `fallback`을,
 * 로딩이 완료되었을 때는 `children`을 렌더링합니다.
 *
 * @category Components
 * @returns 조건에 따라 `children` 또는 `fallback`을 렌더링합니다.
 * @example
 * ```tsx
 * import LoadingView from './components/StateViews/LoadingView';
 *
 * const MyComponent = ({ isLoading }) => (
 *   <LoadingView isLoading={isLoading} fallback={<div>로딩 중...</div>}>
 *     <div>로딩이 완료되었습니다.</div>
 *   </LoadingView>
 * );
 * ```
 */

export const LoadingView = ({
  children,
  isLoading,
  fallback,
}: LoadingViewProps) => {
  if (isLoading) return <>{fallback}</>
  return <>{children}</>
}

export default LoadingView
