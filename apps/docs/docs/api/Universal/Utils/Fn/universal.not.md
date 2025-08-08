---
id: universal.not
title: Not()
sidebar_label: Not()
slug: /universal.not
---





주어진 함수의 부정값을 반환합니다. 주어진 함수를 실행하고 그 결과를 부정하여 반환합니다.

## Signature

```typescript
not: <T extends (...params: any[]) => any>(fn: T) => (...args: Parameters<T>) => boolean
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

fn


</td><td>

T


</td><td>

부정할 함수


</td></tr>
</tbody></table>

## Returns

(...args: Parameters&lt;T&gt;) =&gt; boolean

주어진 함수의 부정값을 반환합니다.

## Example


```ts
const isPositive = (x: number) => x > 0;
const isNegative = not(isPositive);

isNegative(5); // false - isPositive(5)의 부정값이므로 false를 반환합니다.
isNegative(-5); // true - isPositive(-5)의 부정값이므로 true를 반환합니다.
```

