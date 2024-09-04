---
'@toktokhan-dev/react-universal': patch
---

## useTimer hook, context 추가

타이머를 관리하는 훅을 추가했습니다. 이 훅은 타이머의 시작, 일시정지, 리셋, 재시작 기능을 제공하며, 타이머의 남은 시간을 업데이트하고 형식을 설정할 수 있습니다.

전역/지역적으로 필요한 경우 사용할 수 있는 context를 제공합니다.

자세한 설명은 [TOKDOCS: useTimer 문서](https://toktokhan-dev-docs.vercel.app/docs/react-universal.usetimer)를 참고해주세요.

```tsx
import React from 'react'

import { useTimer } from '@toktokhan-dev/react-universal'

const TimerComponent = () => {
  const { time, isEnd, start, pause, reset } = useTimer({
    autoStart: false,
    timeLimit: 1000 * 60 * 5,
    interval: 1000,
    setTimeFormat: (time) => `${time}ms`,
    onTimeOver: ()=> console.log('time over'),
    onTimeUpdate: (time) -> console.log(`update: ${time}ms`)
  })

  return (
    <div>
      <p>Remaining Time: {time}</p>
      <button onClick={start}>Start Timer</button>
      <button onClick={pause}>Pause Timer</button>
      <button onClick={reset}>Reset Timer</button>
      {isEnd && <p>Timer ends</p>}
    </div>
  )
}

export default TimerComponent
```
