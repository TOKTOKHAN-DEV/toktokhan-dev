import { act } from 'react'

import { renderHook } from '@testing-library/react'

import { useCallbackRef } from './useCallbackRef'

describe('useCallbackRef', () => {
  it('should return a memoized callback', () => {
    const cb = jest.fn()

    const { rerender, result } = renderHook((cb) => useCallbackRef(cb), {
      initialProps: cb,
    })
    // Initial call
    act(() => result.current())
    expect(cb).toHaveBeenCalledTimes(1)

    // Act twice with the same callback
    act(() => result.current())
    expect(cb).toHaveBeenCalledTimes(2)

    // Rerender with a new callback
    const updatedCb = jest.fn()

    rerender(updatedCb)
    act(() => result.current())

    expect(updatedCb).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledTimes(2) // Ensure cb is not called again
  })

  it('should use new callback if provided', () => {
    const cb = jest.fn()
    const updatedCb = jest.fn()

    const { rerender, result } = renderHook((cb) => useCallbackRef(cb), {
      initialProps: cb,
    })

    // Initial call
    act(() => result.current())
    expect(cb).toHaveBeenCalledTimes(1)

    // Rerender with a new callback
    rerender(updatedCb)
    act(() => result.current())

    expect(updatedCb).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledTimes(1) // Ensure cb is not called again
  })

  it('should not recreate callback if it does not change', () => {
    const cb = jest.fn()

    const { rerender, result } = renderHook((cb) => useCallbackRef(cb), {
      initialProps: cb,
    })

    // Call with the same callback
    act(() => result.current())
    expect(cb).toHaveBeenCalledTimes(1)

    // Rerender with the same callback
    act(() => result.current())
    expect(cb).toHaveBeenCalledTimes(2)

    // Rerender with the same callback
    rerender(cb)
    act(() => result.current())
    expect(cb).toHaveBeenCalledTimes(3)
  })
})
