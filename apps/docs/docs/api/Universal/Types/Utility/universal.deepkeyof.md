---
id: universal.deepkeyof
title: DeepKeyOf
sidebar_label: DeepKeyOf
slug: /universal.deepkeyof
---





객체의 깊은 키를 나타내는 타입을 추출합니다.

## Signature

```typescript
type DeepKeyOf<T, ExactT = DeepNonNullAble<T>> = ExactT extends Array<any> ? { [K in Indices<ExactT>]: K extends number | string ? ExactT[K] extends Obj | Array<any> ? K | `${K}.${DeepKeyOf<ExactT[K]>}` : K : K }[Indices<ExactT>] : ExactT extends Obj ? { [K in keyof ExactT]: K extends string | number ? K | `${ExactT[K] extends Obj | Array<any> ? `${K}.${DeepKeyOf<ExactT[K]>}` : never}` : never }[keyof ExactT] : never;
```
## References
 [DeepNonNullAble](./universal.deepnonnullable), [Indices](./universal.indices), [Obj](./universal.obj), [DeepKeyOf](./universal.deepkeyof)

## Example


```typescript
type DeepKeys = DeepKeyOf<{
  a: {
    b: number;
    c: {
      d: string[];
    };
  };
}>;
// type DeepKeys = 'a' | 'a.b' | 'a.c' | 'a.c.d' | `a.c.d.${number}`
```

