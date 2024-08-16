import { renderHook, waitFor } from '@testing-library/react'

import { useOauthLinkCallback } from '../useOauthLinkCallback'
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
describe('useOauthLinkCallback', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should handle successful OAuth response', async () => {
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
      errorDescription: null,
    })

    const { result } = renderHook(() =>
      useOauthLinkCallback({
        onSuccess: mockSuccessCallback,
        onFail: mockFailCallback,
      }),
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toEqual({
      code: 'xxx',
      error: null,
      errorDescription: null,
      state: { returnUrl: '/home', type: 'kakao' },
    })

    expect(mockSuccessCallback).toHaveBeenCalledWith({
      code: 'xxx',
      error: null,
      errorDescription: null,
      state: { returnUrl: '/home', type: 'kakao' },
    })

    expect(mockFailCallback).not.toHaveBeenCalled()
  })

  it('should handle OAuth error: access_token, code null', async () => {
    const mockSuccessCallback = jest.fn()
    const mockFailCallback = jest.fn()

    jest.mocked(extractOAuthParams).mockReturnValue({
      access_token: null,
      code: null,
      state: JSON.stringify({
        returnUrl: '/home',
        type: 'kakao',
      }),
      error: null,
      errorDescription: 'Error accrued',
    })

    const { result } = renderHook(() =>
      useOauthLinkCallback({
        onSuccess: mockSuccessCallback,
        onFail: mockFailCallback,
      }),
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toEqual({
      code: null,
      error: null,
      errorDescription: 'Error accrued',
      state: { returnUrl: '/home', type: 'kakao' },
    })

    expect(mockFailCallback).toHaveBeenCalledWith({
      code: null,
      error: null,
      errorDescription: 'Error accrued',
      state: { returnUrl: '/home', type: 'kakao' },
    })

    expect(mockSuccessCallback).not.toHaveBeenCalled()
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
      useOauthLinkCallback({
        onSuccess: mockSuccessCallback,
        onFail: mockFailCallback,
      }),
    )

    await waitFor(() => expect(result.current.isLoading).toBe(false))

    expect(result.current.data).toEqual({
      code: 'xxx',
      error: null,
      errorDescription: 'Error accrued',
      state: { returnUrl: '/home', type: 'kakao' },
    })

    expect(mockFailCallback).toHaveBeenCalledWith({
      code: 'xxx',
      error: null,
      errorDescription: 'Error accrued',
      state: { returnUrl: '/home', type: 'kakao' },
    })

    expect(mockSuccessCallback).not.toHaveBeenCalled()
  })

  // it('should handle loading state correctly', async () => {
  //   const mockExtractOAuthParams = jest.mocked(extractOAuthParams)

  //   mockExtractOAuthParams.mockReturnValue({
  //     access_token: null,
  //     code: null,
  //     state: null,
  //     error: null,
  //     errorDescription: null,
  //   })

  //   const { result } = renderHook(() => useOauthLinkCallback())

  //   mockExtractOAuthParams.mockReturnValue({
  //     access_token: 'xxx',
  //     code: null,
  //     state: JSON.stringify({
  //       returnUrl: '/home',
  //       type: 'kakao',
  //     }),
  //     error: null,
  //     errorDescription: null,
  //   })

  //   await waitFor(
  //     () => {
  //       expect(result.current.isLoading).toBe(false)
  //       expect(mockExtractOAuthParams).not.toBeNull()
  //     },
  //     {
  //       timeout: 3000,
  //     },
  //   )

  //   expect(result.current.isLoading).toBe(false)
  // })
})
