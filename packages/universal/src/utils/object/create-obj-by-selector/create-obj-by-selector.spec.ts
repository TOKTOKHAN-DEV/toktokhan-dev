import { createObjBySelector } from './create-obj-by-selector'

describe('createObjBySelector', () => {
  it('should create a new object based on selected properties', () => {
    const data = { a: 1, b: 2, c: 3 }

    const result = createObjBySelector(
      {
        sum: ({ a, b, c }) => a + b + c,
        product: ({ a, b, c }) => a * b * c,
      },
      data,
    )

    expect(result).toEqual({ sum: 6, product: 6 })
  })

  it('should work correctly in curried form', () => {
    const data = { a: 1, b: 2, c: 3 }

    const createObj = createObjBySelector<typeof data>({
      sum: ({ a, b, c }) => a + b + c,
      product: ({ a, b, c }) => a * b * c,
    })

    const result = createObj(data)

    expect(result).toEqual({ sum: 6, product: 6 })
  })
})
