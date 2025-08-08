---
id: react-universal.timerprovider
title: TimerProvider()
sidebar_label: TimerProvider()
slug: /react-universal.timerprovider
---





 Hooks/useTimer()/Context(Optional) 이 프로바이더는 타이머 상태를 컨텍스트를 통해 지역/전역적으로 관리할 수 있도록 해줍니다.

## Signature

```typescript
TimerProvider: ({
  children,
  params
}: {
  children: react.ReactNode;
  params?: TimerProps | undefined;
}) => JSX.Element
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

\{ children, params\}


</td><td>

\{ children: react.ReactNode; params?: [TimerProps](./react-universal.timerprops) \| undefined; \}


</td><td>


</td></tr>
</tbody></table>

## Returns

JSX.Element

## Remarks

컨텍스트를 사용하지 않아도 타이머 훅을 직접 사용할 수 있으며, 컨텍스트가 필요한 경우에만 사용하시기 바랍니다. 예를 들어, 다수의 컴포넌트에서 타이머 상태를 공유하거나, 전역적으로 타이머 상태를 관리해야 하는 경우에 유용합니다.

## Example


```tsx
// TimerContainer.tsx
import React from 'react';
import { TimerProvider } from '@toktokhan-dev/react-universal';
import TimerDisplay from './TimerDisplay';

const TimerContainer = () => {
  return (
    <TimerProvider
       params={{
         autoStart: false,
         timeLimit: 1000 * 5,
       }}
     >
      <TimerDisplay />
    </TimerProvider>
  );
};

export default TimerContainer;

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

