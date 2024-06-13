---
sidebar_class_name : hidden
id: universal.flatobjectparams
title: FlatObjectParams
sidebar_label: FlatObjectParams
slug: /universal.flatobjectparams
---





`flatObject` 함수의 매개변수 타입입니다.

## Signature

```typescript
type FlatObjectParams<T extends RecursiveObj<any>, V = T extends RecursiveObj<infer U> ? U : never> = {
  isValueType?: (value: T | V) => boolean;
  formatKey?: (parentKey: string | null, currentKey: string) => string;
  formatValue?: (data: {
    key: string;
    value: V;
  }) => any;
};
```
## References
 [RecursiveObj](./universal.recursiveobj)

