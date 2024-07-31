---
id: node.getfilepaths
title: GetFilePaths()
sidebar_label: GetFilePaths()
slug: /node.getfilepaths
---





주어진 파일 경로의 모든 하위 경로를 반환합니다.

## Signature

```typescript
getFilePaths: (path: string) => Promise<string[]>
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

path


</td><td>

string


</td><td>

파일 경로. 이 경로의 모든 하위 경로가 반환됩니다.


</td></tr>
</tbody></table>
## Returns

Promise&lt;string[]&gt;

## Example


```typescript
const paths = await getFilePaths('./src');
console.log(paths); // ['./src/index.ts', './src/utils.ts', ...]
```

