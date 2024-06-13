import { effect } from './effect'

describe('effect', () => {
  it('should call the function with the provided argument and return the same argument', () => {
    const mockFn = jest.fn()
    const arg = 'test'

    const result = effect(mockFn, arg)

    expect(mockFn).toHaveBeenCalledWith(arg)
    expect(result).toBe(arg)
  })

  it('should return a function if only the function is provided', () => {
    const mockFn = jest.fn()
    const returnedFn = effect(mockFn)

    expect(typeof returnedFn).toBe('function')

    const arg = 'test'
    const result = returnedFn(arg)

    expect(mockFn).toHaveBeenCalledWith(arg)
    expect(result).toBe(arg)
  })
})
