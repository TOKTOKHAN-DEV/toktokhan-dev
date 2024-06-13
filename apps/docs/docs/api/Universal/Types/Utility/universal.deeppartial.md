---
id: universal.deeppartial
title: DeepPartial
sidebar_label: DeepPartial
slug: /universal.deeppartial
---





객체의 모든 속성을 옵셔널하게 만듭니다

## Signature

```typescript
type DeepPartial<T extends Obj | undefined> = Partial<{ [K in keyof T]: T[K] extends Obj | undefined ? Partial<T[K]> : T[K] }>;
```
## References
 [Obj](./universal.obj)

## Example


```tsx
type Example = DeepPartial<{
   a: number;
   b: { c : number; d : string };
}>;

Example = {
   a?: number;
   b?: { c? : number; d? : string };
}
```
tsx

