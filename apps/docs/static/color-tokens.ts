const colorSchema = {
  'common.white': '#ffffff',
  'common.black': '#000000',
  'grey.50': '#fafafa',
  'grey.100': '#f5f5f5',
  'grey.200': '#ececec',
  'grey.300': '#d9d9d9',
  'grey.400': '#aeaeae',
  'grey.500': '#8f8f8f',
  'grey.600': '#767676',
  'grey.700': '#555555',
  'grey.800': '#333333',
  'grey.900': '#171717',
  'green.50': '#e0ffeb',
  'green.100': '#bef4d0',
  'green.200': '#7ee29f',
  'green.300': '#4bce77',
  'green.400': '#2abb5a',
  'green.500': '#22a04c',
  'green.600': '#1f8441',
  'green.700': '#216e3b',
  'green.800': '#174f2a',
  'green.900': '#16281c',
  'yellow.50': '#fef7d7',
  'yellow.100': '#fcf1b5',
  'yellow.200': '#fae161',
  'yellow.300': '#f9d414',
  'yellow.400': '#efb806',
  'yellow.500': '#d7a204',
  'yellow.600': '#a67d03',
  'yellow.700': '#896601',
  'yellow.800': '#644c02',
  'yellow.900': '#322601',
  'blue.50': '#e9f2ff',
  'blue.100': '#cce0ff',
  'blue.200': '#84b8ff',
  'blue.300': '#579dff',
  'blue.400': '#388bff',
  'blue.500': '#1d7afc',
  'blue.600': '#0c66e4',
  'blue.700': '#0055cc',
  'blue.800': '#0c418d',
  'blue.900': '#1c2b41',
  'red.50': '#fff3f0',
  'red.100': '#ffd9d2',
  'red.200': '#fda391',
  'red.300': '#f88068',
  'red.400': '#f16b50',
  'red.500': '#e2593d',
  'red.600': '#c9462c',
  'red.700': '#983d2b',
  'red.800': '#5d251a',
  'red.900': '#51190e',
  'pink.50': '#fff0f5',
  'pink.100': '#fdd0df',
  'pink.200': '#f995b6',
  'pink.300': '#f76495',
  'pink.400': '#ec5084',
  'pink.500': '#d94476',
  'pink.600': '#ce275f',
  'pink.700': '#bc154d',
  'pink.800': '#84153a',
  'pink.900': '#660022',
  'violet.50': '#f3f0ff',
  'violet.100': '#dfd8fd',
  'violet.200': '#b8acf6',
  'violet.300': '#9f8fef',
  'violet.400': '#8f7ee7',
  'violet.500': '#8270db',
  'violet.600': '#6e5dc6',
  'violet.700': '#5e4db2',
  'violet.800': '#42377c',
  'violet.900': '#272339',
  'brand-primary.50': '#eff0fe',
  'brand-primary.100': '#d8dafd',
  'brand-primary.200': '#b2b6fc',
  'brand-primary.300': '#8a8ff7',
  'brand-primary.400': '#6b72ef',
  'brand-primary.500': '#4b51dd',
  'brand-primary.600': '#2c34c4',
  'brand-primary.700': '#1e25a4',
  'brand-primary.800': '#131984',
  'brand-primary.900': '#0b106d',
  'white-transparent.50': '#ffffffD',
  'white-transparent.100': '#ffffff1A',
  'white-transparent.200': '#ffffff33',
  'white-transparent.300': '#ffffff4D',
  'white-transparent.400': '#ffffff66',
  'white-transparent.500': '#ffffff80',
  'white-transparent.600': '#ffffff99',
  'white-transparent.700': '#ffffffB2',
  'white-transparent.800': '#ffffffCC',
  'white-transparent.900': '#ffffffE5',
  'grey-transparent.50': '#171717D',
  'grey-transparent.100': '#1717171A',
  'grey-transparent.200': '#17171733',
  'grey-transparent.300': '#1717174D',
  'grey-transparent.400': '#17171766',
  'grey-transparent.500': '#17171780',
  'grey-transparent.600': '#17171799',
  'grey-transparent.700': '#171717B2',
  'grey-transparent.800': '#171717CC',
  'grey-transparent.900': '#171717E5',
  'brand-secondary.50': '#fefbec',
  'brand-secondary.100': '#fef1cf',
  'brand-secondary.200': '#fedf9f',
  'brand-secondary.300': '#fec86f',
  'brand-secondary.400': '#fdb24c',
  'brand-secondary.500': '#fc8e11',
  'brand-secondary.600': '#d86f0c',
  'brand-secondary.700': '#b55408',
  'brand-secondary.800': '#923c05',
  'brand-secondary.900': '#782b03',
  'white-transparent.0': '#ffffffFF',
  'white-transparent.0 2': '#ffffffFF',
  'grey-transparent.0': '#171717FF',
}

