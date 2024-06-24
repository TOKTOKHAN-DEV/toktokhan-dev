import { Cookies } from 'react-cookie'

import { SyncedCookie } from './synced-cookie'

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

describe('SyncedCookie', () => {
  let cookies: jest.Mocked<Cookies>
  let syncedCookie: SyncedCookie<string>

  beforeEach(() => {
    cookies = new Cookies() as jest.Mocked<Cookies>
    syncedCookie = new SyncedCookie('testKey')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should initialize with default options', () => {
    expect(syncedCookie.defaultOptions).toEqual({
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })
  })

  it('should get the correct value from cookies', () => {
    cookies.get.mockReturnValue('testValue')
    const value = syncedCookie.get()
    expect(value).toBe('testValue')
    expect(cookies.get).toHaveBeenCalledWith('testKey')
  })

  it('should return null if the cookie value is not valid', () => {
    cookies.get.mockReturnValue(null)
    const value = syncedCookie.get()
    expect(value).toBeNull()
    expect(cookies.get).toHaveBeenCalledWith('testKey')
  })

  it('should set the cookie with the correct value and options', () => {
    const data = 'newValue'
    const options = { path: '/newPath' }
    syncedCookie.set(data, options)
    expect(cookies.set).toHaveBeenCalledWith('testKey', data, {
      ...syncedCookie.defaultOptions,
      ...options,
    })
  })

  it('should remove the cookie with the correct options', () => {
    const options = { path: '/newPath' }
    syncedCookie.remove(options)
    expect(cookies.remove).toHaveBeenCalledWith('testKey', {
      ...syncedCookie.defaultOptions,
      ...options,
    })
  })
})
