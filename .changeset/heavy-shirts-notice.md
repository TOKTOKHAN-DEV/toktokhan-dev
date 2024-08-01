---
'@toktokhan-dev/cli-plugin-gen-theme-chakra': patch
---

디자인과 개발이 병렬적으로 진행될 때, 디자인 단계에서 특정 토큰이 지정되지 않을 수 있습니다. 이러한 경우를 대비하여, 참조값이 없는 경우 색상값을 그대로 사용하도록 수정했습니다.

### case 1

```json
"colors" :{
  ... ,
  "semanticTokens":{
    "token-a": {
        "light": {
          "id": "VariableID:1:1532",
          "refId": "VariableID:43:1471",
          "ref": "brand-500",
          "value": "#4850ff"
        },
        "dark": {
          "id": "VariableID:1:1532",
          "refId": "VariableID:43:1466",
          "ref": "brand-50",
          "value": "#e3edff"
        }
      },
  }
}
```

```ts
export const colors = {
  'token.a': {
    default: colorSchema['brand.500'],
    _dark: colorSchema['brand.50'],
  },
}
```

### case 2

```json
"colors" :{
  ... ,
  "semanticTokens":{
    "token-b": {
        "light": {
          "id": null,
          "refId": null,
          "ref": null,
          "value": "#ffffff"
        },
        "dark": {
          "id": "VariableID:4966:1337",
          "refId": "VariableID:43:1458",
          "ref": "violet-200",
          "value": "#b8acf6"
        }
      },
  }
}
```

```ts
export const colors = {
  'token.b': {
    default: '#ffffff',
    _dark: colorSchema['violet.200'],
  },
}
```

### case-3

```json
"colors" :{
  ... ,
  "semanticTokens":{
    "token-c": {
        "light": {
          "id": null,
          "refId": null,
          "ref": null,
          "value": "#ffffff"
        },
        "dark": {
          "id": null,
          "refId": null,
          "ref": null,
          "value": "#b8acf6"
        }
      },
  }
}
```

```ts
export const colors = {
  'token.b': {
    default: '#ffffff',
    _dark: '#b8acf6',
  },
}
```
