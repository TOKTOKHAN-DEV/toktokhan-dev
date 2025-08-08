---
id: node.packageroot
title: PackageRoot()
sidebar_label: PackageRoot()
slug: /node.packageroot
---





현재 모듈의 디렉터리를 기준으로 package.json 파일의 상위 디렉터리에 있는 package.json 파일의 경로를 기준으로 상대 경로를 사용하여 디렉터리를 생성하는 함수입니다.

## Signature

```typescript
packageRoot: (...paths: string[]) => string
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


</td></tr>
</tbody></table>

## Returns

string

## Example


```typescript
// 현재 모듈의 디렉터리를 기준으로 디렉터리를 생성하는 함수를 생성하는 예시
const myDir = packageRoot('src', 'components', 'Button');
```

