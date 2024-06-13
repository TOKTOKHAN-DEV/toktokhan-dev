---
id: universal.itemof
title: ItemOf
sidebar_label: ItemOf
slug: /universal.itemof
---





배열 또는 읽기 전용 배열의 요소 타입을 추출하는 타입을 정의합니다.

## Signature

```typescript
type ItemOf<T extends Array<any> | readonly any[]> = T[number];
```

## Example


```typescript
// 배열의 요소 타입 추출
type Element = ItemOf<[string, number, boolean]>;
// type Element = string | number | boolean
```

