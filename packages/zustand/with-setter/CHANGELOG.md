# @toktokhan-dev/zustand-with-setter

## 0.0.5

### Patch Changes

- 4ab5fd0: add packages, fix type

  ### new package: zustand-react

  `@toktokhan-dev/zustand-react` 패키지는 `@toktokhan-dev/zustand-create-store-context` 와 `@toktokhan-dev/zustand-with-setter` 패키지에 있는 모든 모듈을 제공합니다.

  ### zustand-with-setter

  type 명이 수정되었습니다. `WithSetter` -> `IWithSetter`

## 0.0.4

### Patch Changes

- Updated dependencies [94e2b25]
  - @toktokhan-dev/universal@0.0.8

## 0.0.3

### Patch Changes

- Updated dependencies [f414a7f]
  - @toktokhan-dev/universal@0.0.7

## 0.0.2

### Patch Changes

- Updated dependencies [aa2b844]
  - @toktokhan-dev/universal@0.0.6

## 0.0.1

### Patch Changes

- c919068: add new package @toktokhan-dev/zustand-with-setter

  ### zustand with setter

  새로운 패키지가 추가되었습니다. zustand 와 함께 사용할 수 있는 set 함수, reset 함수를 제공합니다. 기존의 간단한 set 함수도 직접 정의를 해야하는 불편함을 해소하기 위해 만들어졌습니다.

  zustand create, createStore 에서 middleware 로 사용할 수 있습니다.

  #### 기존 코드

  ```ts
  import create from 'zustand'

  type Store = {
    count: number
    setCount: (count: number) => void
    nested: {
      count: number
    }
    setNestedCount: (count: number) => void
  }

  const useStore = create<Store>((set) => ({
    count: 0,
    setCount: (count) => set({ count }),
    nested: {
      count: 0,
    },
    setNestedCount: (count) => set((state) => ({ nested: { count } })),
  }))
  ```

  #### withSetter 사용

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

  /** 전체 값 set 하기  */
  set({ count: 5, nested: { count: 5 } })
  set((prev) => ({ count: prev.count + 1 }))

  /** 특정 key 값 set 하기 */
  set('count', 5)
  set('count', (prev) => prev + 1)
  set('nested.count', 5)
  set('nested.count', (prev) => prev + 1)

  /** reset */
  const reset = useStore((store) => store.reset)
  reset()
  reset('count')
  reset({ count: 5 })
  ```

- Updated dependencies [af1668a]
- Updated dependencies [4f0b03f]
- Updated dependencies [9493f66]
  - @toktokhan-dev/universal@0.0.5
