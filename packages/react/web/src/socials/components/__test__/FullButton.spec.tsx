/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'

import { SOCIALS } from '../../constants/socials'
import { FullButton } from '../FullButton'

const MockIcon = () => <svg aria-label="mock-icon" />

describe('FullButton', () => {
  it('should render with default props', () => {
    render(<FullButton socialType="kakao" icon={<MockIcon />} />)

    const button = screen.getByLabelText('kakao-login-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle(
      `background-color: ${SOCIALS['kakao'].style['dark'].bg}`,
    )
    expect(button).toHaveStyle(`color: ${SOCIALS['kakao'].style['dark'].label}`)

    const icon = screen.getByLabelText('mock-icon')
    expect(icon).toBeInTheDocument()
  })

  it('should render with a custom label', () => {
    const customLabel = 'Custom Facebook Login'
    render(
      <FullButton
        socialType="facebook"
        icon={<MockIcon />}
        label={customLabel}
      />,
    )

    const label = screen.getByText(customLabel)
    expect(label).toBeInTheDocument()
  })

  it('should apply the "rounded" variant style', () => {
    render(
      <FullButton socialType="kakao" icon={<MockIcon />} variant="rounded" />,
    )

    const button = screen.getByLabelText('kakao-login-button')
    expect(button).toHaveStyle('border-radius: 6px')
  })

  it('should apply the "light" color mode style', () => {
    render(
      <FullButton socialType="google" icon={<MockIcon />} colorMode="light" />,
    )

    const button = screen.getByLabelText('google-login-button')
    expect(button).toHaveStyle(
      `background-color: ${SOCIALS['google'].style['light'].bg}`,
    )
    expect(button).toHaveStyle(
      `color: ${SOCIALS['google'].style['light'].label}`,
    )
  })

  it('should trigger the onClick event', () => {
    const handleClick = jest.fn()
    render(
      <FullButton
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
    render(<FullButton socialType="kakao" icon={<MockIcon />} label={null} />)

    const label = screen.queryByText(SOCIALS['kakao']['ko'])
    expect(label).toBeNull()
  })
})
