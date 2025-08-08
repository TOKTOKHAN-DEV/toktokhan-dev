---
id: universal.subtract
title: Subtract()
sidebar_label: Subtract()
slug: /universal.subtract
---





두개의 숫자를 뺍니다. 부정확 할 수 있는 부동 소수점 연산을 보정합니다.

## Signature

```typescript
subtract: (a: number, b: number) => number
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

두 숫자를 뺀 결과

## Example


```ts
subtract(0.3, 0.1) // 0.2
subtract(0.3)(0.1) // 0.2
```

