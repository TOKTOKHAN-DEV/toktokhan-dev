const { fontFamily } = require('tailwindcss/defaultTheme')
const uiVariantPlugin = require('./src/ui/plugins/ui-plugin.ts')
const textStylesPlugin = require('./src/ui/plugins/text-styles-plugin.ts')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['"Pretendard"', ...fontFamily.sans],
    },
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        fadeOut: 'fadeOut 0.5s ease-in-out forwards',
      },
      colors: {
        'grey-100': '#f5f5f5',
        'grey-200': '#e4e4e4',
        'grey-300': '#d0d0d0',
        'grey-400': '#aeaeae',
        'grey-500': '#8f8f8f',
        'grey-600': '#767676',
        'grey-800': '#333333',
        'brand-500': '#4850ff',
        'brand-700': '#0007b0',
        'brand-800': '#0c1f6f',
        'common-white': '#ffffff',
        'background-primary': 'var(--common-white)',
        'background-secondary': 'var(--grey-100)',
        'text-primary': 'var(--grey-800)',
        'text-primary-inverse': 'var(--common-white)',
        'text-disabled': 'var(--grey-300)',
        'text-disabled-on': 'var(--grey-400)',
        'border-primary': 'var(--grey-300)',
        'border-secondary': 'var(--grey-200)',
        'icon-primary': 'var(--grey-800)',
        'icon-primary-inverse': 'var(--common-white)',
        'icon-disabled': 'var(--grey-300)',
        'button-primary': 'var(--brand-500)',
        'field-solid': 'var(--grey-100)',
        'button-primary-hover': 'var(--brand-700)',
        'button-primary-pressed': 'var(--brand-800)',
        'button-secondary': 'var(--grey-400)',
        'button-secondary-hover': 'var(--grey-500)',
        'button-secondary-pressed': 'var(--grey-600)',
        'button-disabled': 'var(--grey-200)',
        'icon-brand': 'var(--brand-500)',
        'background-tertiary': 'var(--grey-200)',
      },
    },
  },
  plugins: [textStylesPlugin, uiVariantPlugin],
}
