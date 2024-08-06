# @toktokhan-dev/universal

`js`, `ts` 환경에서 사용 가능한, utility `function`, `type` 들을 제공합니다. `cjs`, 와 `es` 환경 모두 사용 가능한 모듈입니다. 함수의 유연한 사용, 합성을 위해 대부분의 함수가 `currying` 되어 있습니다.

자세한 내용 및 제공하는 유틸의 목록은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/universal)에서 확인 할 수 있습니다.

## Installation

```
npm i @oktokhan-dev/universal
```

## Preview

```ts
import { DeepKeyOf, arrayToRecord, get } from '@toktokhan-dev/universal'

type DeepKeys = DeepKeyOf<{
  a: {
    b: number
    c: {
      d: string[]
    }
  }
}>
// type DeepKeys = 'a' | 'a.b' | 'a.c' | 'a.c.d' | `a.c.d.${number}`

const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const record = arrayToRecord((item) => item.id , arr);
// or
const record = arrayToRecord((item) => item.id)(arr);
// or
const recordById = arrayToRecord((item) => item.id);
// or
const recordById = arrayToRecord(get("id"))
const record = recordById(arr);

console.log(record)
// {
//   1: { id: 1, name: 'Alice' },
//   2: { id: 2, name: 'Bob' },
//   3: { id: 3, name: 'Charlie' },
// }
```
