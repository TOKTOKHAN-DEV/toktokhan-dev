import { addAlpha } from './add-alpha'

export const rgbToHex = (rgba: RGBA) => {
  const { r, g, b } = rgba
  const red = Math.round(r * 255)
  const green = Math.round(g * 255)
  const blue = Math.round(b * 255)

  const hexRed = red.toString(16).padStart(2, '0')
  const hexGreen = green.toString(16).padStart(2, '0')
  const hexBlue = blue.toString(16).padStart(2, '0')

  const hex = `#${hexRed}${hexGreen}${hexBlue}`

  const hasOpacity = rgba.a !== undefined && rgba.a !== 1

  return hasOpacity ? addAlpha(hex, rgba.a) : hex
}
