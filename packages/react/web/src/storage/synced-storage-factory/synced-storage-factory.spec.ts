import { Cookies } from 'react-cookie'

import { SyncedStorageFactory } from './synced-storage-factory'

// Mock the react-cookie module
jest.mock('react-cookie', () => {
  const mCookies = {
    get: jest.fn(),
    set: jest.fn(),
    remove: jest.fn(),
  }
  return {
    Cookies: jest.fn(() => mCookies),
  }
})

describe('SyncedStorageFactory', () => {
  let mockSet: jest.Mock
  let mockRemove: jest.Mock
  let cookiesInstance: jest.Mocked<Cookies>

  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    jest.clearAllMocks()

    const { Cookies } = require('react-cookie')
    cookiesInstance = new Cookies() as jest.Mocked<Cookies>
    mockSet = cookiesInstance.set as jest.Mock
    mockRemove = cookiesInstance.remove as jest.Mock
  })

  it('should create local storage', () => {
    const { storage, connector } = SyncedStorageFactory.createLocal<{
      value: number
    }>('test')

    expect(storage?.key).toBe('test')
    expect(storage?.get()).toBe(null)
    expect(connector.listeners.length).toBe(0)

    const unsubscribe = connector.subscribe(() => {})
    expect(connector.listeners.length).toBe(1)

    unsubscribe()
    expect(connector.listeners.length).toBe(0)
  })

  it('should create session storage', () => {
    const { storage, connector } = SyncedStorageFactory.createSession<{
      value: number
    }>('test')

    expect(storage?.key).toBe('test')
    expect(storage?.get()).toBe(null)
    expect(connector.listeners.length).toBe(0)

    const unsubscribe = connector.subscribe(() => {})
    expect(connector.listeners.length).toBe(1)

    unsubscribe()
    expect(connector.listeners.length).toBe(0)
  })

  it('should create null storage if store is null', () => {
    const { storage, connector } = SyncedStorageFactory.create<{
      value: number
    }>('test', null)

    expect(storage).toBe(null)
    expect(connector.listeners.length).toBe(0)

    const unsubscribe = connector.subscribe(() => {})
    expect(connector.listeners.length).toBe(0)

    unsubscribe()
    expect(connector.listeners.length).toBe(0)
  })

  it('should create cookie storage', () => {
    const { storage, connector } = SyncedStorageFactory.createCookie<{
      value: number
    }>('testKey', { path: '/testPath' })

    expect(storage?.key).toBe('testKey')
    expect(storage?.get()).toBe(null)
    expect(connector.listeners.length).toBe(0)

    const unsubscribe = connector.subscribe(() => {})
    expect(connector.listeners.length).toBe(1)

    storage?.set({ value: 42 }, { path: '/newPath' })
    expect(mockSet).toHaveBeenCalledWith(
      'testKey',
      { value: 42 },
      {
        path: '/newPath',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      },
    )

    storage?.remove({ path: '/newPath' })
    expect(mockRemove).toHaveBeenCalledWith('testKey', {
      path: '/newPath',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })

    unsubscribe()
    expect(connector.listeners.length).toBe(0)
  })
})
