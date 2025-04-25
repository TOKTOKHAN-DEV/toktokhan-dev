import { genTheme } from '.'

genTheme.run({
  input: 'token.json',
  output: 'generated/theme',
  version: 'v2',
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
