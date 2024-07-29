---
id: universal.deepnonnullable
title: DeepNonNullAble
sidebar_label: DeepNonNullAble
slug: /universal.deepnonnullable
---





객체의 모든 속성을 null 가능하게 만드는 타입을 정의합니다.

## Signature

```typescript
type DeepNonNullAble<T> = T extends Obj | Array<any> ? { [K in keyof T]-?: DeepNonNullAble<T[K]> } : Exclude<T, null | undefined>;
```
## References
 [Obj](./universal.obj), [DeepNonNullAble](./universal.deepnonnullable)

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

