---
id: universal.suffix
title: Suffix()
sidebar_label: Suffix()
slug: /universal.suffix
---





문자열에 접미사를 추가합니다.

## Signature

```typescript
suffix: (suf: string, str: string) => string
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

suf


</td><td>

string


</td><td>

접미사로 사용될 문자열


</td></tr>
<tr><td>

str


</td><td>

string


</td><td>

접미사를 추가할 대상 문자열


</td></tr>
</tbody></table>

## Returns

string

접미사가 추가된 문자열

## Example


```typescript
const suffixedStr1 = suffix('-post', 'string'); // 'string-post'
console.log(suffixedStr1);

const suffixWithDot = suffix('.'); // 부분 적용
const suffixedStr2 = suffixWithDot('extension'); // 'extension.'
console.log(suffixedStr2);

const suffixedStr3 = suffix('!', 'Hello'); // 'Hello!'
console.log(suffixedStr3);
```

