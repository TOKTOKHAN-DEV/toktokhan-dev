---
id: node.readfilesync
title: ReadFileSync()
sidebar_label: ReadFileSync()
slug: /node.readfilesync
---





동기적으로 파일을 읽어오는 함수입니다.

## Signature

```typescript
readFileSync: (encoding: BufferEncoding, path: string) => string
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

encoding


</td><td>

BufferEncoding


</td><td>

파일의 인코딩 유형


</td></tr>
<tr><td>

path


</td><td>

string


</td><td>

읽을 파일의 경로


</td></tr>
</tbody></table>

## Returns

string

파일의 내용을 문자열로 반환합니다.

## Example


```typescript
// 파일을 동기적으로 읽어오는 예시
const content = readFileSync('utf-8', 'example.txt');
const content = readFileSync('utf-8')('example.txt');

```

