import { removeEmptyObject } from './remove-empty-object'

describe('removeEmptyObject', () => {
  it('should remove empty objects from the input object', () => {
    const obj = {
      a: {
        b: {
          c: 1,
          d: {},
          e: {
            f: {},
          },
        },
        g: {},
      },
      h: {},
    }

    const result = removeEmptyObject(obj)

    expect(result).toEqual({
      a: {
        b: {
          c: 1,
        },
      },
    })
  })
})
