import { act } from 'react'

import { renderHook } from '@testing-library/react'

// Adjust the path as necessary.
import dayjs from 'dayjs'

import { useTimer } from './useTimer'

describe('useTimer', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.useRealTimers()
  })

  it('Timer starts automatically when autoStart is true', () => {
    const { result } = renderHook(() => useTimer({ autoStart: true }))
    expect(result.current.isEnd).toBe(false)

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(result.current.time).toBe('00:59')
  })

  it('Timer does not start automatically when autoStart is false', () => {
    const { result } = renderHook(() => useTimer({ autoStart: false }))
    expect(result.current.time).toBe('01:00')
  })

  it('Timer pauses correctly', () => {
    const { result } = renderHook(() => useTimer({ autoStart: true }))

    act(() => {
      jest.advanceTimersByTime(3000)
      result.current.pause()
    })

    expect(result.current.time).toBe('00:57')

    act(() => {
      jest.advanceTimersByTime(3000)
    })

    expect(result.current.time).toBe('00:57')
  })

  it('Timer resets correctly', () => {
    const { result } = renderHook(() => useTimer({ autoStart: true }))

    act(() => {
      jest.advanceTimersByTime(5000)
      result.current.reset()
    })

    expect(result.current.time).toBe('01:00')
  })

  it('Timer triggers onTimeOver callback when time is up', () => {
    const onTimeOverMock = jest.fn()

    const { result } = renderHook(() =>
      useTimer({
        autoStart: true,
        timeLimit: 3000,
        onTimeOver: onTimeOverMock,
      }),
    )

    act(() => {
      jest.advanceTimersByTime(3000)
    })

    expect(onTimeOverMock).toHaveBeenCalledTimes(1)
    expect(result.current.isEnd).toBe(true)
  })

  it('Timer triggers onTimeUpdate callback when time is updating', () => {
    const onTimeUpdateMock = jest.fn(
      (time: number) => `remaining time: ${time}ms`,
    )

    const { result } = renderHook(() =>
      useTimer({
        autoStart: true,
        timeLimit: 3000,
        onTimeUpdate: onTimeUpdateMock,
      }),
    )

    act(() => {
      jest.advanceTimersByTime(3000)
    })

    expect(onTimeUpdateMock).toHaveBeenCalledTimes(4)

    expect(onTimeUpdateMock).toHaveBeenNthCalledWith(1, 3000)
    expect(onTimeUpdateMock).toHaveReturnedWith('remaining time: 3000ms')
    expect(onTimeUpdateMock).toHaveBeenNthCalledWith(2, 2000)
    expect(onTimeUpdateMock).toHaveReturnedWith('remaining time: 2000ms')
    expect(onTimeUpdateMock).toHaveBeenNthCalledWith(3, 1000)
    expect(onTimeUpdateMock).toHaveReturnedWith('remaining time: 1000ms')
    expect(onTimeUpdateMock).toHaveBeenNthCalledWith(4, 0)
    expect(onTimeUpdateMock).toHaveReturnedWith('remaining time: 0ms')

    expect(result.current.isEnd).toBe(true)
  })

  it('Custom time format function works correctly', () => {
    const customFormat = jest.fn((time) => `Remaining: ${time / 1000} seconds`)

    const { result } = renderHook(() =>
      useTimer({ autoStart: true, setTimeFormat: customFormat }),
    )

    expect(customFormat).toHaveBeenCalledWith(60000)
    expect(result.current.time).toBe('Remaining: 60 seconds')

    act(() => {
      jest.advanceTimersByTime(1000)
    })

    expect(customFormat).toHaveBeenCalledWith(59000)
    expect(result.current.time).toBe('Remaining: 59 seconds')
  })

  it('Custom timeLimit works correctly', () => {
    const { result } = renderHook(() =>
      useTimer({ autoStart: true, timeLimit: 1000 * 5 }),
    )
    expect(result.current.time).toBe('00:05')
  })

  it('Custom interval works correctly', () => {
    const { result } = renderHook(() =>
      useTimer({ autoStart: true, interval: 2000 }),
    )

    act(() => jest.advanceTimersByTime(1000))
    expect(result.current.time).toBe('01:00')

    act(() => jest.advanceTimersByTime(1000))
    expect(result.current.time).toBe('00:58')
  })
})
