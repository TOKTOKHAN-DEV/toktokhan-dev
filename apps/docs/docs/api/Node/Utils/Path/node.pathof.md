---
id: node.pathof
title: PathOf()
sidebar_label: PathOf()
slug: /node.pathof
---





주어진 대상 경로를 기준 경로와 결합하여 새 경로를 생성합니다.

## Signature

```typescript
pathOf: (target: string) => (base: string) => string
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

target


</td><td>

string


</td><td>

대상 경로입니다.


</td></tr>
</tbody></table>

## Returns

(base: string) =&gt; string

대상 경로와 기준 경로를 결합한 새 경로를 반환합니다.

## Example


```typescript
// 주어진 대상 경로를 기준 경로와 결합하여 새 경로를 생성하는 예시
const resolvePath = pathOf('file.txt');
const result = resolvePath('/home/user'); // '/home/user/file.txt'
```

