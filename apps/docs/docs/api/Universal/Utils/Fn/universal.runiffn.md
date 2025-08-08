---
id: universal.runiffn
title: RunIfFn()
sidebar_label: RunIfFn()
slug: /universal.runiffn
---





주어진 값이 함수인 경우 주어진 인자들을 사용하여 실행하고, 그렇지 않으면 주어진 값을 그대로 반환합니다.

## Signature

```typescript
declare function runIfFn<T, U>(valueOrFn: T | ((...fnArgs: U[]) => T), ...args: U[]): T;
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

valueOrFn


</td><td>

T \| ((...fnArgs: U[]) =&gt; T)


</td><td>

실행할 함수 또는 반환할 값


</td></tr>
<tr><td>

args


</td><td>

U[]


</td><td>

함수에 전달할 매개변수


</td></tr>
</tbody></table>

## Returns

T

주어진 값이 함수인 경우 주어진 인자들을 사용하여 실행한 결과를 반환하고, 그렇지 않으면 주어진 값을 그대로 반환합니다.

## Example


```ts
const add = (a: number, b: number) => a + b;
runIfFn(add, 2, 3); // 5 - add 함수를 실행하여 결과를 반환합니다.
runIfFn(5, 2, 3); // 5 - 주어진 값이 함수가 아니므로 주어진 값을 그대로 반환합니다.
```

