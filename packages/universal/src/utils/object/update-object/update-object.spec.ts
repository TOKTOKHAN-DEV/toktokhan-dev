import { updateObj } from './update-object'

describe('updateObj', () => {
  it('should update the value at the specified deep path in the object', () => {
    const data = { nested: { prop: 42 } }

    const updated1 = updateObj('nested.prop', 100, data)
    expect(updated1).toEqual({ nested: { prop: 100 } })

    const updated2 = updateObj('nested.prop', (prev) => prev + 1, data)
    expect(updated2).toEqual({ nested: { prop: 43 } })
  })

  it('should work correctly in curried form', () => {
    const data = { nested: { prop: 42 } }
    const updater = updateObj<typeof data>('nested.prop', 200)
    const updated = updater(data)

    expect(updated).toEqual({ nested: { prop: 200 } })
  })
})
