---
id: node.error
title: Error()
sidebar_label: Error()
slug: /node.error
---





오류 메시지를 생성하는 함수입니다.

## Signature

```typescript
error: (value: string) => string
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

value


</td><td>

string


</td><td>

오류 메시지에 추가할 값


</td></tr>
</tbody></table>
## Returns

string

오류 메시지 문자열

## Example


```typescript
// 오류 메시지를 생성하는 예시
const message = error('An error occurred.');
```

