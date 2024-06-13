---
id: universal.deepmutable
title: DeepMutable
sidebar_label: DeepMutable
slug: /universal.deepmutable
---





객체의 모든 속성에서 readonly 를 제거해줍니다.

## Signature

```typescript
type DeepMutable<T extends Record<any, any> | undefined> = Mutable<{ [K in keyof T]: T[K] extends Record<any, any> | undefined ? Mutable<T[K]> : T[K] }>;
```
## References
 [Mutable](./universal.mutable)

## Example


```tsx
type Example = DeepMutable<{
 readonly a: number;
 readonly b: { readonly c: number; readonly d: string };
 }>;

 // type Example = {
 // a: number;
 // b: { c : number; d : string };
 // }
```

