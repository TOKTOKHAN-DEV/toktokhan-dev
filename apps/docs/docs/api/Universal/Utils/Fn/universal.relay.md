---
id: universal.relay
title: Relay()
sidebar_label: Relay()
slug: /universal.relay
---





인자로 넘겨준 getNext 함수를 연속적으로 호출하여 데이터를 가져오는 함수입니다. 호출된 데이터를 순서대로 배열로 반환합니다.

주로 pagination 된 데이터의 모든 페이지를 가져오는데 사용됩니다.

## Signature

```typescript
relay: <Data, NextParam, Selected = Data[]>(params: RelayParams<Data, NextParam, Selected>) => Promise<Selected>
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

params


</td><td>

[RelayParams](./universal.relayparams)&lt;Data, NextParam, Selected&gt;


</td><td>


</td></tr>
</tbody></table>
## Returns

Promise&lt;Selected&gt;

## Example


```ts
const list = range(0, 100)

const getList = async (params: { offset: number; limit: number }) => {
const { offset, limit } = params
const next = offset + limit

return {
 total: list.length,
 next: list.length - 1 < next ? null : next,
 data: list.slice(offset, offset + limit),
}

const result = await relay({
 initialParam: 0,
 getNext: (nextParam: number) => getList({ offset: nextParam, limit: 10 }),
 getNextParams: (last) => {
   return last?.next
},

console.log(result)

// [
//   { total: 100, next: 10, data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
//   { total: 100, next: 20, data: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19] },
//   { total: 100, next: 30, data: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29] },
//   ...
//   { total: 100, next: null, data: [90, 91, 92, 93, 94, 95, 96, 97, 98, 99] },
// ]


```

