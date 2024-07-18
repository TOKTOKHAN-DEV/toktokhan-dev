---
'@toktokhan-dev/react-universal': patch
---

상태 기반으로 UI를 다르게 렌더링할 수 있는 두 가지 신규 컴포넌트를 소개합니다. 이 컴포넌트들은 데이터를 검사하거나 로딩 상태를 확인하여 알맞은 UI를 출력하는 데 도움이 됩니다.

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
