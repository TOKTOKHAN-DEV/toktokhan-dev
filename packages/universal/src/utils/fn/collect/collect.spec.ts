import { collect } from './collect'

describe('collect', () => {
  it('should collect arguments', () => {
    expect(collect(1, 2, 3)).toEqual([1, 2, 3])
  })
})
