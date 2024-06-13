---
id: universal.getdecimalplaces
title: GetDecimalPlaces()
sidebar_label: GetDecimalPlaces()
slug: /universal.getdecimalplaces
---





숫자들의 소수점 자리수중 가장 긴 소수점 자리의 길이를 구합니다.

## Signature

```typescript
getDecimalPlaces: (...numnbers: number[]) => number
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

numnbers


</td><td>

number[]


</td><td>

소수점 자리수를 구할 숫자들


</td></tr>
</tbody></table>
## Returns

number

소수점 자리수

## Example

```ts getDecimalPlaces(0.1, 0.2) // 1 getDecimalPlaces(0.1, 0.02, 0.3) // 2 getDecimalPlaces(0.1, 0.2, 0.333, 0.4) // 3

