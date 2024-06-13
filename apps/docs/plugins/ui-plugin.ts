import plugin from 'tailwindcss/plugin'

interface Options {
  prefix?: string
}
export default plugin.withOptions<Options>(({ prefix = 'ui' } = {}) => {
  return ({ addVariant }) => {
    for (const state of ['open', 'checked', 'selected', 'active', 'disabled']) {
      addVariant(`${prefix}-${state}`, [
        `&[data-toktoken-state~="${state}"]`,
        `:where([data-toktoken-state~="${state}"]) &`,
      ])

      addVariant(`${prefix}-not-${state}`, [
        `&[data-toktoken-state]:not([data-toktoken-state~="${state}"])`,
        `:where([data-toktoken-state]:not([data-toktoken-state~="${state}"])) &:not([data-toktoken-state])`,
      ])
    }

    addVariant(
      `${prefix}-focus-visible`,
      ':where([data-toktoken-focus-visible]) &:focus',
    )
    addVariant(
      `${prefix}-not-focus-visible`,
      '&:focus:where(:not([data-toktoken-focus-visible] &))',
    )
  }
})
