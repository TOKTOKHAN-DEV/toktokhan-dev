---
id: node.findfiletobottom
title: FindFileToBottom()
sidebar_label: FindFileToBottom()
slug: /node.findfiletobottom
---





주어진 디렉터리부터 하위 디렉터리까지 파일을 검색하여 해당 파일의 경로를 반환하는 함수입니다.

## Signature

```typescript
findFileToBottom: (dir: string, filename: string) => string | null
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

dir


</td><td>

string


</td><td>

검색을 시작할 디렉터리의 경로


</td></tr>
<tr><td>

filename


</td><td>

string


</td><td>

검색할 파일의 이름


</td></tr>
</tbody></table>

## Returns

string \| null

해당 파일의 경로, 찾지 못한 경우 null 반환

## Example


```typescript
// 주어진 디렉터리부터 하위 디렉터리까지 파일을 검색하는 예시
const filePath = findFileToBottom('src', 'index.js');
```

