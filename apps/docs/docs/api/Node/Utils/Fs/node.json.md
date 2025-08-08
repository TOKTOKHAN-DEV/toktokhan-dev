---
id: node.json
title: Json()
sidebar_label: Json()
slug: /node.json
---





주어진 JSON 파일을 읽어 파싱하여 객체로 반환하는 함수입니다.

## Signature

```typescript
json: <T extends Obj = Obj>(path: string) => T
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

읽을 JSON 파일의 경로


</td></tr>
</tbody></table>

## Returns

T

JSON 파일을 파싱한 객체

## Example


```typescript
// JSON 파일을 읽어 객체로 반환하는 예시
const data = json<{ name: string; age: number }>('data.json');
```

