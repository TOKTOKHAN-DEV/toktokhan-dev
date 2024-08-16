import { act } from 'react'

import { renderHook } from '@testing-library/react'

import { ERROR_MESSAGES, useOauthPopupListener } from '../useOauthPopupListener'

export type OauthCallback = {
  returnUrl: string
  type: string
}

describe('useOauthPopupListener', () => {
  const mockSuccessCallback = jest.fn()
  const mockFailCallback = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const testCase = <T extends ReturnType<typeof useOauthPopupListener>>(
    message: MessageEventInit,
    afterOnMessage: (result: T) => void,
  ) => {
    const { result } = renderHook(() =>
      useOauthPopupListener<OauthCallback>({
        onSuccess: mockSuccessCallback,
        onFail: mockFailCallback,
      }),
    )

    expect(result.current.isLoading).toBe(true)

    act(() => {
      window.dispatchEvent(new MessageEvent('message', message))
    })

    afterOnMessage(result.current as T)
  }

  describe('success cases', () => {
    it('should handle successful OAuth response', () => {
      const data = {
        type: 'oauth',
        code: 'xxx',
        error: null,
        errorDescription: null,
        state: { returnUrl: '/home', type: 'kakao' },
        extra: 'hello parent!!!!!',
      }
      testCase(
        {
          data,
          origin: window.location.origin,
        },
        (result) => {
          expect(result.isLoading).toBe(false)
          expect(result.data).toEqual(data)

          expect(mockSuccessCallback).toHaveBeenCalledTimes(1)
          expect(mockSuccessCallback).toHaveBeenCalledWith(data)
          expect(mockFailCallback).not.toHaveBeenCalled()
        },
      )
    })
  })

  describe('failure cases', () => {
    it('should handle OAuth error response', () => {
      testCase(
        {
          data: {
            type: 'oauth',
            code: 'authorization_code',
            error: null,
            errorDescription: 'Error Accrued',
            state: { returnUrl: '/home', type: 'kakao' },
            extra: 'extra data',
          },
          origin: window.location.origin,
        },
        (result) => {
          expect(result.isLoading).toBe(false)
          expect(mockSuccessCallback).not.toHaveBeenCalled()
          expect(mockFailCallback).toHaveBeenCalledWith(
            expect.objectContaining({
              errorDescription: result.data?.errorDescription,
            }),
          )
        },
      )
    })
    it('should not handle messages from a different origin', () => {
      testCase(
        {
          data: {
            type: 'oauth',
            code: 'authorization_code',
            error: null,
            errorDescription: 'Error Accrued',
            state: { returnUrl: '/home', type: 'kakao' },
            extra: 'extra data',
          },
          origin: 'http://another.origin',
        },
        (result) => {
          expect(result.isLoading).toBe(false)
          expect(mockSuccessCallback).not.toHaveBeenCalled()
          expect(mockFailCallback).toHaveBeenCalledTimes(1)
          expect(mockFailCallback).toHaveBeenCalledWith(
            expect.objectContaining({
              errorDescription: ERROR_MESSAGES.ORIGIN_MISMATCH,
            }),
          )
        },
      )
    })
    it('should not handle messages from a empty code', () => {
      testCase(
        {
          data: {
            type: 'oauth',
            code: null,
            error: null,
            errorDescription: null,
            state: { returnUrl: '/home', type: 'kakao' },
            extra: 'extra data',
          },
          origin: window.location.origin,
        },
        (result) => {
          expect(result.isLoading).toBe(false)
          expect(mockSuccessCallback).not.toHaveBeenCalled()
          expect(mockFailCallback).toHaveBeenCalledTimes(1)
          expect(mockFailCallback).toHaveBeenCalledWith(
            expect.objectContaining({
              errorDescription: ERROR_MESSAGES.NO_AUTH_CODE,
            }),
          )
        },
      )
    })

    it('should not handle messages with incorrect type', () => {
      testCase(
        {
          data: {
            type: 'not_oauth',
            code: 'authorization_code',
            error: null,
            errorDescription: null,
            state: { returnUrl: '/home', type: 'kakao' },
            extra: 'extra data',
          },
          origin: window.location.origin,
        },
        (result) => {
          expect(result.isLoading).toBe(true)
          expect(mockSuccessCallback).not.toHaveBeenCalled()
          expect(mockFailCallback).not.toHaveBeenCalled()
        },
      )
    })
  })
})
