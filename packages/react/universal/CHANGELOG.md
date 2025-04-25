# @toktokhan-dev/react-universal

## 0.0.12

### Patch Changes

- [#66](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/pull/66) [`a271a94`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/a271a94649fc3a94f952e2f7c0f3e0ba39cd2150) Thanks [@dingPie](https://github.com/dingPie)! - useYieldLogic hooks 추가 / useIntersectionObserver docs 수정

## 0.0.11

### Patch Changes

- [`2dfc002`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/2dfc00257f5bbf669a065d43d304e193307a3481) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ## package.json sideEffects 설정

  트리 쉐이킹을 적용하여 불필요한 코드가 최종 번들에서 제거되도록 `sideEffects: false`를 설정했습니다.

- [`75af6e3`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/75af6e3b3d33c93292f41e79fe76e8bcbcb2a38e) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ## useTimer hook, context 추가

  타이머를 관리하는 훅을 추가했습니다. 이 훅은 타이머의 시작, 일시정지, 리셋, 재시작 기능을 제공하며, 타이머의 남은 시간을 업데이트하고 형식을 설정할 수 있습니다.

  전역/지역적으로 필요한 경우 사용할 수 있는 context를 제공합니다.

  자세한 설명은 [TOKDOCS: useTimer 문서](https://toktokhan-dev-docs.vercel.app/docs/react-universal.usetimer)를 참고해주세요.

  ```tsx
  import React from 'react'

  import { useTimer } from '@toktokhan-dev/react-universal'

  const TimerComponent = () => {
    const { time, isEnd, start, pause, reset } = useTimer({
      autoStart: false,
      timeLimit: 1000 * 60 * 5,
      interval: 1000,
      setTimeFormat: (time) => `${time}ms`,
      onTimeOver: ()=> console.log('time over'),
      onTimeUpdate: (time) -> console.log(`update: ${time}ms`)
    })

    return (
      <div>
        <p>Remaining Time: {time}</p>
        <button onClick={start}>Start Timer</button>
        <button onClick={pause}>Pause Timer</button>
        <button onClick={reset}>Reset Timer</button>
        {isEnd && <p>Timer ends</p>}
      </div>
    )
  }

  export default TimerComponent
  ```

- [`8990c64`](https://github.com/TOKTOKHAN-DEV/toktokhan-dev/commit/8990c6412854fd806260b14abe2563f4204a68db) Thanks [@AlgoRoots](https://github.com/AlgoRoots)! - ## create-context-selector.tsx

  인자로 받는 hook이 parmeter를 받는 hook 도 허용할 수 있도록 개선되었습니다.

  ```tsx

  type Parameters = {
    value: string
  }

  // useHook.ts
  const useHook = ({value}: Parameters) = {
  ) => {
    const [value, setValue] = useState(value)
    return value
  }

  export const {Provider, useContext, withProvider} = createContextSelector<ReturnType<typeof useTimer>, Parameters>(useHook, {value: 'some value'})

  // app.tsx
  const App = () => (
    <Provider params={{value: 'some value'}}>
        <ValueDisplay/>
     </Provider>
  );

  // app.tsx
  const App = ()=> <ValueDisplay/>
  export default withProvider(App, {value: 'some value'})
  ```

## 0.0.10

### Patch Changes

- a0f73d6: - Add Jest configuration file for TypeScript
  - Set test environment to jsdom
  - Uncomment transform configuration for TypeScript files
  - Add test script to package.json

## 0.0.9

### Patch Changes

- 98ee403: add LICENSE, README, improve package.json

  각 패키지별 LICENSE 와 README 파일을 추가하고, Package.json 을 개선했습니다.

- Updated dependencies [94e2b25]
  - @toktokhan-dev/universal@0.0.8

## 0.0.8

### Patch Changes

- Updated dependencies [f414a7f]
  - @toktokhan-dev/universal@0.0.7

## 0.0.7

### Patch Changes

- Updated dependencies [aa2b844]
  - @toktokhan-dev/universal@0.0.6

## 0.0.6

### Patch Changes

- Updated dependencies [af1668a]
- Updated dependencies [4f0b03f]
- Updated dependencies [9493f66]
  - @toktokhan-dev/universal@0.0.5

## 0.0.5

### Patch Changes

- 96c995f: 상태 기반으로 UI를 다르게 렌더링할 수 있는 두 가지 신규 컴포넌트를 소개합니다. 이 컴포넌트들은 데이터를 검사하거나 로딩 상태를 확인하여 알맞은 UI를 출력하는 데 도움이 됩니다.

  # EmptyState

  데이터가 비어있는 경우 대체 UI를 렌더링하는 컴포넌트입니다.

  Props:

  - children: 데이터가 존재할 때 렌더링될 UI 요소
  - fallback: 데이터가 비어 있을 때 렌더링될 UI 요소
  - data: 검사할 데이터 배열 (선택 사항)

  사용 예시:

  ```tsx
  import EmptyState from './components/StateViews/EmptyState'

  const MyComponent = ({ data }) => (
    <EmptyState data={data} fallback={<div>데이터가 없습니다.</div>}>
      <div>데이터가 존재합니다.</div>
    </EmptyState>
  )
  ```

  # LoadingState

  로딩 중일 때 대체 UI를 렌더링하는 컴포넌트입니다.

  Props:

  - children: 로딩이 완료되었을 때 렌더링될 UI 요소
  - fallback: 로딩 중일 때 렌더링될 UI 요소
  - isLoading: 로딩 상태 (선택 사항)

  사용 예시:

  ```tsx
  import LoadingState from './components/StateViews/LoadingState'

  const MyComponent = ({ isLoading }) => (
    <LoadingState isLoading={isLoading} fallback={<div>로딩 중...</div>}>
      <div>로딩이 완료되었습니다.</div>
    </LoadingState>
  )
  ```

## 0.0.4

### Patch Changes

- Updated dependencies [d96ea33]
  - @toktokhan-dev/universal@0.0.4

## 0.0.3

### Patch Changes

- Updated dependencies [7ebbf37]
  - @toktokhan-dev/universal@0.0.3

## 0.0.2

### Patch Changes

- Updated dependencies [70acba8]
  - @toktokhan-dev/universal@0.0.2

## 0.0.1

### Patch Changes

- b557ce1: React 환경에서 전역적으로 사용할 수 있는 유틸리티 라이브러리입니다. 와 은 @toktokhan-dev/react-universal를 포함하고 있습니다.
  [Docs:@toktokhan-dev/react-universal](https://toktokhan-dev-docs.vercel.app/docs/react-universal)
- Updated dependencies [6f42208]
  - @toktokhan-dev/universal@0.0.1

## 0.3.1

### Patch Changes

- bb60ca7: ignore sourcemap file
- Updated dependencies [bb60ca7]
  - @toktokhan-dev/universal@1.3.1

## 0.3.0

### Minor Changes

- 7baac8a: test version up

### Patch Changes

- Updated dependencies [7baac8a]
  - @toktokhan-dev/universal@1.3.0

## 0.2.0

### Minor Changes

- ea08e81: update temp

## 0.1.0

### Minor Changes

- b75ab4c: update

## 0.0.2

### Patch Changes

- 1636561: creation react packages
