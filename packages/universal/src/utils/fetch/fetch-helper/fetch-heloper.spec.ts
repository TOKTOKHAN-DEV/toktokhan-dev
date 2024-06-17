/* eslint @typescript-eslint/ban-ts-comment: "off", no-global-assign: "off" */
import { fetchHelper } from './fetch-helper'

describe('fetchHelper', () => {
  const globalFetch = fetch
  let fetchMocked: ReturnType<typeof jest.fn>
  beforeEach(() => {
    fetchMocked = jest.fn()
    // @ts-ignore
    fetch = fetchMocked
  })

  afterEach(() => {
    // @ts-ignore
    fetch = globalFetch
  })

  it('should call global fetch when no default options.', async () => {
    // given
    const fetchExtended = fetchHelper()

    // when
    await fetchExtended('https://base-url.com/todos/1')

    // then
    expect(fetchMocked).toHaveBeenCalledWith('https://base-url.com/todos/1', {
      headers: new Headers(),
    })
  })

  it('should call given fetch.', async () => {
    // given
    const givenFetch = jest.fn()
    const fetchExtended = fetchHelper({ fetch: givenFetch })

    // when
    await fetchExtended('https://base-url.com/todos/1')

    // then
    expect(givenFetch).toHaveBeenCalledWith('https://base-url.com/todos/1', {
      headers: new Headers(),
    })
    expect(fetchMocked).not.toHaveBeenCalled()
  })

  it('should apply baseUrl.', async () => {
    // given
    const fetchExtended = fetchHelper({
      baseUrl: 'https://base-url.com',
    })

    // when
    await fetchExtended('/todos/1')

    // then
    expect(fetchMocked).toHaveBeenCalledWith(
      new URL('https://base-url.com/todos/1'),
      {
        headers: new Headers(),
      },
    )
  })

  it('should apply default headers.', async () => {
    // given
    const fetchExtended = fetchHelper({
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    // when
    await fetchExtended('https://base-url.com/todos/1')

    // then
    expect(fetchMocked).toHaveBeenCalledWith('https://base-url.com/todos/1', {
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    })
  })

  it('should override default headers', async () => {
    // given
    const fetchExtended = fetchHelper({
      headers: {
        'Content-Type': 'application/xml',
        Accept: 'application/json',
      },
    })

    // when
    await fetchExtended('https://base-url.com/todos/1', {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // then
    expect(fetchMocked).toHaveBeenCalledWith('https://base-url.com/todos/1', {
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
    })
  })

  it('should call request, response interceptors', async () => {
    // given
    const mockShouldBeCalledInInterceptors = jest.fn()

    const fetchExtended = fetchHelper({
      interceptors: {
        request: async () => {
          mockShouldBeCalledInInterceptors('request interceptor called')
          return [
            'https://force-set-url.com',
            { headers: { 'X-Force-Set-Header': 'force-set-header' } },
          ]
        },
        response: async (response) => {
          mockShouldBeCalledInInterceptors('response interceptor called')

          const bodyContent = 'force-set-body'
          const body = new Blob([bodyContent]).stream()

          return { ...response, body }
        },
      },
    })

    // when
    const response = await fetchExtended('https://base-url.com/todos/1')

    // then
    expect(mockShouldBeCalledInInterceptors).toHaveBeenNthCalledWith(
      1,
      'request interceptor called',
    )
    expect(mockShouldBeCalledInInterceptors).toHaveBeenNthCalledWith(
      2,
      'response interceptor called',
    )

    expect(fetchMocked).toHaveBeenCalledWith('https://force-set-url.com', {
      headers: { 'X-Force-Set-Header': 'force-set-header' },
    })

    const responseBody = await new Response(response.body).text()

    expect(responseBody).toBe('force-set-body')
  })

  it('should use provided fetch in interceptors', async () => {
    // given
    const myFetch = jest.fn()

    const fetchExtended = fetchHelper({
      fetch: myFetch,
      interceptors: {
        request: async (requestArgs, fetch) => {
          await fetch('provided fetch called in request interceptor')

          return requestArgs
        },
        response: async (response, _, fetch) => {
          await fetch('provided fetch called in response interceptor')

          return response
        },
      },
    })

    // when
    await fetchExtended('https://base-url.com/todos/1')

    // then
    expect(myFetch).toHaveBeenNthCalledWith(
      1,
      'provided fetch called in request interceptor',
    )

    expect(myFetch).toHaveBeenNthCalledWith(2, 'https://base-url.com/todos/1', {
      headers: new Headers(),
    })

    expect(myFetch).toHaveBeenNthCalledWith(
      3,
      'provided fetch called in response interceptor',
    )
  })

  it('should be able to handle Request object as a first argument.', async () => {
    // given
    const fetchExtended = fetchHelper()
    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ hello: 'world!' }),
      referrer: 'about:client',
      referrerPolicy: 'origin',
      mode: 'cors',
      credentials: 'same-origin',
      cache: 'default',
      redirect: 'follow',
      integrity: 'integrity',
      keepalive: true,
      signal: null,
      window: null,
    }

    // when
    await fetchExtended(
      new Request('https://base-url.com/todos/1', requestInit),
    )

    // then
    expect(fetchMocked.mock.calls[0][0]).toBe('https://base-url.com/todos/1')
    await expect(
      new Response(fetchMocked.mock.calls[0][1].body).text(),
    ).resolves.toBe('{"hello":"world!"}')
    const { body: _, ...rest } = requestInit

    const actualRequestInit: RequestInit = fetchMocked.mock.calls[0][1]
    console.log(actualRequestInit)
    expect(actualRequestInit.method).toBe(requestInit.method)
    expect(new Headers(actualRequestInit.headers)).toStrictEqual(
      requestInit.headers,
    )

    expect(actualRequestInit.referrer).toBe(requestInit.referrer)
    expect(actualRequestInit.referrerPolicy).toBe(requestInit.referrerPolicy)
    expect(actualRequestInit.mode).toBe(requestInit.mode)
    expect(actualRequestInit.credentials).toBe(requestInit.credentials)
    expect(actualRequestInit.cache).toBe(requestInit.cache)
    expect(actualRequestInit.redirect).toBe(requestInit.redirect)
    expect(actualRequestInit.integrity).toBe(requestInit.integrity)
    expect(actualRequestInit.keepalive).toBe(requestInit.keepalive)
    expect(actualRequestInit.signal).toBeInstanceOf(AbortSignal)
    expect(actualRequestInit.window).toBeUndefined()
  })

  it('should be possible to process when a first argument is Request object and second argument is requestInit.', async () => {
    // given
    const fetchExtended = fetchHelper()
    const requestInit: RequestInit = {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify({ hello: 'world!' }),
      referrer: 'about:client',
      referrerPolicy: 'origin',
      mode: 'cors',
      credentials: 'same-origin',
      cache: 'default',
      redirect: 'follow',
      integrity: 'integrity',
      keepalive: true,
      signal: null,
      window: null,
    }

    // when
    await fetchExtended(
      new Request('https://base-url.com/todos/1'),
      requestInit,
    )

    // then
    expect(fetchMocked.mock.calls[0][0]).toBe('https://base-url.com/todos/1')
    await expect(
      new Response(fetchMocked.mock.calls[0][1].body).text(),
    ).resolves.toBe('{"hello":"world!"}')
    const { body: _, ...rest } = requestInit

    const actualRequestInit: RequestInit = fetchMocked.mock.calls[0][1]

    expect(actualRequestInit.method).toBe('POST')
    expect(new Headers(actualRequestInit.headers)).toStrictEqual(
      requestInit.headers,
    )
    expect(actualRequestInit.referrer).toBe(requestInit.referrer)
    expect(actualRequestInit.referrerPolicy).toBe(requestInit.referrerPolicy)
    expect(actualRequestInit.mode).toBe(requestInit.mode)
    expect(actualRequestInit.credentials).toBe(requestInit.credentials)
    expect(actualRequestInit.cache).toBe(requestInit.cache)
    expect(actualRequestInit.redirect).toBe(requestInit.redirect)
    expect(actualRequestInit.integrity).toBe(requestInit.integrity)
    expect(actualRequestInit.keepalive).toBe(requestInit.keepalive)
    expect(actualRequestInit.signal).toBeInstanceOf(AbortSignal)
    expect(actualRequestInit.window).toBeNull()
  })
})
