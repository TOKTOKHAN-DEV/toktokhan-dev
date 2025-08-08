---
id: zustand-with-setter.withsetter
title: WithSetter()
sidebar_label: WithSetter()
slug: /zustand-with-setter.withsetter
---





zustand 와 함께 사용할 수 있는 set 함수, reset 함수를 제공합니다. 기존의 간단한 set 함수도 직접 정의를 해야하는 불편함을 해소하기 위해 만들어졌습니다. zustand create, createStore 에서 middleware 로 사용할 수 있습니다.

## Signature

```typescript
withSetter: <T extends Obj, Mps extends [StoreMutatorIdentifier, unknown][] = [], Mcs extends [StoreMutatorIdentifier, unknown][] = []>(initializer: StateCreator<T, Mps, Mcs>) => StateCreator<IWithSetter<T>, Mps, Mcs>
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

initializer


</td><td>

StateCreator&lt;T, Mps, Mcs&gt;


</td><td>


</td></tr>
</tbody></table>

## Returns

StateCreator&lt;[IWithSetter](./zustand-with-setter.iwithsetter)&lt;T&gt;, Mps, Mcs&gt;

## Example


```ts
import { withSetter } from '@toktokhan-dev/zustand-with-setter'

import { create } from 'zustand'

type Store = {
  count: number
  nested: {
    count: number
  }
}

const useStore = create(
  withSetter<Store>(() => ({
    count: 0,
    nested: {
      count: 0,
    },
  })),
)

const set = useStore((store) => store.set)

set({ count: 5, nested: { count: 5 } })
set((prev) => ({ count: prev.count + 1 }))

set('count', 5)
set('count', (prev) => prev + 1)
set('nested.count', 5)
set('nested.count', (prev) => prev + 1)

const reset = useStore((store) => store.reset)
reset()
reset('count')
reset({ count: 5 })
```

