---
id: universal.recursiveobj
title: RecursiveObj
sidebar_label: RecursiveObj
slug: /universal.recursiveobj
---





재귀하는 타입을 가지는 객체를 정의합니다.

## Signature

```typescript
type RecursiveObj<T> = { [x in string]: T | RecursiveObj<T> };
```
## References
 [RecursiveObj](./universal.recursiveobj)

## Example


```typescirpt

const Object: RecursiveObj<{ src: string; alt: string }> = {
    a: {
      alt: 'a.alt',
      src: 'a.src',
    },
    b: {
      c: {
        alt: 'c.alt',
        src: 'c.src',
      },
      d: {
        alt: 'd.alt',
        src: 'd.src',
      },
    },
  }
```

