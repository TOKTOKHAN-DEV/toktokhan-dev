# @toktokhan-dev/cli-plugin-gen-theme-chakra

## 0.0.10

### Patch Changes

- 863f3bd: 디자인과 개발이 병렬적으로 진행될 때, 디자인 단계에서 특정 토큰이 지정되지 않을 수 있습니다. 이러한 경우를 대비하여, 참조값이 없는 경우 색상값을 그대로 사용하도록 수정했습니다.

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

## 0.0.9

### Patch Changes

- Updated dependencies [f414a7f]
  - @toktokhan-dev/universal@0.0.7
  - @toktokhan-dev/cli@0.0.9
  - @toktokhan-dev/node@0.0.8

## 0.0.8

### Patch Changes

- Updated dependencies [aa2b844]
  - @toktokhan-dev/universal@0.0.6
  - @toktokhan-dev/cli@0.0.8
  - @toktokhan-dev/node@0.0.7

## 0.0.7

### Patch Changes

- Updated dependencies [af1668a]
- Updated dependencies [4f0b03f]
- Updated dependencies [9493f66]
  - @toktokhan-dev/universal@0.0.5
  - @toktokhan-dev/cli@0.0.7
  - @toktokhan-dev/node@0.0.6

## 0.0.6

### Patch Changes

- Updated dependencies [d96ea33]
  - @toktokhan-dev/universal@0.0.4
  - @toktokhan-dev/cli@0.0.6
  - @toktokhan-dev/node@0.0.5

## 0.0.5

### Patch Changes

- Updated dependencies [b895311]
  - @toktokhan-dev/node@0.0.4
  - @toktokhan-dev/cli@0.0.5

## 0.0.4

### Patch Changes

- Updated dependencies [7ebbf37]
  - @toktokhan-dev/universal@0.0.3
  - @toktokhan-dev/cli@0.0.4
  - @toktokhan-dev/node@0.0.3

## 0.0.3

### Patch Changes

- Updated dependencies [70acba8]
  - @toktokhan-dev/universal@0.0.2
  - @toktokhan-dev/cli@0.0.3
  - @toktokhan-dev/node@0.0.2

## 0.0.2

### Patch Changes

- Updated dependencies [515de8f]
  - @toktokhan-dev/cli@0.0.2

## 0.0.1

### Patch Changes

- eb93d14: 똑똑한개발자 공식 CLI 플러그인 입니다.
  자세한 설명은 [공식문서](https://toktokhan-dev-docs.vercel.app/docs/category/offical-plugins)를 참조해주세요.

  # Cli-plugin-gen-api-react-query

  Swagger 의 json 을 조회하여 타입정의와 api class, react-query 관련 모듈을 생성합니다. axios 를 사용하는 환경에서 사용가능합니다.

  # Cli-plugin-gen-icon-chakra

  지정된 경로의 svg파일 기반으로 Chakra UI Icon Component 를 생성합니다.

  # Cli-plugin-gen-img

  이미지 경로를 읽어 객체로 생성해줍니다.

  # Cli-plugin-gen-route-pages

  pages 폴더를 조회하여 route 경로를 포함한 객체를 생성합니다. next.js page router에서 사용가능합니다.

  # Cli-plugin-gen-sitemap-next-page

  next.js page router버전의 pages 폴더 기반으로 sitemap.xml 파일을 생성합니다.

  # Cli-plugin-gen-theme-chakra

  theme json 파일기반으로 Chakra theme token을 생성합니다.

- Updated dependencies [7f14e85]
- Updated dependencies [6c928f0]
- Updated dependencies [6f42208]
  - @toktokhan-dev/cli@0.0.1
  - @toktokhan-dev/node@0.0.1
  - @toktokhan-dev/universal@0.0.1

## 0.4.4

### Patch Changes

- Updated dependencies [0f43837]
  - @toktokhan-dev/node@2.0.0
  - @toktokhan-dev/cli@1.4.4

## 0.4.3

### Patch Changes

- Updated dependencies [bb60ca7]
  - @toktokhan-dev/universal@1.3.1
  - @toktokhan-dev/node@1.3.1
  - @toktokhan-dev/cli@1.4.3

## 0.4.2

### Patch Changes

- 5b8176f: ignore sourcemap files
- Updated dependencies [5b8176f]
  - @toktokhan-dev/cli@1.4.2

## 0.4.1

### Patch Changes

- 246b9a2: export file
- Updated dependencies [246b9a2]
  - @toktokhan-dev/cli@1.4.1

## 0.4.0

### Minor Changes

- 7baac8a: test version up

### Patch Changes

- Updated dependencies [7baac8a]
  - @toktokhan-dev/cli@1.4.0
  - @toktokhan-dev/node@1.3.0
  - @toktokhan-dev/universal@1.3.0

## 0.3.0

### Minor Changes

- cfc8181: add tokenModes

## 0.2.1

### Patch Changes

- Updated dependencies [36d6b72]
  - @toktokhan-dev/cli@1.3.0

## 0.2.0

### Minor Changes

- ea08e81: update temp

### Patch Changes

- Updated dependencies [ea08e81]
  - @toktokhan-dev/cli@1.2.0
  - @toktokhan-dev/node@1.2.0
  - @toktokhan-dev/universal@1.2.0
