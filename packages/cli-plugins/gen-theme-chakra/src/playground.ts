import { genTheme } from '.'

genTheme.run({
  input: 'token.json',
  output: 'generated/theme',
  tokenModes: {
    colors: {
      light: 'light',
      dark: 'dark',
    },
    textStyles: {
      base: 'mobile',
      sm: 'tablet',
      md: 'desktop',
    },
  },
})
