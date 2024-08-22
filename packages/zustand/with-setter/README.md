# @toktokhan-dev/zustand-with-setter

`@toktokhan-dev/zustand-with-setter`는 Zustand 스토어에 `set` 및 `reset` 함수를 추가하여 상태를 더욱 쉽게 업데이트하고 초기화할 수 있도록 도와주는 유틸리티 패키지입니다. 이를 통해 간단한 상태 변경 작업을 위해 별도의 함수를 정의할 필요 없이 직관적이고 간편한 상태 관리를 구현할 수 있습니다.

자세한 내용과 사용법은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/zustand/Overview)에서 확인 할 수 있습니다.

## Installation

#### Only zustand-with-setter

```
npm i @toktokhan-dev/zustand-with-setter
```

#### or With zustand-create-store-context

```
npm i @toktokhan-dev/zustand-react
```

## Comparison

### Vanilla Zusstand

기존 Zustand 는 상태와 더불어 업데이트 함수를 직접 정의하여 사용합니다.
간단한 상태 변경 또한 직접 정의해야하는 불편함이 있습니다.

```tsx
import create from 'zustand'

type Store = {
  count: number
  nested: { count: number }
}

const useStore = create<Store>((set) => ({
  count: 0,
  nested: { count: 0 },
  setCount: (count: number) => set(() => ({ count })),
  setNestedCount: (count: number) =>
    set((state) => ({ nested: { ...state.nested, count } })),
}))

const setCount = useStore((store) => store.setCount)

setCount(5)
```

### Zustand With Setter

`@toktokhan-dev/zustand-with-setter` 패키지를 사용하면 store 에 `set` 및 `reset` 함수를 추가하여, 간단한 상태변경은 함수를 따로 정의 하지 않아도 됩니다.

pnpm add zustand

```tsx
import { withSetter } from '@toktokhan-dev/zustand-with-setter'

import { create } from 'zustand'

type Store = {
  count: number
  nested: { count: number; list?: string[] }
}

const useStore = create(
  withSetter<Store>(() => ({
    count: 0,
    nested: { count: 0 },
  })),
)

const set = useStore((store) => store.set)

set({ count: 5 })
set('count', 5)
set('nested.count', (prev) => prev + 1)
```

## Usage

### withSetter

zustand middleware 는 일반적으로 고차함수로써 store 생성 함수를 받아서 새로운 store 생성 함수를 반환합니다.
`withSetter` 또한 같습니다. store 생성함수를 받아 `set` 및 `reset` 함수를 추가한 새로운 store 생성 함수를 반환합니다.

```tsx
import { withSetter } from '@toktokhan-dev/zustand-with-setter'

type Store = {
  count: number
}

const useStore = create(
  withSetter<Store>((set, get, store) => ({
    count: 0,
  })),
)
```

단지, 기존 zustand store 에 `set` 및 `reset` 함수를 추가하는 것이기 때문에, 기존 store 생성 함수와 완전히 동일하게 사용할 수 있습니다.

```tsx
import { withSetter } from '@toktokhan-dev/zustand-with-setter'

type Store = {
  count: number
  complexUpdate: (count: number) => void
}

const useStore = create(
  withSetter<Store>((set, get, store) => ({
    count: 0,
    complexUpdate: (count: number) =>
      set((prev) => ({ count: prev.count + count * 2 })),
  })),
)

const complexUpdate = useStore((store) => store.complexUpdate)
const set = useStore((store) => store.set)

set('count', 1)
complexUpdate(5)
```

### Set

middleware 가 제공하는 업데이트 함수입니다. 기존 store 값과 마찬가지로, 접근이 가능합니다.

```tsx
const set = useStore((store) => store.set)
```

#### `set(store: Partial<Store>): void`

전체 상태를 업데이트 할 수 있습니다. 얕은 병합을 통해 업데이트 하기 때문에 Partial 한 상태를 전달할 수 있습니다.

```tsx
type Store = {
  count: number
  nested: { count: number; list: string[] }
}

set({ count: 5, nested: { count: 5, list: [] } })
// or
set({ count: 5 })
```

#### `set(updater: (prev: Store) => Partial<Store>): void`

updater 함수를 전달하여 상태 변경이 가능합니다.

```tsx
type Store = {
  count: number
  nested: { count: number; list: string[] }
}

set((prev) => ({ ...prev, count: prev.count + 1 }))
// or
set((prev) => ({ count: prev.count + 1 }))
```

#### `set(key: Key, value: Value ): void`

첫번째 인자에 key 를 전달하면 해당 key에 대한 상태만 업데이트 할 수 있습니다.

```tsx
set('count', 5)
```

중첩된 객체의 key 는 . 구분자와 함께 전달할 수 있습니다.

```tsx
set('nested.count', 5)
set('nested.list', ['item-1'])
set('nested.list.1', 'item-2') // ["item-1", "item-2"]
```

#### `set(key: Key, updater: (prev: Value) => Value ): void`

역시 updater 함수를 사용해 수정할 수 있습니다.

```tsx
set('nested.list', (prev) => [...prev, 'item-3']) // ["item-1", "item-2", "item-3"]
```

### Reset

middleware 가 제공하는 초기화 함수입니다. 기존 store 값과 마찬가지로, 접근이 가능합니다.

```tsx
const reset = useStore((store) => store.reset)
```

#### `reset(): void`

처음 전달 받은 initialState로 상태를 초기화합니다.

```tsx
reset()
```

#### `reset(key: Key): void`

key 를 전달하면 해당 key에 대한 상태만 초기화 할 수 있습니다.

```tsx
reset('count')
reset('nested.count')
```

#### `reset(value: Partial<Store>): void`

값을 전달하면, 해당 값이 적용된 상태로 초기화 할 수 있습니다.

```tsx
reset({ count: 5 })
```

## Note

### Type Generic

아래처럼 create 함수에 Store 타입을 전달할 경우 create withSetter 가 생성하는 Store 타입은 set, reset 함수를 포함하기 때문에 에러가 발생합니다.

```tsx
type Store = {
  count: number
}

// ❌ Bad: Type Error
const useStore = create<Store>(
  withSetter((set, get, store) => ({
    count: 0,
  })),
)
```

따라서, store 의 타입 정의를 위한 create 함수의 첫번째 Generic type 에 경우 create 함수가 아닌 withSetter 의 첫번째 Generic Type 으로 정의하여 사용합니다.

```tsx
type Store = {
  count: number
}

// ✅ Good
const useStore = create(
  withSetter<Store>((set, get, store) => ({
    count: 0,
  })),
)
```
