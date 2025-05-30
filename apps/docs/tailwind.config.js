const { fontFamily } = require('tailwindcss/defaultTheme')

const uiVariantPlugin = require('./plugins/ui-plugin.ts')
const textStylesPlugin = require('./plugins/text-styles-plugin.ts')
const tokColor = require('./src/generated/color-theme-tailwind.ts')

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: true,
    container: false,
  },
  safelist: [
    'text-accent-brewin-blue',
    'text-accent-brewin-yellow',
    'text-accent-brewin-red',
    'text-accent-brewin-green',
    'hover:text-accent-brewin-blue',
    'hover:text-accent-brewin-yellow',
    'hover:text-accent-brewin-red',
    'hover:text-accent-brewin-green',
    'md:-translate-x-1/2',
    'md:-translate-x-[-50%]',
    'transform',
    'translate-y-[-26px]',
    'translate-y-[-53px]',
    'translate-y-[180px]',
    'translate-x-0',
    'translate-y-0',
    'rotate-0',
    'skew-x-0',
    'skew-y-0',
    'scale-x-1',
    'scale-y-1',
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{jsx,ts,tsx,html,js}', './docs/**/*.{md,mdx,tsx}'],
  theme: {
    extend: {
      backgroundImage: () => ({
        'black-gradient':
          'linear-gradient(90deg, #565656 0%, #2C2C2C 55%, #3C3C3C 100%)',
        'gray-gradient':
          'linear-gradient(90deg, #CACACA 0%, #888 50%, #ADADAD 100%)',
      }),
      fontFamily: {
        pretendard: ['"Pretendard"', ...fontFamily.sans],
        jaro: ['Jaro', ...fontFamily.sans],
        ibmFlexMono: ['IBM+Plex+Mono', ...fontFamily.sans],
        uncut: ['UnCut', ...fontFamily.sans],
      },
      borderRadius: {
        sm: '4px',
      },
      screens: {
        base: '0px',
        sm: '0px',
        md: '1440px',
        lg: '1440px',
        xl: '1920px',
        '2xl': '1920px',
      },
      translate: {
        '1/2': '50%',
      },
      maxWidth: {
        'screen-base': '100%',
        'screen-sm': '100%',
        'screen-md': '576px',
        'screen-lg': '576px',
        'screen-xl': '576px',
        'screen-2xl': '576px',
      },

      colors: {
        ...tokColor,
      },
    },
  },
  plugins: [textStylesPlugin, uiVariantPlugin],
}
