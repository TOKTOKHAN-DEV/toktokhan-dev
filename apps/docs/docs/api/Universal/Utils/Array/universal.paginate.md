---
id: universal.paginate
title: Paginate()
sidebar_label: Paginate()
slug: /universal.paginate
---





배열을 특정 갯수로 나누어주는 함수입니다.

## Signature

```typescript
paginate: <T>(limit: number, arr: T[]) => T[][]
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

limit


</td><td>

number


</td><td>

배열을 나눌 갯수입니다.


</td></tr>
<tr><td>

arr


</td><td>

T[]


</td><td>

나눌 배열입니다.


</td></tr>
</tbody></table>
## Returns

T[][]

나누어진 배열을 반환합니다.

## Example


```ts
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const result = paginate(3, arr)

console.log(result)

// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ]
```

