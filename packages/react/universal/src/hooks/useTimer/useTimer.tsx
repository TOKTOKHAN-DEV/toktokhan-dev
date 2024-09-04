import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import dayjs, { Dayjs } from 'dayjs'
import { useCallbackRef } from 'hooks/useCallbackRef'
import { createContextSelector } from 'utils/react/create-context-selector'

export interface TimerProps {
  /**
   * 타이머의 제한 시간(밀리초 단위)
   */
  timeLimit?: number

  /**
   * 타이머가 초기화 시 자동으로 시작될지 여부
   * @default true
   */
  autoStart?: boolean

  /**
   * 타이머가 업데이트되는 간격(밀리초 단위)
   * @default 1000ms
   */
  interval?: number

  /**
   * 시간을 표시하는 형식을 설정하는 함수
   * @default ()=>"mm:ss" 형식
   */
  setTimeFormat?: (time: number) => string

  /**
   * 시간이 종료되었을 때 호출되는 콜백 함수
   */
  onTimeOver?: () => void

  /**
   * 매 시간 업데이트 시 호출되는 콜백 함수
   */
  onTimeUpdate?: (time: number) => void
}

export type TimerStatus = 'RUNNING' | 'PAUSED' | 'STOPPED'

/**
 * 기본 시간 형식(mm:ss)으로 포맷팅하는 함수
 * @param time - 밀리초 단위의 시간
 * @example
 * ```tsx
 * import React from 'react';
 * import { useTimer } from '@toktokhan-dev/react-universal';
 *
 * const TimerComponent = () => {
 *   const { time, isEnd, start, pause, reset } = useTimer({
 *     autoStart: false,
 *     timeLimit: 1000 * 60 * 5, // 5분
 *   });
 *
 *   return (
 *     <div>
 *       <p>Remaining time: {time}</p>
 *       <button onClick={start}>Start Timer</button>
 *       <button onClick={pause}>Pause Timer</button>
 *       <button onClick={reset}>Reset Timer</button>
 *       {isEnd && <p>Timer ends</p>}
 *     </div>
 *   );
 * };
 *
 * export default TimerComponent;
 * ```
 */
const setDefaultTimeFormat = (time: number) => {
  const durationObj = dayjs(
    Math.ceil(time / 1000) * 1000,
    'millisecond',
  ).format('mm:ss')

  return durationObj
}

const initialProps: TimerProps = {
  autoStart: true,
  timeLimit: 1000 * 60,
  interval: 1000,
  setTimeFormat: setDefaultTimeFormat,
}

/**
 * @category Hooks/useTimer()
 * 타이머를 관리하는 커스텀 훅입니다.
 *
 */
export const useTimer = ({
  autoStart = true,
  timeLimit = 1000 * 60,
  interval = 1000,
  setTimeFormat = setDefaultTimeFormat,
  onTimeOver,
  onTimeUpdate,
}: TimerProps = initialProps) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const remainingTime = useRef(timeLimit)
  const lastUpdate = useRef<Dayjs | null>(null)

  const onTimeOverRef = useCallbackRef(onTimeOver || (() => {}))
  const onTimeUpdateRef = useCallbackRef(onTimeUpdate || (() => {}))

  const [time, setTime] = useState(timeLimit)
  const [status, setStatus] = useState<TimerStatus>('STOPPED')

  /**
   * 남은 시간을 업데이트하는 함수
   * @returns 업데이트된 남은 시간
   */
  const updateRemainingTime = useCallback(() => {
    if (lastUpdate.current) {
      const now = dayjs()
      const nowDiff = now.diff(lastUpdate.current, 'milliseconds')
      remainingTime.current = Math.max(0, remainingTime.current - nowDiff)
      lastUpdate.current = dayjs()
    }
    return remainingTime.current
  }, [])

  /**
   * 타이머를 초기 상태로 리셋하는 함수
   */
  const reset = useCallback(() => {
    remainingTime.current = timeLimit
    lastUpdate.current = null
    setStatus('STOPPED')
    setTime(timeLimit)
  }, [timeLimit])

  /**
   * 타이머를 시작하는 함수
   */
  const start = useCallback(() => {
    lastUpdate.current = dayjs()
    setStatus('RUNNING')
  }, [])

  /**
   * 타이머를 일시정지하는 함수
   */
  const pause = useCallback(() => {
    if (status === 'RUNNING') {
      updateRemainingTime()
      setStatus('PAUSED')
    }
  }, [status, updateRemainingTime])

  /**
   * 타이머를 중지하는 함수
   */
  const stop = useCallback(() => {
    setStatus('STOPPED')
  }, [])

  /**
   * 타이머를 재시작하는 함수
   */
  const restart = useCallback(() => {
    setTime(timeLimit)
    setStatus('RUNNING')
    remainingTime.current = timeLimit
    lastUpdate.current = dayjs()
  }, [timeLimit])

  // autoStart가 false일 경우 time초기화
  // true일 경우 start 함수 실행
  useEffect(() => {
    if (!autoStart) return setTime(timeLimit)
    start()
  }, [autoStart, start, timeLimit])

  useEffect(() => {
    if (status === 'RUNNING') {
      const update = () => {
        const newTime = updateRemainingTime()
        setTime(newTime)
        onTimeUpdateRef?.(newTime)

        if (newTime <= 0) {
          stop()
          onTimeOverRef?.()
          clearInterval(intervalRef.current!)
        }
      }
      update()
      intervalRef.current = setInterval(update, interval)
      return () => {
        clearInterval(intervalRef.current!)
      }
    }

    clearInterval(intervalRef.current!)

    return () => {
      clearInterval(intervalRef.current!)
    }
  }, [
    onTimeOverRef,
    onTimeUpdateRef,
    interval,
    status,
    stop,
    updateRemainingTime,
  ])

  const timeOutput = useMemo(() => setTimeFormat(time), [setTimeFormat, time])

  return {
    time: timeOutput,
    isEnd: time <= 0,
    start,
    restart,
    pause,
    reset,
  }
}

