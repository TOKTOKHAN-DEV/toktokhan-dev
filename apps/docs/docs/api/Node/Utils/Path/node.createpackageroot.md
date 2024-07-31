---
id: node.createpackageroot
title: CreatePackageRoot()
sidebar_label: CreatePackageRoot()
slug: /node.createpackageroot
---





주어진 디렉터리부터 상위 디렉터리에 있는 package.json 파일의 경로를 기준으로 상대 경로를 사용하여 디렉터리를 생성하는 함수를 반환합니다.

## Signature

```typescript
createPackageRoot: (dir: string) => (...paths: string[]) => string
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

상위 디렉터리에 있는 package.json 파일을 찾을 시작 디렉터리의 경로


</td></tr>
</tbody></table>
## Returns

(...paths: string[]) =&gt; string

생성된 디렉터리의 경로를 반환하는 함수

## Example


```typescript
// 주어진 디렉터리부터 상위 디렉터리의 package.json 파일을 찾아 상대 경로를 사용하여 디렉터리를 생성하는 함수를 생성하는 예시
const createRootDir = createPackageRoot(__dirname);
const myDir = createRootDir('src', 'components', 'Button');
```

