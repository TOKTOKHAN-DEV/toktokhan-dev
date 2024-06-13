---
id: universal.multiply
title: Multiply()
sidebar_label: Multiply()
slug: /universal.multiply
---





두개의 숫자를 곱합니다. 부정확 할 수 있는 부동 소수점 연산을 보정합니다.

## Signature

```typescript
multiply: (a: number, b: number) => number
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

a


</td><td>

number


</td><td>

첫번째 숫자


</td></tr>
<tr><td>

b


</td><td>

number


</td><td>

두번째 숫자


</td></tr>
</tbody></table>
## Returns

number

두 숫자를 곱한 결과

## Example


```ts
multiply(0.1, 0.2) // 0.02
multiply(0.1)(0.2) // 0.02
```

