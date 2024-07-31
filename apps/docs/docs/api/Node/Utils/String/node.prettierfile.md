---
id: node.prettierfile
title: PrettierFile()
sidebar_label: PrettierFile()
slug: /node.prettierfile
---





주어진 파일의 내용을 prettier를 사용하여 서식을 맞춥니다.

## Signature

```typescript
declare function prettierFile(outputPath: string, options?: ExtendedPrettierOptions): Promise<void>;
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

outputPath


</td><td>

string


</td><td>

서식을 맞출 파일의 경로입니다.


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

Promise&lt;void&gt;

