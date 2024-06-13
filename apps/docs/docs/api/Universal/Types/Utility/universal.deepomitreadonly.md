---
id: universal.deepomitreadonly
title: DeepOmitReadOnly
sidebar_label: DeepOmitReadOnly
slug: /universal.deepomitreadonly
---





객체의 모든 읽기 전용 속성을 제거하는 타입을 정의합니다.

## Signature

```typescript
type DeepOmitReadOnly<T extends Obj | undefined> = Omit<{ [P in keyof T]: T[P] extends Obj | undefined ? DeepOmitReadOnly<NonNullable<T[P]>> : T[P] }, ReadonlyKeysOf<NonNullable<T>>>;
```
## References
 [Obj](./universal.obj), [DeepOmitReadOnly](./universal.deepomitreadonly), [ReadonlyKeysOf](./universal.readonlykeysof)

## Example


```typescript
type MutablePerson = DeepOmitReadOnly<{
  readonly name: string;
  readonly age: number;
  address: {
    readonly city: string;
    postalCode: number;
  };
}>;
// type MutablePerson = {
//   address: {
//     postalCode: number;
//   };
// }
```

