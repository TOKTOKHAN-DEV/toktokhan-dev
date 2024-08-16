/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { EmptyView } from '../EmptyView'

describe('EmptyView', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render children when data is not empty', () => {
    const data = [1]
    render(
      <EmptyView data={data} fallback={<div title="@empty">No data</div>}>
        <div title="@data">{data}</div>
      </EmptyView>,
    )

    expect(screen.getByTitle('@data')).toBeInTheDocument()
    expect(screen.queryByTitle('@empty')).toBeNull()
  })

  it('should render children when data is empty', () => {
    const data = null
    render(
      <EmptyView data={data} fallback={<div title="@empty">No data</div>}>
        <div title="@data">{data}</div>
      </EmptyView>,
    )
    expect(screen.getByTitle('@empty')).toBeInTheDocument()
    expect(screen.queryByTitle('@data')).toBeNull()
  })
})
