---
id: universal.indices
title: Indices
sidebar_label: Indices
slug: /universal.indices
---





배열의 인덱스 타입을 추출하는 타입을 정의합니다.

## Signature

```typescript
type Indices<T extends readonly any[]> = Extract<keyof T, `${number}`> extends never ? number : Extract<keyof T, `${number}`>;
```

## Example


```typescript
// 배열의 인덱스 타입 추출
type Index = Indices<[string, number, boolean]>;
// type Index = 0 | 1 | 2
```

