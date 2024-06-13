import { delay } from '../delay'
import { retryReqeustManager } from './retry-reqeust-manager'

describe('retryReqeustManager', () => {
  let opt: {
    getToken: jest.Mock<Promise<string>, []>
    onRefetch: jest.Mock<any, [string]>
    onError: jest.Mock<any, [any]>
  }

  beforeEach(() => {
    jest.clearAllMocks()
    opt = {
      getToken: jest.fn(async () => {
        await delay(200)
        return 'token'
      }),
      onRefetch: jest.fn((token: string) => {
        return token
      }),
      onError: jest.fn((error: any) => {
        return error
      }),
    }
  })

  it('getToken should call one time', async () => {
    const retry = retryReqeustManager()

    await Promise.all([retry(opt), retry(opt), retry(opt), retry(opt)])
    expect(opt.getToken).toHaveBeenCalledTimes(1)
  })

  it('onRefetch should call each time', async () => {
    const retry = retryReqeustManager()

    await Promise.all([retry(opt), retry(opt), retry(opt), retry(opt)])
    expect(opt.onRefetch).toHaveBeenCalledTimes(4)
  })

  it('onRefetch should call with token', async () => {
    const retry = retryReqeustManager()

    await Promise.all([retry(opt), retry(opt), retry(opt), retry(opt)])
    expect(opt.onRefetch).toHaveBeenCalledWith('token')
  })

  it('retry returns result of onRefetch', async () => {
    const retry = retryReqeustManager()

    const result = await retry(opt)
    expect(result).toBe('token')
  })
})
