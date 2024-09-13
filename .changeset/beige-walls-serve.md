---
'@toktokhan-dev/cli-plugin-gen-theme-chakra': patch
---

converting line-height, letter-spacing

## line-height, letter-spacing 단위 변경

- line-height: % -> number
- letter-spacing: % -> em

### 기존

```ts
export const textStyles = {
  'pre-display-01': {
    lineHeight: '140.009976158142%',
    letterSpacing: '-1%',
    ...
  },
}
```

### 변경

```ts
export const textStyles = {
  'pre-display-01': {
    lineHeight: 1.4,
    letterSpacing: '-0.01em',
    ...
  },
}
```
