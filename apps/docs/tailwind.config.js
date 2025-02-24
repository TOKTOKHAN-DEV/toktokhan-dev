const { fontFamily } = require('tailwindcss/defaultTheme')
const uiVariantPlugin = require('./plugins/ui-plugin.ts')
const textStylesPlugin = require('./plugins/text-styles-plugin.ts')
const tokColor = require('./src/generated/color-theme-tailwind.ts')
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{jsx,ts,tsx,html}', './docs/**/*.{md,mdx,tsx}'],
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
      },
      borderRadius: {
        sm: '4px',
      },
      screens: {
        base: '0px',
        sm: '375px',
        md: '768px',
        lg: '1439px',
        xl: '1440px',
        '2xl': '1920px',
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
