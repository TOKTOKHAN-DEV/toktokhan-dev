/**
 * @jest-environment jsdom
 */
import { useEffect, useState } from 'react'

import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'

import { LoadingView } from '../LoadingView'

describe('LoadingView', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display loading fallback while loading and show children when loading is complete', async () => {
    const data = [1]

    const TestComponent = () => {
      const [isLoading, setIsLoading] = useState(true)

      useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false)
        }, 1000)
        return () => clearTimeout(timer)
      }, [])

      return (
        <LoadingView
          isLoading={isLoading}
          fallback={<div title="@loading">Loading</div>}
        >
          <div title="@data">{data}</div>
        </LoadingView>
      )
    }

    render(<TestComponent />)
    expect(screen.getByTitle('@loading')).toBeInTheDocument()

    await waitFor(
      () => {
        expect(screen.queryByTitle('@loading')).toBeNull()
        expect(screen.getByTitle('@data')).toBeInTheDocument()
      },
      { timeout: 1500 },
    )
  })
})
