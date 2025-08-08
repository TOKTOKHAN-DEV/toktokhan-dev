---
id: universal.arraytomap
title: ArrayToMap()
sidebar_label: ArrayToMap()
slug: /universal.arraytomap
---





배열을 Map으로 변환합니다. 각 요소는 지정된 키 선택기 함수를 통해 매핑됩니다.

 *

## Signature

```typescript
arrayToMap: <T, K>(keySelector: (data: T) => K, arr: T[]) => Map<K, T>
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

keySelector


</td><td>

(data: T) =&gt; K


</td><td>

배열 요소를 Map의 키로 변환하는 함수


</td></tr>
<tr><td>

arr


</td><td>

T[]


</td><td>

변환할 배열


</td></tr>
</tbody></table>

## Returns

Map&lt;K, T&gt;

배열의 각 요소를 Map으로 매핑한 결과

## Example


```ts
const arr = [
 { id: 1, name: 'Alice' },
 { id: 2, name: 'Bob' },
 { id: 3, name: 'Charlie' },
];

const map = arrayToMap((item) => item.id , arr);
// or
const map = arrayToMap((item) => item.id)(arr);
// or
const mapById = arrayToMap((item) => item.id);
const map = mapById(arr);

console.log(map)
// Map {
//   1 => { id: 1, name: 'Alice' },
//   2 => { id: 2, name: 'Bob' },
//   3 => { id: 3, name: 'Charlie' },
// }
```

