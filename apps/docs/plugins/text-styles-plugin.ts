import plugin from 'tailwindcss/plugin'

export default plugin(({ addUtilities }) => {
  const textStyles = {
    'pre-display-01': {
      fontWeight: '800',
      fontSize: '80px',
      lineHeight: '139.9999976158142%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-display-02': {
      fontWeight: '800',
      fontSize: '72px',
      lineHeight: '139.9999976158142%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-display-03': {
      fontWeight: '700',
      fontSize: '64px',
      lineHeight: '139.9999976158142%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-display-04': {
      fontWeight: '700',
      fontSize: '56px',
      lineHeight: '150%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-display-05': {
      fontWeight: '700',
      fontSize: '48px',
      lineHeight: '150%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-heading-01': {
      fontWeight: '700',
      fontSize: '32px',
      lineHeight: '150%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-heading-02': {
      fontWeight: '700',
      fontSize: '24px',
      lineHeight: '150%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-heading-03': {
      fontWeight: '600',
      fontSize: '20px',
      lineHeight: '150%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-heading-04': {
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '170.00000476837158%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-heading-05': {
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '170.00000476837158%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-body-01': {
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '170.00000476837158%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-body-02': {
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: '170.00000476837158%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-body-03': {
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '170.00000476837158%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-body-04': {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '170.00000476837158%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-body-05': {
      fontWeight: '600',
      fontSize: '14px',
      lineHeight: '170.00000476837158%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-body-06': {
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '170.00000476837158%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-caption-01': {
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '170.00000476837158%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-caption-02': {
      fontWeight: '400',
      fontSize: '12px',
      lineHeight: '170.00000476837158%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-caption-03': {
      fontWeight: '600',
      fontSize: '10px',
      lineHeight: '170.00000476837158%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
    'pre-caption-04': {
      fontWeight: '400',
      fontSize: '10px',
      lineHeight: '170.00000476837158%',
      letterSpacing: '-2%',
      textDecoration: 'none',
    },
  }

  const prefix = '.tokFont-'

  const textWithPrefix = {
    ...Object.keys(textStyles).reduce((acc, key) => {
      const prefixedKey = prefix + key
      acc[prefixedKey] = textStyles[key]
      return acc
    }, {}),
  }

  addUtilities(textWithPrefix)
})
