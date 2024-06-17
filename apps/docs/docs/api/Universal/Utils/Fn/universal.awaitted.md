---
id: universal.awaitted
title: Awaitted()
sidebar_label: Awaitted()
slug: /universal.awaitted
---





Promise 를 받아 resolve 된 값으로 함수를 실행합니다.

## Signature

```typescript
awaitted: <P, R>(fn: (p: P) => R, data: P | PromiseLike<P>) => R
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

fn


</td><td>

(p: P) =&gt; R


</td><td>


</td></tr>
<tr><td>

data


</td><td>

P \| PromiseLike&lt;P&gt;


</td><td>


</td></tr>
</tbody></table>
## Returns

R

## Example


```ts
const double = (x: number) => x * 2
const target = 5
const targetPromise = Promise.resolve(5)

const result = awaitted(double, target) // 10
const resultPromise = awaitted(double, targetPromise) // 10

// curried
flow(() => Promise.resolve(5), awaitted(double))
```

