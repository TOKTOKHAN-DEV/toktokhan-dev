import plugin from 'tailwindcss/plugin'

export default plugin(({ addUtilities, theme }) => {
  const sm = theme('screens.sm')
  const md = theme('screens.md')

  const textStyles = {
    // Pretendard Variable Font Styles
    'pre-display-01': {
      fontFamily: 'Pretendard Variable',
      fontSize: '48px',
      fontWeight: 800,
      lineHeight: '140%',
      letterSpacing: '-1%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '48px',
      },
      [`@media (min-width: ${md})`]: {
        fontSize: '80px',
      },
    },
    'pre-display-02': {
      fontFamily: 'Pretendard Variable',
      fontSize: '40px',
      fontWeight: 700,
      lineHeight: '140%',
      letterSpacing: '-1%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '40px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '64px',
      },
    },
    'pre-display-03': {
      fontFamily: 'Pretendard Variable',
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '150%',
      letterSpacing: '-1%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '32px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '48px',
      },
    },
    'pre-heading-01': {
      fontFamily: 'Pretendard Variable',
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '150%',
      letterSpacing: '-1%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '24px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '32px',
      },
    },
    'pre-heading-02': {
      fontFamily: 'Pretendard Variable',
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '150%',
      letterSpacing: '-1%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '20px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '24px',
      },
    },
    'pre-heading-03': {
      fontFamily: 'Pretendard Variable',
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '-1%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '18px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '20px',
      },
    },
    'pre-heading-04': {
      fontFamily: 'Pretendard Variable',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '-1%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '16px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '18px',
      },
    },
    'pre-heading-05': {
      fontFamily: 'Pretendard Variable',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '160%',
      letterSpacing: '-1%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '16px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '16px',
      },
    },
    'pre-body-01': {
      fontFamily: 'Pretendard Variable',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '160%',
      letterSpacing: '-2%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '16px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '18px',
      },
    },
    'pre-body-02': {
      fontFamily: 'Pretendard Variable',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '160%',
      letterSpacing: '-2%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '16px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '18px',
      },
    },
    'pre-body-03': {
      fontFamily: 'Pretendard Variable',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '160%',
      letterSpacing: '-2%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '16px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '16px',
      },
    },
    'pre-body-04': {
      fontFamily: 'Pretendard Variable',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '160%',
      letterSpacing: '-2%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '16px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '16px',
      },
    },
    'pre-body-05': {
      fontFamily: 'Pretendard Variable',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '160%',
      letterSpacing: '-2%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '14px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '14px',
      },
    },
    'pre-body-06': {
      fontFamily: 'Pretendard Variable',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '160%',
      letterSpacing: '-2%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '14px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '14px',
      },
    },
    'pre-caption-01': {
      fontFamily: 'Pretendard Variable',
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '160%',
      letterSpacing: '-2%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '12px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '12px',
      },
    },
    'pre-caption-02': {
      fontFamily: 'Pretendard Variable',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '160%',
      letterSpacing: '-2%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '12px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '12px',
      },
    },
    'pre-caption-03': {
      fontFamily: 'Pretendard Variable',
      fontSize: '10px',
      fontWeight: 600,
      lineHeight: '160%',
      letterSpacing: '-2%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '10px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '10px',
      },
    },
    'pre-caption-04': {
      fontFamily: 'Pretendard Variable',
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: '160%',
      letterSpacing: '-2%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '10px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '10px',
      },
    },

    // Uncut Sans Variable Font Styles
    'uncut-display-01': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '80px',
      fontWeight: 700,
      lineHeight: '100%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '80px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '260px',
      },
    },
    'uncut-display-02': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '64px',
      fontWeight: 700,
      lineHeight: '100%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '64px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '160px',
      },
    },
    'uncut-display-03': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '48px',
      fontWeight: 700,
      lineHeight: '120%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '48px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '80px',
      },
    },
    'uncut-display-04': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '40px',
      fontWeight: 700,
      lineHeight: '120%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '40px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '64px',
      },
    },
    'uncut-display-05': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '120%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '32px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '48px',
      },
    },
    'uncut-heading-01': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '150%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '24px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '32px',
      },
    },
    'uncut-heading-02': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '150%',
      letterSpacing: '-2%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '20px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '24px',
      },
    },
    'uncut-heading-03': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '18px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '20px',
      },
    },
    'uncut-heading-04': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '150%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '16px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '18px',
      },
    },
    'uncut-heading-05': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '150%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '16px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '16px',
      },
    },
    'uncut-body-01': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '140%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '16px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '18px',
      },
    },
    'uncut-body-02': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '140%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '16px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '18px',
      },
    },
    'uncut-body-03': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '140%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '16px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '16px',
      },
    },
    'uncut-body-04': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '140%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '16px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '16px',
      },
    },
    'uncut-body-05': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '140%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '14px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '14px',
      },
    },
    'uncut-body-06': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '140%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '14px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '14px',
      },
    },
    'uncut-caption-01': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '140%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '12px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '12px',
      },
    },
    'uncut-caption-02': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '140%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '12px',
      },

      [`@media (min-width: ${md})`]: {
        fontSize: '12px',
      },
    },
    'uncut-caption-03': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: '140%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '10px',
      },
      [`@media (min-width: ${md})`]: {
        fontSize: '10px',
      },
    },
    'uncut-caption-04': {
      fontFamily: 'Uncut Sans Variable',
      fontSize: '10px',
      fontWeight: 400,
      lineHeight: '140%',
      letterSpacing: '-3%',
      [`@media (min-width: ${sm})`]: {
        fontSize: '10px',
      },
      [`@media (min-width: ${md})`]: {
        fontSize: '10px',
      },
    },
  }

  const prefix = '.typo-'

  const textWithPrefix = Object.keys(textStyles).reduce<Record<string, any>>(
    (acc, key) => {
      const prefixedKey = prefix + key
      acc[prefixedKey] = textStyles[key as keyof typeof textStyles]
      return acc
    },
    {},
  )

  addUtilities(textWithPrefix, {})
})
