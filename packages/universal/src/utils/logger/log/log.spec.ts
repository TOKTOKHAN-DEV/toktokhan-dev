import { log } from './log'

describe('log', () => {
  let consoleLogSpy: jest.SpyInstance

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleLogSpy.mockRestore()
  })

  it('should log the title and value and return the value', () => {
    const result = log('Title:', 42)
    expect(consoleLogSpy).toHaveBeenCalledWith('Title:', 42)
    expect(result).toBe(42)
  })

  it('should log the title and value when curried', () => {
    const logWithTitle = log('Title:')
    const result = logWithTitle(42)
    expect(consoleLogSpy).toHaveBeenCalledWith('Title:', 42)
    expect(result).toBe(42)
  })
})
