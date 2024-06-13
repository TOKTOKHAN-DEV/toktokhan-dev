---
id: universal.effect
title: Effect()
sidebar_label: Effect()
slug: /universal.effect
---





함수를 실행하고, 인자를 그대로 반환합니다. 컴포넌트 합성시(lodash.flow) 함수의 응닶값에 영향을 미치지 않고 특정 함수를 실행시키고 싶을 경우 유용합니다.

## Signature

```typescript
effect: <T>(fn: (x: T) => void, x: T) => T
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

(x: T) =&gt; void


</td><td>

실행할 함수


</td></tr>
<tr><td>

x


</td><td>

T


</td><td>

실행할 함수에 전달할 인자


</td></tr>
</tbody></table>
## Returns

T

실행할 함수에 전달한 인자

## Example


```ts
effect(console.log, 'hello') // 'hello'를 출력하고 'hello'를 반환합니다.

effect(console.log)('hello') // 'hello'를 출력하고 'hello'를 반환합니다.

const log = effect(console.log)
log('hello') // 'hello'를 출력하고 'hello'를 반환합니다.

const dotToDash = flow(split("."), effect(console.log), join('-'))
dotToDash('a.b.c') // ['a', 'b', 'c'] 를 출력하고 'a-b-c'를 반환합니다.
```

