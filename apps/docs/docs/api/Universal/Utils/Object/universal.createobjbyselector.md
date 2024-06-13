---
id: universal.createobjbyselector
title: CreateObjBySelector()
sidebar_label: CreateObjBySelector()
slug: /universal.createobjbyselector
---





객체에서 선택된 속성을 기반으로 새로운 객체를 생성합니다. *

## Signature

```typescript
createObjBySelector: <T, M extends ObjSelectorMap<T> = ObjSelectorMap<T>>(mapper: M, prev: T) => ObjSelectorMapResult<T, M>
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

mapper


</td><td>

M


</td><td>

선택된 속성과 각 속성 값의 생성 함수로 이루어진 매핑 객체


</td></tr>
<tr><td>

prev


</td><td>

T


</td><td>

입력 객체


</td></tr>
</tbody></table>
## Returns

[ObjSelectorMapResult](./universal.objselectormapresult)&lt;T, M&gt;

선택된 속성을 기반으로 생성된 객체

## Example


```typescript
const data = { a: 1, b: 2, c: 3 };
const selectors = {
  sum: ({ a, b, c }) => a + b + c,
  product: ({ a, b, c }) => a * b * c,
};

const result = createObjBySelector(selectors, data);
const result = createObjBySelector(selectors)(data);

console.log(result); // { sum: 6, product: 6 }
```

