---
id: universal.valueof
title: ValueOf
sidebar_label: ValueOf
slug: /universal.valueof
---





객체의 모든 속성의 타입을 추출합니다

## Signature

```typescript
type ValueOf<T> = T extends Obj ? T[keyof T] : unknown;
```
## References
 [Obj](./universal.obj)

## Example


```tsx
type Example = ValueOf<{ a: number; b: string }>;

// type Example = number | string
```

