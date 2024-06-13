// https://developers.naver.com/docs/login/bi/bi.md
export const SOCIALS = {
  kakao: {
    icon: '../public/kakao.svg',
    ko: '카카오 로그인',
    en: 'Login with Kakao',
    style: {
      light: {
        bg: '#FEE500',
        border: 'transparent',
        label: 'rgba(0, 0, 0, 0.85)',
        icon: '#000000',
      },
      dark: {
        bg: '#FEE500',
        border: 'transparent',
        label: 'rgba(0, 0, 0, 0.85)',
        icon: '#000000',
      },
    },
    bg: '#FEE500',
    label: 'rgba(0, 0, 0, 0.85)',
  },
  naver: {
    icon: '../public/apple.svg',
    ko: '네이버 로그인',
    en: 'Login with Naver',
    style: {
      light: {
        bg: '#03C75A',
        border: 'transparent',
        label: '#ffffff',
        icon: '#ffffff',
      },
      dark: {
        bg: '#47474A',
        border: '#585858',
        label: '#A4A4A7',
        icon: '#03C75A',
      },
    },
    bg: '#03C75A',
    label: '#ffffff',
  },
  facebook: {
    icon: '../public/facebook.svg',
    ko: '페이스북 로그인',
    en: 'Login with Facebook',
    style: {
      light: {
        bg: '#1877F2',
        border: 'transparent',
        label: '#ffffff',
        icon: '#ffffff',
      },
      dark: {
        bg: '#1877F2',
        border: 'transparent',
        label: '#ffffff',
        icon: '#ffffff',
      },
    },
    bg: '#1877F2',
    label: '#ffffff',
  },
  google: {
    icon: '../public/google.svg',
    ko: '구글 로그인',
    en: 'Login with Google',
    bg: '#ffffff',
    label: '#000000',
    style: {
      light: {
        bg: '#ffffff',
        border: 'transparent',
        label: '#000000',
        icon: '',
      },
      dark: {
        bg: '#ffffff',
        border: 'transparent',
        label: '#000000',
        icon: '',
      },
    },
  },
  apple: {
    icon: '../public/apple.svg',
    ko: '애플 로그인',
    en: 'Login with Apple',
    bg: '#000000',
    label: '#ffffff',
    style: {
      light: {
        bg: '#000000',
        border: 'transparent',
        label: '#ffffff',
        icon: '#ffffff',
      },
      dark: {
        bg: '#ffffff',
        border: 'transparent',
        label: '#000000',
        icon: '#000000',
      },
    },
  },
} as const
