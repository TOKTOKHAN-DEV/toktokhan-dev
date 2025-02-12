---
id: react-web.useintersectionobserver
title: UseIntersectionObserver()
sidebar_label: UseIntersectionObserver()
slug: /react-web.useintersectionobserver
---





반환한 targetRef를 사용하여 대상 컴포넌트에 intersectionObserver 이벤틀르 주기 위한 hooks입니다.

hooks 선언시 props 설정이 가능하며, 화면에 표출되는 조건에 따라 onVisible, onHidden 함수가 실행됩니다.

## Signature

```typescript
useIntersectionObserver: ({
  onVisible,
  onHidden,
  options
}: UseIntersectionObserverParams, deps: unknown[]) => {
  targetRef: react.RefObject<HTMLElement>;
}
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

\{ onVisible, onHidden, options\}


</td><td>

UseIntersectionObserverParams


</td><td>


</td></tr>
<tr><td>

deps


</td><td>

unknown[]


</td><td>


</td></tr>
</tbody></table>
## Returns

\{ targetRef: react.RefObject&lt;HTMLElement&gt;; \}

intersection Observer 이벤트가 할당된 Element useRef

## Example


```tsx

const { targetRef } = useIntersectionObserver(
  {
    onVisible: () => onVisibleLast(),
    onHidden: () => onHiddenLast(),
    options: {
      threshold: 0.1,
    },
  },
  [],
);
...

return (
 <LastItem ref={targetRef} w="100%" />
)

```

