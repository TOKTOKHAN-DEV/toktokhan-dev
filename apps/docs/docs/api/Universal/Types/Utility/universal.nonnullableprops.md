---
id: universal.nonnullableprops
title: NonNullableProps
sidebar_label: NonNullableProps
slug: /universal.nonnullableprops
---





객체에서 모든 property 가 NonNullable 타입이 되도록 합니다.

## Signature

```typescript
type NonNullableProps<T extends Obj> = Omit<T, keyof T> & { [P in keyof T]-?: NonNullable<T[P]> };
```
## References
 [Obj](./universal.obj)

## Example

type Example = NonNullableProps&lt;\{ a: 1 \| null; b?: 1 \}&gt;; // type Example = \{ a: 1; b: 1 \}

