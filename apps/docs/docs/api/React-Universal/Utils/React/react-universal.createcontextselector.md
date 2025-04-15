---
id: react-universal.createcontextselector
title: CreateContextSelector()
sidebar_label: CreateContextSelector()
slug: /react-universal.createcontextselector
---





 Utils/React 커스텀 훅을 기반으로 컨텍스트와 관련된 유틸리티를 생성하는 함수입니다. 이 함수는 주어진 훅을 컨텍스트로 감싸는 `Provider`, `useContext` 훅, 그리고 컴포넌트를 컨텍스트로 감싸는 `withProvider` HOC를 반환합니다.

 T - 컨텍스트에서 사용할 데이터 타입  P - 훅의 파라미터 타입

## Signature

```typescript
createContextSelector: <T, P = undefined>(useHook: (param?: P) => T, initialProps?: P) => CreateContextSelectorReturn<T, P>
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

useHook


</td><td>

(param?: P) =&gt; T


</td><td>

컨텍스트에서 사용할 커스텀 훅


</td></tr>
<tr><td>

initialProps


</td><td>

P


</td><td>

_(Optional)_ `useHook`에 전달될 초기 파라미터 (선택적)


</td></tr>
</tbody></table>
## Returns

[CreateContextSelectorReturn](./react-universal.createcontextselectorreturn)&lt;T, P&gt;

`\{ useContext, Provider, withProvider \}` - 생성된 컨텍스트 유틸리티들

## Example


```tsx
// 커스텀 훅 정의
const useTimer = ({ timeLimit = 1000 }: { timeLimit?: number }) => {
  const [time, setTime] = useState(timeLimit);
  // 타이머 로직...
  return { time, start: () => { //타이머 시작 }};
};

// createContextSelector로 컨텍스트 유틸리티 생성
const { Provider: TimerProvider, useContext: useTimerContext } = createContextSelector(useTimer);

// 타이머를 표시하는 컴포넌트
const TimerDisplay = () => {
  const time = useTimerContext(ctx => ctx.time);
  return <div>Time: {time}</div>;
};

// 방법 1. TimerProvider로 감싸기
const App = () => (
  <TimerProvider params={{timeLimit: 1000}}>
    <TimerDisplay />
  </TimerProvider>
);

// 방법 2. withProvider로 컴포넌트 감싸기
const App = () => (
    <TimerDisplay />
);
export default withTimerProvider(App, { timeLimit: 1000 });
```

