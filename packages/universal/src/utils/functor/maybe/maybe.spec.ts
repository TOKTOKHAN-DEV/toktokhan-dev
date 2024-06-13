import { Maybe_F, maybe } from './maybe'

describe('Maybe_F class', () => {
  test('of method', () => {
    const val = 42
    const maybeVal = Maybe_F.of(val)
    expect(maybeVal.$value).toBe(val)
  })

  test('map method with value', () => {
    const val = 42
    const maybeVal = Maybe_F.of(val)
    const mappedMaybe = maybeVal.map((value) => value * 2)
    expect(mappedMaybe.$value).toBe(84)
  })

  test('map method with null value', () => {
    const maybeVal = Maybe_F.of(null)
    const mappedMaybe = maybeVal.map(
      (value) => (value as unknown as number) * 2,
    )
    expect(mappedMaybe.$value).toBeNull()
  })

  test('map method with undefined value', () => {
    const maybeVal = Maybe_F.of(undefined)
    const mappedMaybe = maybeVal.map(
      (value) => (value as unknown as number) * 2,
    )
    expect(mappedMaybe.$value).toBeUndefined()
  })
})

describe('maybe function', () => {
  test('wrapping value', () => {
    const val = 42
    const maybeVal = maybe(val)
    expect(maybeVal.$value).toBe(val)
  })

  test('map method with value', () => {
    const val = 42
    const maybeVal = maybe(val)
    const mappedMaybe = maybe.map((value: number) => value * 2)(maybeVal)
    expect(mappedMaybe.$value).toBe(84)
  })

  test('map method with null value', () => {
    const maybeVal = maybe(null)
    const mappedMaybe = maybe.map((value: number) => value * 2)(maybeVal as any)
    expect(mappedMaybe.$value).toBeNull()
  })

  test('map method with undefined value', () => {
    const maybeVal = maybe(undefined)
    const mappedMaybe = maybe.map((value: number) => value * 2)(maybeVal as any)
    expect(mappedMaybe.$value).toBeUndefined()
  })
})
