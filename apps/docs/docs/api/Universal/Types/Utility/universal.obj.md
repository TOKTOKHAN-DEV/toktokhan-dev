---
id: universal.obj
title: Obj
sidebar_label: Obj
slug: /universal.obj
---





키와 값의 타입이 있는 객체의 타입을 정의합니다.

## Signature

```typescript
type Obj<K extends string | number | symbol = string | number | symbol, V = unknown> = Record<K, V>;
```

## Example


```typescript
// 객체의 타입 정의
type Person = Obj<'name' | 'age', string | number>;

// 객체의 사용 예시
const person: Person = {
  name: 'Alice',
  age: 30,
};
```