export const themeColors = {
  'background.secondary.hover': {
    light: colorSchema['grey.200'],
    dark: colorSchema['grey.600'],
  },
  'button.tertiary.active': {
    light: colorSchema['grey.200'],
    dark: colorSchema['grey.600'],
  },
  'border.brand': {
    light: colorSchema['grey.500'],
    dark: colorSchema['grey.300'],
  },
  'background.brand.active': {
    light: colorSchema['grey.300'],
    dark: colorSchema['grey.600'],
  },
  'background.primary.hover': {
    light: colorSchema['grey.200'],
    dark: colorSchema['grey.700'],
  },
  'button.primary.hover': {
    light: colorSchema['grey.700'],
    dark: colorSchema['grey.200'],
  },
  'background.primary.active': {
    light: colorSchema['grey.300'],
    dark: colorSchema['grey.600'],
  },
  'text.primary.inverse': {
    light: colorSchema['common.white'],
    dark: colorSchema['grey.900'],
  },
  'text.secondary.inverse': {
    light: colorSchema['grey.300'],
    dark: colorSchema['grey.600'],
  },
  'field.disabled': {
    light: colorSchema['grey.200'],
    dark: colorSchema['grey.600'],
  },
  'text.secondary': {
    light: colorSchema['grey.600'],
    dark: colorSchema['grey.400'],
  },
  'field.solid': {
    light: colorSchema['grey.100'],
    dark: colorSchema['grey.400'],
  },
  'background.inverse.active': {
    light: colorSchema['grey.400'],
    dark: colorSchema['grey.200'],
  },
  'background.secondary': {
    light: colorSchema['grey.100'],
    dark: colorSchema['grey.800'],
  },
  'button.secondary.hover': {
    light: colorSchema['grey.300'],
    dark: colorSchema['grey.500'],
  },
  'background.brand': {
    light: colorSchema['grey.50'],
    dark: colorSchema['grey.400'],
  },
  'icon.disabled.on': {
    light: colorSchema['grey.400'],
    dark: colorSchema['grey.500'],
  },
  'icon.primary.inverse': {
    light: colorSchema['common.white'],
    dark: colorSchema['grey.900'],
  },
  'background.inverse.hover': {
    light: colorSchema['grey.600'],
    dark: colorSchema['grey.100'],
  },
  'text.quaternary': {
    light: colorSchema['grey.300'],
    dark: colorSchema['grey.700'],
  },
  'background.brand.hover': {
    light: colorSchema['grey.200'],
    dark: colorSchema['grey.300'],
  },
  'background.overlay': {
    light: colorSchema['white-transparent.500'],
    dark: colorSchema['white-transparent.500'],
  },
  'border.active': {
    light: colorSchema['grey.800'],
    dark: colorSchema['common.white'],
  },
  'text.tertiary.inverse': {
    light: colorSchema['grey.600'],
    dark: colorSchema['grey.400'],
  },
  'background.inverse': {
    light: colorSchema['grey.800'],
    dark: colorSchema['grey.100'],
  },
  'background.brand.inverse.active': {
    light: colorSchema['grey.800'],
    dark: colorSchema['grey.300'],
  },
  'text.disabled.on': {
    light: colorSchema['grey.400'],
    dark: colorSchema['grey.500'],
  },
  'button.disalbled': {
    light: colorSchema['grey.200'],
    dark: colorSchema['grey.600'],
  },
  'icon.secondary': {
    light: colorSchema['grey.600'],
    dark: colorSchema['grey.200'],
  },
  'border.selected': {
    light: colorSchema['grey.500'],
    dark: colorSchema['grey.300'],
  },
  'text.tertiary': {
    light: colorSchema['grey.400'],
    dark: colorSchema['grey.600'],
  },
  'border.secondary': {
    light: colorSchema['grey.200'],
    dark: colorSchema['grey.400'],
  },
  'text.disabled': {
    light: colorSchema['grey.300'],
    dark: colorSchema['grey.600'],
  },
  'field.line': {
    light: colorSchema['common.white'],
    dark: colorSchema['grey.800'],
  },
  'background.primary': {
    light: colorSchema['common.white'],
    dark: colorSchema['grey.900'],
  },
  'button.primary': {
    light: colorSchema['grey.500'],
    dark: colorSchema['grey.400'],
  },
  'background.brand.inverse': {
    light: colorSchema['grey.500'],
    dark: colorSchema['grey.50'],
  },
  'button.secondary.active': {
    light: colorSchema['grey.400'],
    dark: colorSchema['grey.400'],
  },
  'border.primary': {
    light: colorSchema['grey.300'],
    dark: colorSchema['grey.700'],
  },
  'background.secondary.selected': {
    light: colorSchema['grey.50'],
    dark: colorSchema['grey.400'],
  },
  'background.brand.inverse.hover': {
    light: colorSchema['grey.700'],
    dark: colorSchema['grey.200'],
  },
  'button.tertiary': {
    light: colorSchema['common.white'],
    dark: colorSchema['grey.900'],
  },
  'button.tertiary.hover': {
    light: colorSchema['grey.100'],
    dark: colorSchema['grey.700'],
  },
  'icon.tertiary': {
    light: colorSchema['grey.400'],
    dark: colorSchema['grey.600'],
  },
  'text.primary': {
    light: colorSchema['grey.900'],
    dark: colorSchema['common.white'],
  },
  'background.primary.selected': {
    light: colorSchema['grey.50'],
    dark: colorSchema['grey.400'],
  },
  'icon.secondary.inverse': {
    light: colorSchema['grey.300'],
    dark: colorSchema['grey.700'],
  },
  'background.secondary.active': {
    light: colorSchema['grey.300'],
    dark: colorSchema['grey.500'],
  },
  'icon.disabled': {
    light: colorSchema['grey.300'],
    dark: colorSchema['grey.800'],
  },
  'button.secondary': {
    light: colorSchema['grey.100'],
    dark: colorSchema['grey.600'],
  },
  'text.disabled.inverse': {
    light: colorSchema['grey.700'],
    dark: colorSchema['grey.300'],
  },
  'icon.primary': {
    light: colorSchema['grey.900'],
    dark: colorSchema['common.white'],
  },
  'button.primary.active': {
    light: colorSchema['grey.800'],
    dark: colorSchema['grey.100'],
  },
  'icon.brand': {
    light: colorSchema['grey.500'],
    dark: colorSchema['grey.400'],
  },
  'text.brand': {
    light: colorSchema['grey.500'],
    dark: colorSchema['grey.400'],
  },
  'background.inverse.secondary': {
    light: colorSchema['grey.700'],
    dark: colorSchema['grey.300'],
  },
  'accent.yellow.1': {
    light: colorSchema['yellow.50'],
    dark: colorSchema['yellow.300'],
  },
  'accent.yellow.2': {
    light: colorSchema['yellow.600'],
    dark: colorSchema['yellow.50'],
  },
  'accent.green.2': {
    light: colorSchema['green.500'],
    dark: colorSchema['green.50'],
  },
  'accent.red.2': {
    light: colorSchema['red.500'],
    dark: colorSchema['red.50'],
  },
  'accent.pink.1': {
    light: colorSchema['red.50'],
    dark: colorSchema['red.400'],
  },
  'accent.green.1': {
    light: colorSchema['green.50'],
    dark: colorSchema['green.400'],
  },
  'accent.violet.1': {
    light: colorSchema['violet.50'],
    dark: colorSchema['violet.400'],
  },
  'accent.red.1': {
    light: colorSchema['red.50'],
    dark: colorSchema['red.500'],
  },
  'primary.1': {
    light: colorSchema['brand-primary.50'],
    dark: colorSchema['brand-primary.700'],
  },
  'primary.2': {
    light: colorSchema['brand-primary.100'],
    dark: colorSchema['brand-primary.600'],
  },
  'primary.3': {
    light: colorSchema['brand-primary.500'],
    dark: colorSchema['brand-primary.500'],
  },
  'primary.4': {
    light: colorSchema['brand-primary.600'],
    dark: colorSchema['brand-primary.100'],
  },
  'primary.5': {
    light: colorSchema['brand-primary.700'],
    dark: colorSchema['brand-primary.50'],
  },
  'secondary.1': {
    light: colorSchema['brand-secondary.100'],
    dark: colorSchema['brand-secondary.700'],
  },
  'secondary.2': {
    light: colorSchema['brand-secondary.400'],
    dark: colorSchema['brand-secondary.600'],
  },
  'secondary.3': {
    light: colorSchema['brand-secondary.500'],
    dark: colorSchema['brand-secondary.500'],
  },
  'secondary.4': {
    light: colorSchema['brand-secondary.600'],
    dark: colorSchema['brand-secondary.400'],
  },
  'secondary.5': {
    light: colorSchema['brand-secondary.700'],
    dark: colorSchema['brand-secondary.100'],
  },
  'background.inverse.1': {
    light: colorSchema['grey.900'],
    dark: colorSchema['common.white'],
  },
  'background.inverse.2': {
    light: colorSchema['grey.800'],
    dark: colorSchema['grey.200'],
  },
  'background.inverse.3': {
    light: colorSchema['grey.700'],
    dark: colorSchema['grey.400'],
  },
  'background.inverse.4': {
    light: colorSchema['grey.600'],
    dark: colorSchema['grey.500'],
  },
  'background.basic.1': {
    light: colorSchema['common.white'],
    dark: colorSchema['grey.900'],
  },
  'background.basic.2': {
    light: colorSchema['grey.50'],
    dark: colorSchema['grey.800'],
  },
  'background.basic.3': {
    light: colorSchema['grey.100'],
    dark: colorSchema['grey.700'],
  },
  'background.basic.4': {
    light: colorSchema['grey.200'],
    dark: colorSchema['grey.400'],
  },
  'content.1': {
    light: colorSchema['grey.900'],
    dark: colorSchema['common.white'],
  },
  'content.2': {
    light: colorSchema['grey.700'],
    dark: colorSchema['grey.200'],
  },
  'content.3': {
    light: colorSchema['grey.600'],
    dark: colorSchema['grey.300'],
  },
  'content.4': {
    light: colorSchema['grey.500'],
    dark: colorSchema['grey.400'],
  },
  'content.8': {
    light: colorSchema['common.white'],
    dark: colorSchema['grey.900'],
  },
  'content.6': {
    light: colorSchema['grey.300'],
    dark: colorSchema['grey.600'],
  },
  'content.5': {
    light: colorSchema['grey.400'],
    dark: colorSchema['grey.500'],
  },
  'border.basic.1': {
    light: colorSchema['grey.200'],
    dark: colorSchema['grey.700'],
  },
  'border.basic.2': {
    light: colorSchema['grey.300'],
    dark: colorSchema['grey.500'],
  },
  'border.basic.3': {
    light: colorSchema['grey.900'],
    dark: colorSchema['grey.100'],
  },
  'border.inverse.1': {
    light: colorSchema['grey.700'],
    dark: colorSchema['grey.50'],
  },
  'border.inverse.2': {
    light: colorSchema['grey.600'],
    dark: colorSchema['grey.200'],
  },
  'border.inverse.3': {
    light: colorSchema['grey.50'],
    dark: colorSchema['grey.600'],
  },
  'accent.blue.1': {
    light: colorSchema['blue.50'],
    dark: colorSchema['blue.400'],
  },
  'accent.blue.2': {
    light: colorSchema['blue.500'],
    dark: colorSchema['blue.50'],
  },
  'accent.pink.2': {
    light: colorSchema['pink.400'],
    dark: colorSchema['pink.50'],
  },
  'accent.violet.2': {
    light: colorSchema['violet.600'],
    dark: colorSchema['violet.50'],
  },
  'transparent.basic.2': {
    light: colorSchema['grey-transparent.200'],
    dark: colorSchema['white-transparent.200'],
  },
  'transparent.inverse.2': {
    light: colorSchema['white-transparent.200'],
    dark: colorSchema['grey-transparent.200'],
  },
  'transparent.basic.3': {
    light: colorSchema['grey-transparent.500'],
    dark: colorSchema['white-transparent.500'],
  },
  'transparent.basic.4': {
    light: colorSchema['grey-transparent.600'],
    dark: colorSchema['white-transparent.600'],
  },
  'transparent.basic.5': {
    light: colorSchema['grey-transparent.800'],
    dark: colorSchema['white-transparent.800'],
  },
  'transparent.inverse.4': {
    light: colorSchema['white-transparent.600'],
    dark: colorSchema['grey-transparent.600'],
  },
  'transparent.inverse.3': {
    light: colorSchema['white-transparent.500'],
    dark: colorSchema['grey-transparent.500'],
  },
  'transparent.inverse.5': {
    light: colorSchema['white-transparent.800'],
    dark: colorSchema['grey-transparent.800'],
  },
  'content.7': {
    light: colorSchema['grey.200'],
    dark: colorSchema['grey.700'],
  },
  'transparent.basic.1': {
    light: colorSchema['grey-transparent.50'],
    dark: colorSchema['white-transparent.100'],
  },
  'transparent.inverse.1': {
    light: colorSchema['white-transparent.50'],
    dark: colorSchema['grey-transparent.50'],
  },
  'transparent.basic.0': {
    light: colorSchema['grey-transparent.0'],
    dark: colorSchema['white-transparent.0'],
  },
  'transparent.inverse.0': {
    light: colorSchema['white-transparent.0'],
    dark: colorSchema['grey-transparent.0'],
  },
  'background.basic.5': {
    light: '#f8f8f9',
    dark: '#232325',
  },
}
