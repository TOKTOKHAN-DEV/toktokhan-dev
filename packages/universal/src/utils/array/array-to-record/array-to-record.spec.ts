import { arrayToRecord } from './array-to-record'

type Person = {
  id: number
  name: string
}

describe('arrayToRecord', () => {
  it('should convert array to record', () => {
    const people: Person[] = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Mike' },
    ]

    const expected = {
      1: { id: 1, name: 'John' },
      2: { id: 2, name: 'Jane' },
      3: { id: 3, name: 'Mike' },
    }

    const getKey = (person: Person) => person.id

    const record = arrayToRecord(getKey, people)
    const record2 = arrayToRecord(getKey)(people)

    expect(record).toEqual(expected)
    expect(record2).toEqual(expected)
  })

  it('should return an empty object for an empty array', () => {
    const emptyArray: Person[] = []
    const getKey = (person: Person) => person.id

    const record = arrayToRecord(getKey, emptyArray)
    const record2 = arrayToRecord(getKey)(emptyArray)

    expect(record).toEqual({})
    expect(record2).toEqual({})
  })

  it('should handle duplicate keys by keeping the last occurrence', () => {
    const people: Person[] = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 1, name: 'Mike' },
    ]
    const expected = {
      1: { id: 1, name: 'Mike' },
      2: { id: 2, name: 'Jane' },
    }

    const getKey = (person: Person) => person.id

    const record = arrayToRecord(getKey, people)
    const record2 = arrayToRecord(getKey)(people)

    expect(record).toEqual(expected)
    expect(record2).toEqual(expected)
  })
})
