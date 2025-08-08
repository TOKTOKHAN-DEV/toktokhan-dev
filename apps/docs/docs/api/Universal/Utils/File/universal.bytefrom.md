---
id: universal.bytefrom
title: ByteFrom()
sidebar_label: ByteFrom()
slug: /universal.bytefrom
---





특정 바이트 단위를 바이트로 변환합니다.

## Signature

```typescript
byteFrom: (from: ByteUnit, value: number) => number
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

from


</td><td>

[ByteUnit](./universal.byteunit)


</td><td>

변환할 바이트 단위


</td></tr>
<tr><td>

value


</td><td>

number


</td><td>

변환할 값


</td></tr>
</tbody></table>

## Returns

number

변환된 바이트 값

## Example


```ts
byteFrom('KB', 1) // 1024
byteFrom('KB')(1) // 1024
```

