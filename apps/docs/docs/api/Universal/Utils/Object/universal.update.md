---
id: universal.update
title: Update()
sidebar_label: Update()
slug: /universal.update
---





객체의 지정된 깊은 위치에 값을 설정하거나 업데이트합니다.

## Signature

```typescript
update: <T extends Obj | Array<any>, K extends DeepKeyOf<T> = DeepKeyOf<T>>(key: K, value: DataOrSetterFn<DeepValueOf<T, K>, T>, obj: T) => T
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

key


</td><td>

K


</td><td>

설정 또는 업데이트할 속성의 깊은 경로를 나타내는 키


</td></tr>
<tr><td>

value


</td><td>

[DataOrSetterFn](./universal.dataorsetterfn)&lt;[DeepValueOf](./universal.deepvalueof)&lt;T, K&gt;, T&gt;


</td><td>

설정할 값 또는 값을 반환하는 함수


</td></tr>
<tr><td>

obj


</td><td>

T


</td><td>

값을 설정 또는 업데이트할 객체


</td></tr>
</tbody></table>
## Returns

T

값을 설정 또는 업데이트한 객체

## Example


```typescript
const data = { nested: { prop: 42 } };

// 객체의 깊은 경로에 값을 설정
const updated1 = set('nested.prop', 100, data); // { nested: { prop: 100 } }

// 함수를 사용하여 값을 설정
const updated2 = set('nested.prop', (prev) => prev + 1, data); // { nested: { prop: 43 } }

// 원본 객체의 다른 값을 참조하여 값을 설정
const updated3 = set('nested.prop', (prev, obj) => prev + obj.nested.prop, data); // { nested: { prop: 84 } }

// 함수를 부분 적용하여 사용
const updater = set('nested.prop');
const updated4 = updater(200)(data); // { nested: { prop: 200 } }
```

