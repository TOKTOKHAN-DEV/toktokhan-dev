import { Component, ComponentType } from 'react'

/**
 * 주어진 컴포넌트의 props 타입을 추론하는 유틸리티 타입입니다.
 * @category Types/Utility
 *
 * @template T - props 타입을 추론할 컴포넌트.
 * @returns `T`가 `ComponentType` 또는 `Component`를 확장하는 경우 추론된 props 타입, 그렇지 않은 경우 `never`.
 *
 * @example
 * ```tsx
 * type Example = ComponentProps<(props: { number: number }) => JSX.Element>;
 * Example === { number : number }
 * ```
 */
export type PropsOf<T> =
  T extends ComponentType<infer P> | Component<infer P> ? P : never
