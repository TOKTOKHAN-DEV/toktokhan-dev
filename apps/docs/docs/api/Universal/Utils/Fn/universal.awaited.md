---
id: universal.awaited
title: Awaited()
sidebar_label: Awaited()
slug: /universal.awaited
---





Promise 를 받아 resolve 된 값으로 함수를 실행합니다.

## Signature

```typescript
awaited: <P, R>(fn: (p: P) => R, data: P | PromiseLike<P>) => Promise<R>
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

Promise&lt;R&gt;

## Example


```ts
const double = (x: number) => x * 2
const target = 5
const targetPromise = Promise.resolve(5)

const result = awaited(double, target) // 10
const resultPromise = awaited(double, targetPromise) // 10

// curried
flow(() => Promise.resolve(5), awaited(double))
```

