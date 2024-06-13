---
id: universal.asyncfnreturn
title: AsyncFnReturn
sidebar_label: AsyncFnReturn
slug: /universal.asyncfnreturn
---





비동기 함수의 반환값 타입을 추출합니다.

## Signature

```typescript
type AsyncFnReturn<T extends AsyncFn> = Awaited<ReturnType<T>>;
```
## References
 [AsyncFn](./universal.asyncfn)

## Example


```tsx
type Example = AsyncFnReturn<() => Promise<number>>;
// type Example = number
```

