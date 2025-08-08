---
id: react-universal.usetimer
title: UseTimer()
sidebar_label: UseTimer()
slug: /react-universal.usetimer
---





 Hooks/useTimer() 타이머를 관리하는 커스텀 훅입니다.

## Signature

```typescript
useTimer: ({
  autoStart,
  timeLimit,
  interval,
  setTimeFormat,
  onTimeOver,
  onTimeUpdate
}?: TimerProps) => {
  time: string;
  isEnd: boolean;
  start: () => void;
  restart: () => void;
  pause: () => void;
  reset: () => void;
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

\{ autoStart, timeLimit, interval, setTimeFormat, onTimeOver, onTimeUpdate\}


</td><td>

[TimerProps](./react-universal.timerprops)


</td><td>

_(Optional)_


</td></tr>
</tbody></table>

## Returns

\{ time: string; isEnd: boolean; start: () =&gt; void; restart: () =&gt; void; pause: () =&gt; void; reset: () =&gt; void; \}

