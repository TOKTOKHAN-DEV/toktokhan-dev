---
id: universal.fn
title: Fn
sidebar_label: Fn
slug: /universal.fn
---





함수의 타입을 정의합니다.

## Signature

```typescript
type Fn<P extends any[] = any[], R = any> = (...params: P) => R;
```

## Example


```typescript
// 함수의 타입 정의
type AddFn = Fn<[x: number, y: number], number>;

// 함수의 사용 예시
const add: AddFn = (x, y) => x + y;
```

