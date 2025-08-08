---
id: react-universal.withtimerprovider
title: WithTimerProvider()
sidebar_label: WithTimerProvider()
slug: /react-universal.withtimerprovider
---





 Hooks/useTimer()/Context(Optional) 타이머 컨텍스트를 제공하는 컴포넌트 HOC입니다. 이 HOC를 사용하여 컴포넌트를 래핑하면, 해당 컴포넌트와 하위 컴포넌트에서 타이머 상태를 공유할 수 있습니다.

## Signature

```typescript
withTimerProvider: <C extends react.ComponentType<any>>(Component: C, params?: TimerProps | undefined) => (props: PropsOf<C>) => JSX.Element
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

Component


</td><td>

C


</td><td>


</td></tr>
<tr><td>

params


</td><td>

[TimerProps](./react-universal.timerprops) \| undefined


</td><td>

_(Optional)_


</td></tr>
</tbody></table>

## Returns

(props: [PropsOf](./react-universal.propsof)&lt;C&gt;) =&gt; JSX.Element

## Remarks

컨텍스트를 사용하지 않아도 타이머 훅을 직접 사용할 수 있으며, 컨텍스트가 필요한 경우에만 사용하시기 바랍니다. 예를 들어, 다수의 컴포넌트에서 타이머 상태를 공유하거나, 전역적으로 타이머 상태를 관리해야 하는 경우에 유용합니다.

## Example


```tsx
// TimerContainer.tsx
import React from 'react';
import { withTimerProvider, useTimerContext } from '@toktokhan-dev/react-universal';

const TimerContainer = () => {
  return <TimerDisplay />;
};

export default withTimerProvider(TimerContainer, {
 autoStart: false,
 timeLimit: 1000 * 5,
});

// TimerDisplay.tsx
const TimerDisplay = () => {
  // 불필요한 리랜더링 방지를 위해 selector로 가져오시는 것을 권장합니다.
  const time = useTimerContext((ctx) => ctx?.time)
  const start = useTimerContext((ctx) => ctx?.start)

  return (
    <div>
      <button onClick={start}>Start Timer</button>
      <p>Remaining Time: {time}</p>
    </div>
  );
};
```

