---
id: universal.isoversize
title: IsOverSize()
sidebar_label: IsOverSize()
slug: /universal.isoversize
---





 Utils/File 주어진 파일 크기가 최대 크기를 초과하는지 확인하는 함수입니다.

## Signature

```typescript
isOverSize: (maxSize: [value: number, unit: ByteUnit], value: number | [value: number, unit: ByteUnit]) => boolean
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

maxSize


</td><td>

[value: number, unit: [ByteUnit](./universal.byteunit)]


</td><td>

파일의 최대 크기


</td></tr>
<tr><td>

value


</td><td>

number \| [value: number, unit: [ByteUnit](./universal.byteunit)]


</td><td>

검사할 값. 바이트 단위의 숫자 또는 크기와 단위를 포함하는 배열


</td></tr>
</tbody></table>

## Returns

boolean

값이 최대 크기를 초과하면 true, 그렇지 않으면 false

## Example


```ts
// 값이 500바이트인 경우
isOverSize([1000, 'B'], 500); // false

// 커링 사용 예
const isOver1MB = isOverSize([1, 'MB']);
isOver1MB(500000); // true
```

