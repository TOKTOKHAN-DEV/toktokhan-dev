# @toktokhan-dev/zustand-create-store-context

## 0.0.4

### Patch Changes

- 9d6d905: 각 패키지별 LICENSE 와 README 파일을 추가하고, Package.json 을 개선했습니다.

## 0.0.3

### Patch Changes

- Updated dependencies [94e2b25]
  - @toktokhan-dev/universal@0.0.8

## 0.0.2

### Patch Changes

- f414a7f: type, comment

  type 과 주석이 개선되었습니다.

- Updated dependencies [f414a7f]
  - @toktokhan-dev/universal@0.0.7

## 0.0.1

### Patch Changes

- d94b3ba: new package

  새로운 패키지 `@toktokhan-dev/zustand-create-store-context` 가 추가되었습니다

  ### `createStoreContext`

  zustand 와 함께 사용할 수 있는 `createStoreContext` 함수를 제공합니다. 지역적인 상태를 zustand 로 관리할 수 있습니다.

  ```tsx
  import { createStoreContext } from '@toktokhan-dev/zustand-create-store-context'

  const {
    Provider: CountProvider,
    useContext: useCountContext,
    withProvider: withCountProvider,
  } = createStoreContext((set, get, store) => ({
    count: 0,
    setCount: (count: number) =>
      set(() => {
        count
      }),
  }))

  const Component = () => {
    const count = useCountContext((store) => store.count)
    const setCount = useCountContext((store) => store.setCount)

    return (
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <span>{count}</span>
      </div>
    )
  }

  const Component2 = withProvider(Component)

  const App = () => {
    return (
      <>
        {/* Provider */}
        <CountProvider>
          <Component />
        </CountProvider>

        {/* HOC */}
        <Component2 />

        {/* Provider InitialState */}
        <CountProvider initialState={{ count: 10 }}>
          <Component />
        </CountProvider>

        {/* HOC InitialState (단순 예제입니다. render 바깥에서 선언하길 권장합니다.) */}
        {withCountProvider(Component, { count: 10 })}
      </>
    )
  }
  ```
