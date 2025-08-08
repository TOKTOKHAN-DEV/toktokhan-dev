---
id: universal.log
title: Log()
sidebar_label: Log()
slug: /universal.log
---





주어진 값을 로깅하고 반환합니다.

## Signature

```typescript
log: <T>(title: string, value: T) => T
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

로깅할 값


</td></tr>
</tbody></table>

## Returns

T

주어진 값

## Example


```typescript
const result = log('Result:', 42); // Result: 42
const result = log('Result:')(42); // Result: 42

const ex = flow(
 add(1),
 log('debug:'), // debug
 add(2)
)

ex(1) debug: 2

```

