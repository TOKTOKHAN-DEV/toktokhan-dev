---
id: node.pathon
title: PathOn()
sidebar_label: PathOn()
slug: /node.pathon
---





주어진 기준 경로를 대상 경로와 결합하여 새 경로를 생성합니다.

## Signature

```typescript
pathOn: (base: string) => (target: string) => string
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

base


</td><td>

string


</td><td>

기준 경로입니다.


</td></tr>
</tbody></table>

## Returns

(target: string) =&gt; string

기준 경로와 대상 경로를 결합한 새 경로를 반환합니다.

## Example


```typescript
// 주어진 기준 경로를 대상 경로와 결합하여 새 경로를 생성하는 예시
const resolvePath = pathOn('/home/user');
const result = resolvePath('file.txt'); // '/home/user/file.txt'
```

