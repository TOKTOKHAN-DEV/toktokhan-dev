---
id: universal.removeemptyobject
title: RemoveEmptyObject()
sidebar_label: RemoveEmptyObject()
slug: /universal.removeemptyobject
---





주어진 객체에서 빈 객체를 제거하는 함수입니다.

## Signature

```typescript
removeEmptyObject: <T extends Record<any, any>>(obj: T) => T
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

obj


</td><td>

T


</td><td>

빈 객체를 제거할 대상 객체


</td></tr>
</tbody></table>

## Returns

T

빈 객체가 제거된 새로운 객체

## Example


```typescript
const obj = { a: { b: {} }, c: 1 };
const result = removeEmptyObject(obj);
console.log(result); // Outputs: { c: 1 }
```

