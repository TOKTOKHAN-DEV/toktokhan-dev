/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { UploadTrigger } from './UploadTrigger'

const mockOnChange = jest.fn()

describe('UploadTrigger', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders children and triggers file input click on event', () => {
    render(
      <UploadTrigger data-testid="file-input" onChange={mockOnChange}>
        <button>Upload</button>
      </UploadTrigger>,
    )

    const button = screen.getByText('Upload')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    const fileInput = screen.getByTestId('file-input')
    expect(fileInput).toHaveAttribute('type', 'file')
    expect(fileInput).not.toHaveValue()

    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    })
    fireEvent.change(fileInput, { target: { files: [file] } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange.mock.calls[0][0].target.files[0]).toEqual(file)
  })

  it('uses the specified event prop to trigger the file input click', () => {
    const Component = ({
      onAdd,
      text,
    }: {
      onAdd?: () => void
      text: string
    }) => {
      return <button onClick={onAdd}>{text}</button>
    }

    render(
      <UploadTrigger
        data-testid="file-input"
        by="onAdd"
        onChange={mockOnChange}
      >
        <Component text="add" />
      </UploadTrigger>,
    )

    const button = screen.getByText('add')
    expect(button).toBeInTheDocument()

    fireEvent.click(button)

    const fileInput = screen.getByTestId('file-input')
    const file = new File(['dummy content'], 'example.png', {
      type: 'image/png',
    })
    fireEvent.change(fileInput, { target: { files: [file] } })

    expect(mockOnChange).toHaveBeenCalledTimes(1)
    expect(mockOnChange.mock.calls[0][0].target.files[0]).toEqual(file)
  })

  it('does not render an input element if children is not a React element', () => {
    console.error = jest.fn()

    expect(() =>
      render(
        <UploadTrigger onChange={mockOnChange}>
          {/* @ts-expect-error: intentionally passing incorrect children type */}
          {'string'}
        </UploadTrigger>,
      ),
    ).toThrowError()
  })
})
