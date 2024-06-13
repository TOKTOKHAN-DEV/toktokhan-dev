---
id: node.prettierstring
title: PrettierString()
sidebar_label: PrettierString()
slug: /node.prettierstring
---





주어진 문자열을 prettier를 사용하여 서식을 맞춥니다.

## Signature

```typescript
declare function prettierString(string: string, options?: ExtendedPrettierOptions): Promise<string>;
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

string


</td><td>

string


</td><td>

서식을 맞출 문자열입니다.


</td></tr>
<tr><td>

options


</td><td>

[ExtendedPrettierOptions](./node.extendedprettieroptions)


</td><td>

_(Optional)_ prettier의 옵션입니다.


</td></tr>
</tbody></table>
## Returns

Promise&lt;string&gt;

서식을 맞춘 결과를 반환합니다.

