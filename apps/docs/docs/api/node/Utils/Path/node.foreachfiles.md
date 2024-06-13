---
id: node.foreachfiles
title: ForEachFiles()
sidebar_label: ForEachFiles()
slug: /node.foreachfiles
---





주어진 디렉터리 내의 모든 파일 및 디렉터리에 대해 지정된 작업을 수행하는 함수입니다.

## Signature

```typescript
forEachFiles: (param: {
  each: (file: fs.Dirent) => void;
  recursive?: boolean;
  filter?: (file: fs.Dirent) => boolean;
}, TPath: string) => void
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

param


</td><td>

\{ each: (file: fs.Dirent) =&gt; void; recursive?: boolean; filter?: (file: fs.Dirent) =&gt; boolean; \}


</td><td>

각 파일 또는 디렉터리에 대해 실행할 작업과 설정


</td></tr>
<tr><td>

TPath


</td><td>

string


</td><td>

작업을 수행할 디렉터리의 경로


</td></tr>
</tbody></table>
## Returns

void

## Example


```typescript
// 주어진 디렉터리 내의 모든 파일 및 디렉터리에 대해 작업을 수행하는 예시
forEachFiles({
  each: (file) => console.log(file.name),
  recursive: true,
  filter: (file) => file.isDirectory(),
}, 'src');
```

