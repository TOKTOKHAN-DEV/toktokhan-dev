---
id: react-universal.propsof
title: PropsOf
sidebar_label: PropsOf
slug: /react-universal.propsof
---





주어진 컴포넌트의 props 타입을 추론하는 유틸리티 타입입니다. *  T - props 타입을 추론할 컴포넌트.

## Signature

```typescript
type PropsOf<T> = T extends ComponentType<infer P> | Component<infer P> ? P : never;
```

## Example


```tsx
type Example = ComponentProps<(props: { number: number }) => JSX.Element>;
Example === { number : number }
```

