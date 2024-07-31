---
id: node.yaml
title: Yaml()
sidebar_label: Yaml()
slug: /node.yaml
---





YAML 파일을 읽어 파싱하여 객체로 반환하는 함수입니다.

## Signature

```typescript
yaml: <T extends Obj = Obj>(path: string) => T
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

읽을 YAML 파일의 경로


</td></tr>
</tbody></table>
## Returns

T

YAML 파일을 파싱한 객체

## Example


```typescript
// YAML 파일을 읽어 객체로 반환하는 예시
const data = yaml<{ name: string; age: number }>('data.yaml');
```

