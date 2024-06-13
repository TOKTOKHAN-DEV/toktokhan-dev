---
id: universal.byteto
title: ByteTo()
sidebar_label: ByteTo()
slug: /universal.byteto
---





바이트를 특정 바이트 단위로 변환합니다.

## Signature

```typescript
byteTo: (to: ByteUnit, value: number) => number
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

to


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
byteTo('KB', 1024) // 1
byteTo('KB')(1024) // 1
```

