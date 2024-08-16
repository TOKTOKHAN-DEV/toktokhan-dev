/**
 * @jest-environment jsdom
 */
import { useRef } from 'react'

import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

import { InfinityList } from './InfinityList'

jest.mock('@toktokhan-dev/react-web', () => ({
  useIntersectionObserver: jest.fn().mockImplementation(({ onVisible }) => {
    const targetRef = useRef<HTMLDivElement>(null)
    setTimeout(() => {
      onVisible()
    }, 1000)

    return { targetRef }
  }),
}))
const data = [
  { content: 'title1' },
  { content: 'title2' },
  { content: 'title3' },
]

describe('InfinityList', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render children when data is provided', () => {
    render(
      <InfinityList
        data={data}
        hasMore={false}
        isFetching={false}
        renderItem={(item) => <div content={item.content}>{item.content}</div>}
        onFetchMore={() => {}}
      />,
    )

    const items = screen.getAllByLabelText('item-container', { selector: 'li' })
    expect(items).toHaveLength(data.length)
    items.forEach((item) => {
      expect(item).toBeInTheDocument()
    })
  })

  it('should show spinner when fetching data', () => {
    render(
      <InfinityList
        data={data}
        hasMore={true}
        isFetching={true}
        renderItem={(item) => (
          <div title={'@content'} content={item.content}>
            {item.content}
          </div>
        )}
        spinner={<div title={'@spinner'}>Spinner</div>}
        onFetchMore={() => {}}
      />,
    )

    expect(screen.getByTitle('@spinner')).toBeInTheDocument()
  })
  it('should show emptyBox when data is empty', () => {
    render(
      <InfinityList
        data={[]}
        hasMore={true}
        isFetching={true}
        renderItem={(item) => <div title={'@content'}></div>}
        spinner={<div title={'@spinner'}>Spinner</div>}
        empty={<div title={'@empty'}>Empty</div>}
        onFetchMore={() => {}}
      />,
    )

    expect(screen.getByTitle('@empty')).toBeInTheDocument()
  })

  it('should call onFetchMore when onVisible called', async () => {
    const onFetchMore = jest.fn()

    render(
      <InfinityList
        data={data}
        hasMore={true}
        isFetching={false}
        onFetchMore={onFetchMore}
        renderItem={(item) => (
          <div title={'@content'} content={item.content}>
            {item.content}
          </div>
        )}
        spinner={<div title={'@spinner'}>Spinner</div>}
      />,
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
