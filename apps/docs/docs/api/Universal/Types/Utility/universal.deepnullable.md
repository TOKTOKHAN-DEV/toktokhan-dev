---
id: universal.deepnullable
title: DeepNullAble
sidebar_label: DeepNullAble
slug: /universal.deepnullable
---





객체의 모든 속성을 null 가능하게 만드는 타입을 정의합니다.

## Signature

```typescript
type DeepNullAble<T extends Obj | undefined> = NullAble<{ [K in keyof T]: T[K] extends Obj | undefined ? NullAble<T[K]> : T[K] }>;
```
## References
 [Obj](./universal.obj), [NullAble](./universal.nullable)

## Example


```typescript
type NullablePerson = DeepNullable<{
  name: string;
  age: number;
  address: {
    city: string;
    postalCode: number;
  };
}>;
// type NullablePerson = {
//   name: string | null;
//   age: number | null;
//   address: {
//     city: string | null;
//     postalCode: number | null;
//   } | null;
// }
```

