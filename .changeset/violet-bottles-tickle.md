---
'@toktokhan-dev/cli-plugin-gen-theme-chakra': patch
---

피그마 플러그인 toktoken의 파싱 방식 변경에 따라 해당 플러그인도 변경이 되었습니다.

### toktoken 변경졈

기존

```json
 "pre-display-01-sm": {
  "fontWeight": 800,
  "fontFamily": "Pretendard Variable",
  "fontSize": "72px",
  "lineHeight": "120.00000476837158%",
  "letterSpacing": "-1%",
  "textDecoration": "none"
},
 "pre-display-01-md": {
  "fontWeight": 800,
  "fontFamily": "Pretendard Variable",
  "fontSize": "72px",
  "lineHeight": "120.00000476837158%",
  "letterSpacing": "-1%",
  "textDecoration": "none"
},
```

변경 후

```json
"pre-display-01": {
  "fontWeight": 800,
  "fontFamily": "Pretendard Variable",
  "fontSize": {
    mobile: "72px",
    tablet: "80px",
    pc: "90px"
  },
  "lineHeight": "120.00000476837158%",
  "letterSpacing": "-1%",
  "textDecoration": "none"
},
```

## @toktokhan-dev/cli-plugin-gen-theme-chakra 변경점

### textStyles, colors key 포맷방식 변경 맟 공백 대응

기존

`pre- display-  01`->`pre- display-  01`

변경

`pre- display-  01`->`pre.display.01`

### tokenMode 타입 추가

이에 따라 textStyles 또한 colors처럼 tokenModes에서 지정할 수 있게 변경되었습니다.

기존

```ts
type TokenModes = {
  light: string
  dark?: string
}
```

변경 후

```ts
type TokenModes = {
  colors?: ColorModes
  textStyles?: TextStyleModes
}

type ColorModes = {
  light: string
  dark?: string
}
type TextStyleModes = Partial<Record<BreakPoints, string>>
type BreakPoints = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
```

textStyles의 경우 아래와 같이 chakra의 중단점(breakpoints)에 맞게 지정할 수 있게 되었습니다.

```ts
{
  'gen:theme': {
    tokenModes: {
      colors: { light: 'light', dark: 'dark' },
      textStyles: { base: 'mobile', sm: 'tablet', md: 'pc' },
    },
    ...
  },
}
```

### cli 출력 결과

```ts
export const textStyles = {
  'pre-display-01': {
    fontWeight: 800,
    fontFamily: 'Pretendard Variable',
    fontSize: {
      base: '72px',
      sm: '80px',
      md: '90px',
    },
    lineHeight: '120.00000476837158%',
    letterSpacing: '-1%',
    textDecoration: 'none',
  },
  ...
}
```
