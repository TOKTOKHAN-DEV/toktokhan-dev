---
id: react-universal.usetimercontext
title: UseTimerContext()
sidebar_label: UseTimerContext()
slug: /react-universal.usetimercontext
---





 Hooks/useTimer()/Context(Optional) 타이머 컨텍스트를 사용하는 커스텀 훅입니다. selector를 통해 컨텍스트의 값을 가져올 수 있습니다.

## Signature

```typescript
useTimerContext: <Selected>(selector: (value: {
  time: string;
  isEnd: boolean;
  start: () => void;
  restart: () => void;
  pause: () => void;
  reset: () => void;
}) => Selected) => Selected
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

selector


</td><td>

(value: \{ time: string; isEnd: boolean; start: () =&gt; void; restart: () =&gt; void; pause: () =&gt; void; reset: () =&gt; void; \}) =&gt; Selected


</td><td>


</td></tr>
</tbody></table>

## Returns

Selected

## Remarks

컨텍스트를 사용하지 않아도 타이머 훅을 직접 사용할 수 있으며, 컨텍스트가 필요한 경우에만 사용하시기 바랍니다. 예를 들어, 다수의 컴포넌트에서 타이머 상태를 공유하거나, 전역적으로 타이머 상태를 관리해야 하는 경우에 유용합니다.

## Example


```tsx
import React from 'react';
import { useTimerContext } from '@toktokhan-dev/react-universal';

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

export default TimerDisplay;
```

