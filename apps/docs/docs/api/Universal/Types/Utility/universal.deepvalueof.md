---
id: universal.deepvalueof
title: DeepValueOf
sidebar_label: DeepValueOf
slug: /universal.deepvalueof
---





객체의 깊은 속성 값을 추출하는 타입을 정의합니다.

## Signature

```typescript
type DeepValueOf<T, K extends DeepKeyOf<T> | (string & {}) | number> = K extends keyof T ? T[K] : K extends `${infer Key}.${infer Rest}` ? T extends Array<any> ? Key extends `${number}` ? DeepValueOf<T[`${number}`], Rest> : never : Key extends keyof T ? undefined extends T[Key] ? DeepValueOf<NonNullable<T[Key]>, Rest> | undefined : null extends T[Key] ? DeepValueOf<NonNullable<T[Key]>, Rest> | undefined : DeepValueOf<T[Key], Rest> : never : never;
```
## References
 [DeepKeyOf](./universal.deepkeyof), [DeepValueOf](./universal.deepvalueof)

## Example


```typescript
type Example = {
  a: {
    b: number;
    c: {
      d: string[];
    };
  };
}

// 객체의 깊은 속성 값 타입 추출
type Value = DeepValueOf<Example, 'a.c.d'>;
// type Value = string[]
```

