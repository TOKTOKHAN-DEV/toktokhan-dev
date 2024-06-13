---
id: universal.bytefromto
title: ByteFromTo()
sidebar_label: ByteFromTo()
slug: /universal.bytefromto
---





특정 바이트 단위를 다른 바이트 단위로 변환합니다.

## Signature

```typescript
byteFromTo: (from: ByteUnit, to: ByteUnit, value: number) => number
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

to


</td><td>

[ByteUnit](./universal.byteunit)


</td><td>

변환될 바이트 단위


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
const KbToB = byteFromTo('KB', 'B')
KbToB(1) // 1024

const GBToMb = byteFromTo('gb', 'mb')
GBToMb(1) // 1024

byteFromTo('KB', 'B', 1) // 1024
byteFromTo('KB')('B')(1) // 1024
```

