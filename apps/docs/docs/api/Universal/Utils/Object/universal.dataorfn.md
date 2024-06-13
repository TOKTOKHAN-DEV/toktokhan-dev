---
id: universal.dataorfn
title: DataOrFn
sidebar_label: DataOrFn
slug: /universal.dataorfn
---





데이터 또는 함수를 나타내는 타입입니다.

## Signature

```typescript
type DataOrFn$1<T> = T | ((prev: T) => T);
```

## Example


```tsx
const data: DataOrFn<number> = 42; // 데이터
const fn: DataOrFn<number> = (prev) => prev + 1; // 함수
```