const TimerContextSelector = createContextSelector<
  ReturnType<typeof useTimer>,
  TimerProps
>(useTimer, initialProps)

/**
 * @category Hooks/useTimer()/Context(Optional)
 * 이 프로바이더는 타이머 상태를 컨텍스트를 통해 지역/전역적으로 관리할 수 있도록 해줍니다.
 *
 * @remarks 컨텍스트를 사용하지 않아도 타이머 훅을 직접 사용할 수 있으며, 컨텍스트가 필요한 경우에만 사용하시기 바랍니다.
 * 예를 들어, 다수의 컴포넌트에서 타이머 상태를 공유하거나, 전역적으로 타이머 상태를 관리해야 하는 경우에 유용합니다.
 *
 * @example
 * ```tsx
 * // TimerContainer.tsx
 * import React from 'react';
 * import { TimerProvider } from '@toktokhan-dev/react-universal';
 * import TimerDisplay from './TimerDisplay';
 *
 * const TimerContainer = () => {
 *   return (
 *     <TimerProvider
 *        params={{
 *          autoStart: false,
 *          timeLimit: 1000 * 5,
 *        }}
 *      >
 *       <TimerDisplay />
 *     </TimerProvider>
 *   );
 * };
 *
 * export default TimerContainer;
 *
 * // TimerDisplay.tsx
 * const TimerDisplay = () => {
 *   // 불필요한 리랜더링 방지를 위해 selector로 가져오시는 것을 권장합니다.
 *   const time = useTimerContext((ctx) => ctx?.time)
 *   const start = useTimerContext((ctx) => ctx?.start)
 *
 *   return (
 *     <div>
 *       <button onClick={start}>Start Timer</button>
 *       <p>Remaining Time: {time}</p>
 *     </div>
 *   );
 * };
 * ```
 */
export const TimerProvider = TimerContextSelector.Provider

/**
 * @category Hooks/useTimer()/Context(Optional)
 * 타이머 컨텍스트를 사용하는 커스텀 훅입니다. selector를 통해 컨텍스트의 값을 가져올 수 있습니다.
 *
 * @remarks 컨텍스트를 사용하지 않아도 타이머 훅을 직접 사용할 수 있으며, 컨텍스트가 필요한 경우에만 사용하시기 바랍니다.
 * 예를 들어, 다수의 컴포넌트에서 타이머 상태를 공유하거나, 전역적으로 타이머 상태를 관리해야 하는 경우에 유용합니다.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { useTimerContext } from '@toktokhan-dev/react-universal';
 *
 * const TimerDisplay = () => {
 *   // 불필요한 리랜더링 방지를 위해 selector로 가져오시는 것을 권장합니다.
 *   const time = useTimerContext((ctx) => ctx?.time)
 *   const start = useTimerContext((ctx) => ctx?.start)
 *
 *   return (
 *     <div>
 *       <button onClick={start}>Start Timer</button>
 *       <p>Remaining Time: {time}</p>
 *     </div>
 *   );
 * };
 *
 * export default TimerDisplay;
 * ```
 */
export const useTimerContext = TimerContextSelector.useContext

/**
 * @category Hooks/useTimer()/Context(Optional)
 * 타이머 컨텍스트를 제공하는 컴포넌트 HOC입니다.
 * 이 HOC를 사용하여 컴포넌트를 래핑하면, 해당 컴포넌트와 하위 컴포넌트에서 타이머 상태를 공유할 수 있습니다.
 *
 * @remarks 컨텍스트를 사용하지 않아도 타이머 훅을 직접 사용할 수 있으며, 컨텍스트가 필요한 경우에만 사용하시기 바랍니다.
 * 예를 들어, 다수의 컴포넌트에서 타이머 상태를 공유하거나, 전역적으로 타이머 상태를 관리해야 하는 경우에 유용합니다.
 *
 * @example
 * ```tsx
 * // TimerContainer.tsx
 * import React from 'react';
 * import { withTimerProvider, useTimerContext } from '@toktokhan-dev/react-universal';
 *
 * const TimerContainer = () => {
 *   return <TimerDisplay />;
 * };
 *
 * export default withTimerProvider(TimerContainer, {
 *  autoStart: false,
 *  timeLimit: 1000 * 5,
 * });
 *
 * // TimerDisplay.tsx
 * const TimerDisplay = () => {
 *   // 불필요한 리랜더링 방지를 위해 selector로 가져오시는 것을 권장합니다.
 *   const time = useTimerContext((ctx) => ctx?.time)
 *   const start = useTimerContext((ctx) => ctx?.start)
 *
 *   return (
 *     <div>
 *       <button onClick={start}>Start Timer</button>
 *       <p>Remaining Time: {time}</p>
 *     </div>
 *   );
 * };
 * ```
 */
export const withTimerProvider = TimerContextSelector.withProvider
