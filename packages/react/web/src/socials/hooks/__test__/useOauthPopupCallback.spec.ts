import { act } from 'react'

import '@testing-library/jest-dom'
import { renderHook, waitFor } from '@testing-library/react'

import { useOauthPopupCallback } from '../useOauthPopupCallback'
import { extractOAuthParams } from '../utils/extract-oauth-params'

jest.mock('../utils/extract-oauth-params', () => ({
  extractOAuthParams: jest.fn(),
}))

jest.mock('../../modules/SocialOauthInit', () => {
  return {
    decodeOAuthState: jest.fn().mockImplementation((state) => {
      return JSON.parse(state)
    }),
  }
})

describe('useOauthPopupCallback', () => {
  const mockSuccessCallback = jest.fn()
  const mockFailCallback = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    global.window.opener = {
      location: {
        href: 'http://test.com',
      },
      postMessage: jest.fn(),
    }
    jest.spyOn(window, 'close').mockImplementation(() => {})
  })

  afterEach(() => {
    delete global.window.opener
    jest.restoreAllMocks()
  })

  it('should handle successful OAuth response and close the popup correctly', async () => {
    jest.mocked(extractOAuthParams).mockReturnValue({
      access_token: 'xxx',
      code: null,
      state: JSON.stringify({
        returnUrl: '/home',
        type: 'kakao',
      }),
      error: null,
      errorDescription: null,
    })

    const { result } = renderHook(() =>
      useOauthPopupCallback({
        onSuccess: mockSuccessCallback,
        onFail: mockFailCallback,
      }),
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(mockSuccessCallback).toHaveBeenCalledTimes(1)
    expect(mockSuccessCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'xxx',
        error: null,
        errorDescription: null,
        state: { returnUrl: '/home', type: 'kakao' },
      }),
    )

    expect(mockFailCallback).not.toHaveBeenCalled()

    // still open when success
    expect(window.opener).not.toBeNull()
  })

  it('should close the popup correctly', () => {
    const closeSpy = jest.spyOn(window, 'close').mockImplementation(() => {})

    const { result } = renderHook(() =>
      useOauthPopupCallback({
        onSuccess: mockSuccessCallback,
        onFail: mockFailCallback,
      }),
    )

    act(() => {
      result.current.closePopup({ extra: 'hello parents' })
    })

    expect(global.window.opener?.postMessage).toHaveBeenCalledTimes(1)
    expect(closeSpy).toHaveBeenCalled()
    expect(closeSpy).toHaveBeenCalledTimes(1)
  })

  it('should handle OAuth error: errorDescription', async () => {
    const mockSuccessCallback = jest.fn()
    const mockFailCallback = jest.fn()

    jest.mocked(extractOAuthParams).mockReturnValue({
      access_token: 'xxx',
      code: null,
      state: JSON.stringify({
        returnUrl: '/home',
        type: 'kakao',
      }),
      error: null,
      errorDescription: 'Error accrued',
    })

    const { result } = renderHook(() =>
      useOauthPopupCallback({
        onSuccess: mockSuccessCallback,
        onFail: mockFailCallback,
      }),
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(mockFailCallback).toHaveBeenCalledTimes(1)
    expect(mockFailCallback).toHaveBeenCalledWith(
      expect.objectContaining({
        code: 'xxx',
        error: null,
        errorDescription: 'Error accrued',
        state: { returnUrl: '/home', type: 'kakao' },
      }),
    )
    expect(mockSuccessCallback).not.toHaveBeenCalled()
  })
})
