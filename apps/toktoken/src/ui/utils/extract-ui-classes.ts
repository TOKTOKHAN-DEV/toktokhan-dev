export const extractUIClasses = (className?: string) => {
  if (!className) return ''
  const baseClasses: string[] = []
  const uiClasses: string[] = []

  className.split(' ').forEach((cls) => {
    cls.startsWith('ui-') ? uiClasses.push(cls) : baseClasses.push(cls)
  })

  return { baseClasses: baseClasses.join(' '), uiClasses: uiClasses.join(' ') }
}
