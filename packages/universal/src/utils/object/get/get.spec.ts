import { get } from './get'

describe('get', () => {
  const data: {
    user: {
      age?: number
      name: string
      address: {
        city: string
        zip: string
      }
    }
    posts: {
      id: number
      title: string
    }[]
  } = {
    user: {
      name: 'John Doe',
      address: {
        city: 'New York',
        zip: '10001',
      },
    },
    posts: [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ],
  }

  it('should return the correct value for a given key path', () => {
    expect(get('user.name', data)).toBe('John Doe')
    expect(get('user.address.city', data)).toBe('New York')
    expect(get('posts.0.title', data)).toBe('Post 1')
  })

  it('should return undefined for a non-existent key path', () => {
    expect(get('user.age', data)).toBeUndefined()
    expect(get('posts.2.title', data)).toBeUndefined()
  })

  it('should throw an error if the key is not a string', () => {
    expect(() => get(123 as any, data)).toThrow('key must be string')
  })

  it('should return a curried function when called with only a key', () => {
    const getUserName = get('user.name')
    expect(getUserName(data)).toBe('John Doe')

    const getPostTitle = get('posts.0.title')
    expect(getPostTitle(data)).toBe('Post 1')
  })

  it('should handle deep nested objects', () => {
    const deepData = {
      a: {
        b: {
          c: {
            d: 'deep value',
          },
        },
      },
    }
    expect(get('a.b.c.d', deepData)).toBe('deep value')
  })

  it('should return undefined for a key path that does not exist deeply', () => {
    const deepData: {
      a: {
        b: {
          c?: {
            d: string
            e?: string
          }
        }
      }
    } = {
      a: {
        b: {
          c: {
            d: 'deep value',
          },
        },
      },
    }
    expect(get('a.b.c.e', deepData)).toBeUndefined()
  })
})
