---
id: universal.nullable
title: NullAble
sidebar_label: NullAble
slug: /universal.nullable
---





객체의 모든 속성을 nullable 하게 합니다.

## Signature

```typescript
type NullAble<T extends Obj | undefined> = { [P in keyof T]: T[P] | null };
```
## References
 [Obj](./universal.obj)

## Example


```tsx
type Example = NullAble<{ a: 1; b: 1 }>;
// type Example = { a: 1 | null; b: 1  | null}
```

