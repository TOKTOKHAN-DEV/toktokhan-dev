---
id: universal.omitreadonly
title: OmitReadOnly
sidebar_label: OmitReadOnly
slug: /universal.omitreadonly
---





객체에서 읽기 전용 속성을 제거합니다

## Signature

```typescript
type OmitReadOnly<T extends Obj> = Omit<T, ReadonlyKeysOf<T>>;
```
## References
 [Obj](./universal.obj), [ReadonlyKeysOf](./universal.readonlykeysof)

## Example


```tsx
type Example = OmitReadOnly<{
   readonly a: number;
   b: string;
   readonly c: string;
}>;

// type Example = { b : string; }
```

