# @toktokhan-dev/react-universal

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
