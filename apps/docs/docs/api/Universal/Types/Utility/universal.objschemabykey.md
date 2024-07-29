---
id: universal.objschemabykey
title: ObjSchemaByKey
sidebar_label: ObjSchemaByKey
slug: /universal.objschemabykey
---





넘겨진 key 를 기반으로, 객체의 type 을 만들어 줍니다.

## Signature

```typescript
type ObjSchemaByKey<T extends string | number, Value = any> = T extends `${infer Key}.${infer Rest}` ? Key extends `${number}` ? ObjSchemaByKey<Rest, Value>[] : { [K in Key]?: ObjSchemaByKey<Rest, Value> } : { [K in T]?: Value };
```
## References
 [ObjSchemaByKey](./universal.objschemabykey)

## Example

```ts type A = ObjSchemaByKey&lt;'a.b.c'&gt; // \{ a?: { b?: { c?: any \} } } type B = ObjSchemaByKey&lt;'a.b.0.title'&gt; // \{ a?: { b?: {title?: any\}[] } }

