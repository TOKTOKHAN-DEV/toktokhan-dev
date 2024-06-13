import { Obj } from '../../../types'
import { volumeUpObject } from './volume-up-object'

describe('volumeUpObject', () => {
  it('should return object with increased volume', () => {
    const obj = {
      //
      a: 1,
      'b.1': 3,
      'b.2': 4,
      'c.1.1': 6,
    }
    const result = volumeUpObject('.', obj)

    expect(result).toEqual({
      a: 1,
      b: {
        1: 3,
        2: 4,
      },
      c: {
        1: {
          1: 6,
        },
      },
    })
  })

  it('should return object with increased volume', () => {
    const obj = {
      //
      a: 1,
      b_1: 3,
      b_2: 4,
      c_1_1: 6,
    }
    const result = volumeUpObject('_', obj)

    expect(result).toEqual({
      a: 1,
      b: {
        1: 3,
        2: 4,
      },
      c: {
        1: {
          1: 6,
        },
      },
    })
  })
})
