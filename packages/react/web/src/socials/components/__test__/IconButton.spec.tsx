/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { SOCIALS } from '../../constants/socials'
import { IconButton } from '../IconButton'

const MockIcon = () => <svg aria-label="mock-icon" />

describe('IconButton', () => {
  it('should render with default props', () => {
    render(<IconButton socialType="kakao" icon={<MockIcon />} />)

    const button = screen.getByLabelText('kakao-login-button')
    expect(button).toBeInTheDocument()

    const iconContainer = screen.getByLabelText('mock-icon').parentNode
    expect(iconContainer).toBeInTheDocument()
    expect(iconContainer).toHaveStyle(
      `background-color: ${SOCIALS['kakao'].style['dark'].bg}`,
    )
    expect(iconContainer).toHaveStyle(
      `color: ${SOCIALS['kakao'].style['dark'].label}`,
    )
  })

  it('should render with a custom label', () => {
    const customLabel = 'Custom Facebook Login'
    render(
      <IconButton
        socialType="facebook"
        icon={<MockIcon />}
        label={customLabel}
      />,
    )

    const label = screen.getByText(customLabel)
    expect(label).toBeInTheDocument()
  })

  it('should apply the correct styles based on the variant', () => {
    const { rerender } = render(
      <IconButton socialType="kakao" icon={<MockIcon />} />,
    )
    const iconContainer = screen.getByLabelText('mock-icon').parentElement

    // 'full'
    expect(iconContainer).toHaveStyle('border-radius: 9999px')
    // 'rounded'
    rerender(
      <IconButton socialType="kakao" icon={<MockIcon />} variant="rounded" />,
    )
    expect(iconContainer).toHaveStyle('border-radius: 6px')
    // 'square'
    rerender(
      <IconButton socialType="kakao" icon={<MockIcon />} variant="square" />,
    )
    expect(iconContainer).toHaveStyle('border-radius: 0px')
  })

  it('should trigger the onClick event', () => {
    const handleClick = jest.fn()
    render(
      <IconButton
        socialType="apple"
        icon={<MockIcon />}
        onClick={handleClick}
      />,
    )

    const button = screen.getByLabelText('apple-login-button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should render without label when label is null', () => {
    render(<IconButton socialType="kakao" icon={<MockIcon />} label={null} />)

    const label = screen.queryByText(SOCIALS['kakao']['ko'])
    expect(label).toBeNull()
  })
})
