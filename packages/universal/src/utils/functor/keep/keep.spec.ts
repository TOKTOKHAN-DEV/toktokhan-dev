import { flow } from 'lodash/fp'

import { Keep_F, keep } from './keep'

describe('Keep_F', () => {
  it('should create a Keep_F instance with correct properties', () => {
    const keeper = new Keep_F(5, 10)
    expect(keeper.kept).toBe(5)
    expect(keeper.value).toBe(10)
  })

  it('should create a Keep_F instance with correct properties when using "of" method', () => {
    const keeper = new Keep_F(5, 10)
    const newKeeper = keeper.of(20)
    expect(newKeeper.kept).toBe(5)
    expect(newKeeper.value).toBe(20)
  })

  it('should correctly map over a Keep_F instance', () => {
    const keeper = new Keep_F(5, 10)
    const mappedKeeper = keeper
      .map((value) => value * 2)
      .map((value, kept) => value * kept)

    expect(mappedKeeper.kept).toBe(5)
    expect(mappedKeeper.value).toBe(100)
  })
})

describe('keep', () => {
  it('should create a Keep_F instance with correct properties', () => {
    const keeper = keep(5)
    expect(keeper.kept).toBe(5)
    expect(keeper.value).toBe(5)
  })

  it('should create a Keep_F instance with correct properties when using "of" function', () => {
    const keeper = keep(5)
    const newKeeper = keep.of(10, keeper)
    expect(newKeeper.kept).toBe(5)
    expect(newKeeper.value).toBe(10)
  })

  it('should correctly map over a Keep_F instance', () => {
    const keeper = keep(5)
    const mappedKeeper = keep.map((value, kept) => value * kept, keeper)
    expect(mappedKeeper.kept).toBe(5)
    expect(mappedKeeper.value).toBe(25)
  })

  it('should get value from a Keep_F instance', () => {
    const keeper = keep(5)
    const value = keep.value(keeper)
    expect(value).toBe(5)
  })

  it('curried function chaining with lodash flow', () => {
    const testFlow = flow(
      keep<number>,
      keep.map((value) => value + value),
      keep.map((value) => value * 2),
      keep.map((value, kept) => value + kept),
      keep.value,
    )
    const result = testFlow(5)

    expect(result).toBe(25)
  })
})
