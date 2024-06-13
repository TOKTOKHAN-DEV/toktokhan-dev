---
id: universal.pass
title: Pass()
sidebar_label: Pass()
slug: /universal.pass
---





주어진 데이터를 반환하는 함수를 생성합니다.

## Signature

```typescript
pass: <T>(data: T) => () => T
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

data


</td><td>

T


</td><td>

반환할 데이터


</td></tr>
</tbody></table>
## Returns

() =&gt; T

주어진 데이터를 반환하는 함수

## Example


```typescript
const data = { id: 1, name: 'John' };
const getData = pass(data);
const result = getData(); // { id: 1, name: 'John' }
```

