---
id: universal.prefix
title: Prefix()
sidebar_label: Prefix()
slug: /universal.prefix
---





문자열에 접두사를 추가합니다.

## Signature

```typescript
prefix: (pre: string, str: string) => string
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

pre


</td><td>

string


</td><td>

접두사로 사용될 문자열


</td></tr>
<tr><td>

str


</td><td>

string


</td><td>

접두사를 추가할 대상 문자열


</td></tr>
</tbody></table>
## Returns

string

접두사가 추가된 문자열

## Example


```typescript
const prefixedStr1 = prefix('pre-', 'string'); // 'pre-string'
console.log(prefixedStr1);

const prefixWithHello = prefix('Hello, '); // 부분 적용
const prefixedStr2 = prefixWithHello('world!'); // 'Hello, world!'
console.log(prefixedStr2);

const prefixedStr3 = prefix('1. ')('First item'); // '1. First item'
console.log(prefixedStr3);
```

