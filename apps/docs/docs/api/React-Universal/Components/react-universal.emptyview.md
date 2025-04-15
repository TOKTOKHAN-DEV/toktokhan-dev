---
id: react-universal.emptyview
title: EmptyView()
sidebar_label: EmptyView()
slug: /react-universal.emptyview
---





`EmptyView` 컴포넌트는 데이터가 비어있는 경우 `fallback`을, 데이터가 존재하는 경우 `children`을 렌더링합니다.

## Signature

```typescript
EmptyView: ({
  children,
  data,
  fallback
}: EmptyViewProps) => react_jsx_runtime.JSX.Element
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

\{ children, data, fallback\}


</td><td>

[EmptyViewProps](./react-universal.emptyviewprops)


</td><td>


</td></tr>
</tbody></table>
## Returns

react_jsx_runtime.JSX.Element

조건에 따라 `children` 또는 `fallback`을 렌더링합니다.

## Example


```tsx
import EmptyView from './components/StateViews/EmptyView';

const MyComponent = ({ data }) => (
  <EmptyView data={data} fallback={<div>데이터가 없습니다.</div>}>
    <div>데이터가 존재합니다.</div>
  </EmptyView>
);
```

