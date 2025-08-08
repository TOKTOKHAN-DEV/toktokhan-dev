---
id: node.cwd
title: Cwd()
sidebar_label: Cwd()
slug: /node.cwd
---





현재 작업 디렉터리(CWD)의 경로를 계산하여 반환하는 함수입니다.

## Signature

```typescript
cwd: (...paths: string[]) => string
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

paths


</td><td>

string[]


</td><td>

작업 디렉터리에 추가될 하위 경로들


</td></tr>
</tbody></table>

## Returns

string

현재 작업 디렉터리(CWD)의 경로

## Example


```typescript
// 현재 작업 디렉터리의 경로를 계산하는 예시
const filePath = cwd('src', 'components', 'Button');
```

