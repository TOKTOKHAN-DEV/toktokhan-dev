---
id: universal.volumeupobject
title: VolumeUpObject()
sidebar_label: VolumeUpObject()
slug: /universal.volumeupobject
---





객체의 key 에서 flag 를 찾아서 해당 flag 를 기준으로 중첩 객체를 만들어주는 함수입니다.

## Signature

```typescript
volumeUpObject: (flag: string, obj: Obj) => Obj
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

flag


</td><td>

string


</td><td>

object 생성 기준이 되는 flag 입니다.


</td></tr>
<tr><td>

obj


</td><td>

[Obj](./universal.obj)


</td><td>

flag 를 기준으로 중첩 객체를 만들 객체입니다.


</td></tr>
</tbody></table>

## Returns

[Obj](./universal.obj)

flag 를 기준으로 중첩 객체를 만들어 반환합니다.

## Example


```ts
const obj = {
 a: 1,
'b.a': 2,
'b.b': 3,
'c.a.a': 6,
}

const result = volumeUpObject('.', obj)

console.log(result)

// {
//   a: 1,
//   b: {
//     a: 3,
//     b: 4,
//   },
//   c: {
//     a: {
//       a: 6,
//     },
//   },
// }
```

