/**
 * @jest-environment jsdom
 */
import { useRef } from 'react'

import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

import { InfinityContent } from './InfinityContent'

jest.mock('@toktokhan-dev/react-web', () => ({
  useIntersectionObserver: jest.fn().mockImplementation(({ onVisible }) => {
    const targetRef = useRef<HTMLDivElement>(null)
    setTimeout(() => {
      onVisible()
    }, 1000)

    return { targetRef }
  }),
}))

describe('InfinityContent', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render children when data is provided', () => {
    render(
      <InfinityContent
        hasMore={false}
        isFetching={false}
        onFetchMore={() => {}}
      >
        <div title={'@content'}>Content</div>
      </InfinityContent>,
    )

    expect(screen.getByTitle('@content')).toBeInTheDocument()
  })

  it('should show spinner when fetching data', () => {
    render(
      <InfinityContent
        hasMore={true}
        isFetching={true}
        onFetchMore={() => {}}
        spinner={<div title={'@spinner'}>Spinner</div>}
      >
        <div title={'@content'}>Content</div>
      </InfinityContent>,
    )

    expect(screen.getByTitle('@spinner')).toBeInTheDocument()
  })

  it('should call onFetchMore when onVisible called', async () => {
    const onFetchMore = jest.fn()

    render(
      <InfinityContent
        hasMore={true}
        isFetching={false}
        onFetchMore={onFetchMore}
      >
        <div title={'@content'}>Content</div>
      </InfinityContent>,
    )

    expect(onFetchMore).not.toHaveBeenCalled()

    await waitFor(
      () => {
        expect(onFetchMore).toHaveBeenCalled()
        expect(onFetchMore).toHaveBeenCalledTimes(1)
      },
      { timeout: 1500 },
    )
  })
})
