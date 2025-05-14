---
id: universal.parameter
title: Parameter
sidebar_label: Parameter
slug: /universal.parameter
---





함수의 첫번째 인자 타입을 가져옵니다.

## Signature

```typescript
type Parameter<T> = T extends ((param: infer U) => any) ? U : never;
```

## Example


```tsx
type Example = Parameter<(value: number) => void>
// type Example = number
```

