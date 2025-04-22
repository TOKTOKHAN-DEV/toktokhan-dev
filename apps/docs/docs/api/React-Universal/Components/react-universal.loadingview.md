---
id: react-universal.loadingview
title: LoadingView()
sidebar_label: LoadingView()
slug: /react-universal.loadingview
---





`LoadingView` 컴포넌트는 로딩 상태를 처리하여 로딩 중일 때는 `fallback`을, 로딩이 완료되었을 때는 `children`을 렌더링합니다.

## Signature

```typescript
LoadingView: ({
  children,
  isLoading,
  fallback
}: LoadingViewProps) => react_jsx_runtime.JSX.Element
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

\{ children, isLoading, fallback\}


</td><td>

[LoadingViewProps](./react-universal.loadingviewprops)


</td><td>


</td></tr>
</tbody></table>
## Returns

react_jsx_runtime.JSX.Element

조건에 따라 `children` 또는 `fallback`을 렌더링합니다.

## Example


```tsx
import LoadingView from './components/StateViews/LoadingView';

const MyComponent = ({ isLoading }) => (
  <LoadingView isLoading={isLoading} fallback={<div>로딩 중...</div>}>
    <div>로딩이 완료되었습니다.</div>
  </LoadingView>
);
```

