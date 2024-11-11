export const addAlpha = (color: string, opacity: number): string => {
  const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255)
  return color + _opacity.toString(16).padStart(2, '0').toUpperCase()
}
