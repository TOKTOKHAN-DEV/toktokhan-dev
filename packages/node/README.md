# @toktokhan-dev/node

`node` 환경에서 사용 가능한, `utility function` 을 제공합니다. `cjs`, 와 `es` 환경 모두 사용 가능한 모듈입니다.

자세한 내용 및 제공하는 유틸 함수의 목록은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/node)에서 확인 할 수 있습니다.

## Installation

```
npm i @oktokhan-dev/node
```

## Preview

```ts
import {
  createPackageRoot,
  findFileToTop,
  json,
  prettierString,
} from '@toktokhan-dev/node'

const packageRoot = createPackageRoot(__dirname)
const packageJsonPath = pacageRoot('package.json')
const packageJson = json(packageJsonPath)

const prettierConfigPath = findFileToTop('.', '.prettierrc')
const file = readFileSync('Component.tsx', 'utf-8')
const prettyFile = prettierString(file, { configPath: 'auto', tabWidth: 2 })
```
