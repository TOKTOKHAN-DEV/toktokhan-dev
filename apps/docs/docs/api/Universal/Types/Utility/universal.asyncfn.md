---
id: universal.asyncfn
title: AsyncFn
sidebar_label: AsyncFn
slug: /universal.asyncfn
---





비동기 함수의 타입을 정의합니다.

## Signature

```typescript
type AsyncFn<P extends any[] = any[], R = any> = Fn<P, Promise<R>>;
```
## References
 [Fn](./universal.fn)

## Example


```typescript
// 비동기 함수의 타입 정의
type FetchData = AsyncFn<[url: string], string>;

// 비동기 함수의 사용 예시
const fetchData: FetchData = async (url) => {
  const response = await fetch(url);
  return response.text();
};
```

