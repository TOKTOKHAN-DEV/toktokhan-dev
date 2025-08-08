---
id: universal.flatobject
title: FlatObject()
sidebar_label: FlatObject()
slug: /universal.flatobject
---





재귀적으로 중첩된 객체를 평탄화하는 함수입니다.

## Signature

```typescript
flatObject: <T extends RecursiveObj<any>, V = (T extends RecursiveObj<infer U> ? U : never)>(params: FlatObjectParams<T, V>, obj: T) => Record<string, V>
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

[FlatObjectParams](./universal.flatobjectparams)&lt;T, V&gt;


</td><td>

평탄화 작업에 필요한 매개변수


</td></tr>
<tr><td>

obj


</td><td>

T


</td><td>

평탄화할 객체


</td></tr>
</tbody></table>

## Returns

Record&lt;string, V&gt;

평탄화 작업을 수행하는 함수. 이 함수는 T 타입의 객체를 받아 평탄화된 객체를 반환합니다.

## Example 1


```typescript
const nestedObj = { a: { b: { c: 1 } } };
const flatObj = flatObject({}, nestedObj);
console.log(flatObj); // Outputs: { 'a.b.c': 1 }
```
또는 커링을 사용하여 함수를 반환할 수 있습니다.

## Example 2


```typescript
const flatten = flatObject({});
const nestedObj = { a: { b: { c: 1 } } };
const flatObj = flatten(nestedObj);
console.log(flatObj); // Outputs: { 'a.b.c': 1 }
```

