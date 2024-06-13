import plugin from 'tailwindcss/plugin'

export default plugin(({ addUtilities }) => {
  const newUtilities = {
    '.body01-normal-bold': {
      fontWeight: '700',
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '-1%',
      textDecoration: 'none',
    },
    '.body01-normal-regular': {
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '-1%',
      textDecoration: 'none',
    },
    '.body02-normal-regular': {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '-1%',
      textDecoration: 'none',
    },
    '.body02-normal-bold': {
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '-1%',
      textDecoration: 'none',
    },
    '.body03-normal-regular': {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-1%',
      textDecoration: 'none',
    },
    '.body03-normal-bold': {
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-1%',
      textDecoration: 'none',
    },
    '.caption01-regular': {
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '-1%',
      textDecoration: 'none',
    },
    '.caption01-bold': {
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '-0.24px',
      textDecoration: 'none',
    },
    '.caption02-regular': {
      fontWeight: '400',
      fontSize: '10px',
      lineHeight: '14px',
      letterSpacing: '2.5199999809265137%',
      textDecoration: 'none',
    },
    '.caption02-bold': {
      fontWeight: '600',
      fontSize: '10px',
      lineHeight: '14px',
      letterSpacing: '-1%',
      textDecoration: 'none',
    },
    // additional
    '.text-field': {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '23.8px',
      letterSpacing: '-0.28px',
      textDecoration: 'none',
    },
    '.button-field': {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '23.8px',
      letterSpacing: '-0.28px',
      textDecoration: 'none',
    },
    '.pre-caption01': {
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '20.4px',
      letterSpacing: '-0.24px',
      textDecoration: 'none',
    },
  }

  addUtilities(newUtilities)
})
