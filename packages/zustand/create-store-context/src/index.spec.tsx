/**
 * @jest-environment jsdom
 */
import { act } from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { createStoreContext } from '.'

type SampleState = {
  count: number
  increment: () => void
}

const { Provider, useContext, withProvider } = createStoreContext<SampleState>(
  (set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
  }),
)

const CounterDisplay = () => {
  const count = useContext((state) => state.count)
  const increment = useContext((state) => state.increment)
  return (
    <div>
      <span data-testid="count">{count}</span>
      <button onClick={increment}>Increment</button>
    </div>
  )
}

describe('createStoreContext', () => {
  it('should render with initial state', () => {
    render(
      <Provider>
        <CounterDisplay />
      </Provider>,
    )
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('should update state correctly', async () => {
    render(
      <Provider>
        <CounterDisplay />
      </Provider>,
    )
    const button = screen.getByText('Increment')

    await act(async () => {
      await userEvent.click(button)
    })

    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('should render with initial state from props', () => {
    render(
      <Provider initial={{ count: 10 }}>
        <CounterDisplay />
      </Provider>,
    )
    expect(screen.getByTestId('count')).toHaveTextContent('10')
  })

  it('should update state correctly with initial state from props', async () => {
    render(
      <Provider initial={{ count: 10 }}>
        <CounterDisplay />
      </Provider>,
    )
    const button = screen.getByText('Increment')
    await act(async () => {
      await userEvent.click(button)
    })

    expect(screen.getByTestId('count')).toHaveTextContent('11')
  })

  it('should throw error if useContext is used outside Provider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    expect(() => render(<CounterDisplay />)).toThrow('missing Store Provider')
    consoleError.mockRestore()
  })

  it('should wrap component with provider using withProvider', async () => {
    const WrappedComponent = withProvider(CounterDisplay, { count: 5 })
    render(<WrappedComponent />)

    expect(screen.getByTestId('count')).toHaveTextContent('5')

    const button = screen.getByText('Increment')
    await act(async () => {
      await userEvent.click(button)
    })

    expect(screen.getByTestId('count')).toHaveTextContent('6')
  })
})
