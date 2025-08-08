---
id: node.infolog
title: InfoLog()
sidebar_label: InfoLog()
slug: /node.infolog
---





정보 로그를 출력하는 함수입니다.

## Signature

```typescript
infoLog: <T>(title: string, value: T) => T
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

title


</td><td>

string


</td><td>

로그 제목


</td></tr>
<tr><td>

value


</td><td>

T


</td><td>

로그 값


</td></tr>
</tbody></table>

## Returns

T

입력된 값

## Example


```typescript
// 정보 로그를 출력하는 예시
infoLog('Information', infoMessage);
infoLog('Information')(infoMessage);
```

