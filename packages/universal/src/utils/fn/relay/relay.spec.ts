import { range } from 'lodash'

import { paginate } from '../../array'
import { relay } from './relay'

describe('relay', () => {
  let list: number[] = []
  beforeEach(() => {
    list = []
  })

  const getList = async (params: { offset: number; limit: number }) => {
    const { offset, limit } = params
    const next = offset + limit
    return {
      total: list.length,
      next: list.length - 1 < next ? null : next,
      data: list.slice(offset, offset + limit),
    }
  }
  it('should fetch multiple pages of data successfully', async () => {
    list = range(0, 100)

    const result = await relay({
      initialParam: 0,
      getNext: (nextParam: number) => getList({ offset: nextParam, limit: 10 }),
      getNextParams: (last) => {
        return last?.next
      },
    })

    const data = await Promise.all(
      paginate(10, list).map((_, i) => getList({ offset: i * 10, limit: 10 })),
    )

    expect(result).toEqual(data)
  })

  it('should correctly apply a selector function to the data', async () => {
    list = range(0, 100)

    const result = await relay({
      initialParam: 0,
      getNext: (nextParam: number) => getList({ offset: nextParam, limit: 10 }),
      getNextParams: (last) => {
        return last?.next
      },
      selector: (pages) => pages.map((p) => p.data),
    })

    expect(result).toEqual(paginate(10, list))
  })
})
