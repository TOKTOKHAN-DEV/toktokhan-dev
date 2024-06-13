---
id: universal.removestr
title: RemoveStr()
sidebar_label: RemoveStr()
slug: /universal.removestr
---





문자열에서 지정된 문자열을 제거합니다.

## Signature

```typescript
removeStr: (str: string | RegExp, s: string) => string
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

str


</td><td>

string \| RegExp


</td><td>

제거할 문자열


</td></tr>
<tr><td>

s


</td><td>

string


</td><td>

대상 문자열


</td></tr>
</tbody></table>
## Returns

string

지정된 문자열이 제거된 결과 문자열

## Example


```typescript
const removedStr1 = removeStr('a', 'banana'); // 'bnn'
console.log(removedStr1);

const removeA = removeStr('a'); // 부분 적용
const removedStr2 = removeA('apple'); // 'pple'
console.log(removedStr2);

const removedStr3 = removeStr(' ', 'hello world'); // 'helloworld'
console.log(removedStr3);
```

