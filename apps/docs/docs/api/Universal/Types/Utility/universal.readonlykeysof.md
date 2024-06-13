---
id: universal.readonlykeysof
title: ReadonlyKeysOf
sidebar_label: ReadonlyKeysOf
slug: /universal.readonlykeysof
---





객체의 readonly 한 속성의 키를 추출합니다.

## Signature

```typescript
type ReadonlyKeysOf<T extends object> = { [P in keyof T]-?: IfEquals<{ [Q in P]: T[P] }, { -readonly [Q in P]: T[P] }, never, P> }[keyof T];
```
## References
 [IfEquals](./universal.ifequals)

## Example


```tsx
type Example = ReadonlyKeysOf<{
  readonly a: number;
  b: string;
  readonly c: string;
}>;

// type Example = "a" | "c"
```

