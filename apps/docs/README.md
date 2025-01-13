# @toktokhan-dev/docs

## 문서 작성

해당 레포에서 관리하는 모듈에 대한 문서는 웹사이트 형태로 배포되어 있으며, [여기](https://toktokhan-dev-docs.vercel.app/) 에서 확인할 수 있습니다.

문서의 종류는 크게 두가지가 있습니다.

1. 직접 작성하는 문서 [Guide](./docs/docs) 문서
2. 코드 주석을 통해 생성되는 API 문서 [API](./docs/api) 문서

#### Guide 문서

가이드 문서는, toktokhan-dev 패키지에서 제공하는 기능들에 대한, 전체적인 사용 방법을 소개하는 문서입니다.

API 문서가 각 모듈에 초점을 맞추어 기능을 설명하는 문서라면, 가이드 문서는 모듈이 아닌 기능에 초점을 맞추어 전체적인 맥락을 설명하는 문서입니다.

예를들어, social 로그인 관련된 모듈이 react-web 패키지에 작성이 되어있다고 한다면, 각 모듈 API 에 대한 파리마터, 리턴값 예시들은 API 문서에작성하고,

해당 모듈을 사용하여, callback 페이지에서, 인가토큰을 받아 로그인 플로우를 구성하는 방식은 가이드 문서에 작성하게 됩니다.

각각은 서로를 의존하고 있지는 않으나, 주로 가이드 문서는 API 문서를 참고하여 작성되는 경우가 많습니다.

가이드 문서를 작성하는 방법은 [./docs](./docs/api) 경로에서 mdx 파일로 작성합니다.

##### 폴더구조

위 경로의 폴더구조는, 웹사이트의 메뉴 구조를 따라가고 있습니다. 자세한 내용은 [docusaurus](https://docusaurus.io/docs/create-doc) 를 참고해보세요.

##### mdx

mdx 확장자는 마크다운 파일에서 자바스크립트 코드를 사용할 수 있도록 해주는 확장자입니다. 반복되는 md 컨텐츠를, 컴포넌트화 하여 js 와 함께 사용을 할 수 있습니다. 자세한 내용은 [mdx](https://mdxjs.com/) 를 참고해보세요.

- mdx 컴포넌트 관리 폴더: [./src/components/@mdx](./src/components/@mdx)

- [docusaurus mdx 문서](https://docusaurus.io/docs/markdown-features/react)

###### 예시

```mdx
---
title: Overview
sidebar_label: Overview
sidebar_position: 1
---

import Installations from '@site/src/components/@mdx/_Installation.mdx'
import TipPackageScript from '@site/src/components/@mdx/_TipPackageScript.mdx'
import CodeBlock from '@theme/CodeBlock'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'

# Overview

`Tokit` 은 똑똑한개발자에서 관리하는 프론트엔드 보일러 템플릿을 관리하고, 로컬 환경에 설치 하기 위한 CLI tool 입니다.<br/>
`create-react-app` 처럼 커멘드라인 한줄로 쉽게 설치가 가능하며 원격 레포지토리에 생성하고, 연동 시킬 수 있는 옵션이 있습니다.

### Template List

- [Next-page-init](https://github.com/TOKTOKHAN-DEV/next-page-init)
- [Next-app-init](https://github.com/TOKTOKHAN-DEV/next-page-init)
- [React-native-init](https://github.com/TOKTOKHAN-DEV/next-page-init)

## Installation

<Installations isGlobal package={'@toktokhan-dev/tokit'} />

## Run Script

### Interactive

`tokit` 명령어로 대화형 모드를 실행해주세요.

<CodeBlock language="bash">{`tokit`}</CodeBlock>

그런 다음, 프롬프트의 질문에 답해주세요.<br/>

<CodeBlock title={'Terminal'} language="bash" showLineNumbers>
  {`What is your project named?  my-app
What is your template?  <tokit-template-list>[]
What is your package manager?  ['npm', 'pnpm', 'yarn']
Would you like to create a remote repository on GitHub?  No / Yes 
`}
</CodeBlock>

프롬프트에 응답하면 답변에 따라 올바른 구성으로 새 프로젝트가 생성됩니다.

:::info
`4. Would you like to create a remote repository on GitHub ` 는 로컬에 설치 된 Template을 Github 원격 레포지토리에 지정된 `Project Name`으로 생성하고, `origin`으로 remote 시켜 올려주는 기능입니다.

<br />
<br />
때문에 Github 관련 환경 변수 설정이 필수적으로 필요합니다. `Yes` 를 선택
하셨다면 **[Set Up Your Environment](/docs/docs/tokit/Environment)** 페이지를
참고하여 본인이 사용하고 있는 `shell`에 환경 변수를 등록해주세요. :::

### None-Interactive

`tokit [path]` 첫번째 인자로 설치할 경로를 넘겨줄 경우, 해당 질문을 생략하고 설치가 진행됩니다.

<CodeBlock language="bash">{`tokit MyProject`}</CodeBlock>
```

#### API 문서

API 문서는, 각 모듈에 대한 상세한 설명을 기술하는 문서입니다. 파라미터, 리턴, 예시코드 등이 포함됩니다.

API 문서는 가이드문서와 다르게, 모든것을 직접 작성하지 않으며, 코드 주석을 통해 작성된 내용이 문서로 변환되는 형태입니다.

각 모듈에 작성된 [tsdoc](https://tsdoc.org/) 문법으로 작성된 주석은 [api-extractor](https://api-extractor.com/) 를 통해 md 파일로 변환됩니다.
md 파일로 변환된 파일들은 docusaurus 에서 읽히게 되며, 웹사이트에서 문서로 보여지게 됩니다.

###### 예시

- [arrayToMap 웹 문서](https://toktokhan-dev-docs.vercel.app/docs/universal.arraytomap)

````ts
import { curry } from 'lodash'

/**
 * 배열을 Map으로 변환합니다. 각 요소는 지정된 키 선택기 함수를 통해 매핑됩니다.
 *
 * @curried
 * @category Utils/Array
 *
 * @typeParam T - 배열 요소의 타입
 * @typeParam K - Map의 키 타입
 *
 * @param keySelector - 배열 요소를 Map의 키로 변환하는 함수
 * @param arr - 변환할 배열
 *
 * @returns 배열의 각 요소를 Map으로 매핑한 결과
 *
 * @example
 * ```ts
 * const arr = [
 *  { id: 1, name: 'Alice' },
 *  { id: 2, name: 'Bob' },
 *  { id: 3, name: 'Charlie' },
 * ];
 *
 * const map = arrayToMap((item) => item.id , arr);
 * // or
 * const map = arrayToMap((item) => item.id)(arr);
 * // or
 * const mapById = arrayToMap((item) => item.id);
 * const map = mapById(arr);
 *
 * console.log(map)
 * // Map {
 * //   1 => { id: 1, name: 'Alice' },
 * //   2 => { id: 2, name: 'Bob' },
 * //   3 => { id: 3, name: 'Charlie' },
 * // }
 *```
 */
export const arrayToMap: {
  <T, K>(keySelector: (data: T) => K, arr: T[]): Map<K, T>
  <T, K>(keySelector: (data: T) => K): (arr: T[]) => Map<K, T>
} = curry(<T, K>(keySelector: (data: T) => K, arr: T[]): Map<K, T> => {
  return arr.reduce((prev, cur) => {
    const key = keySelector(cur)
    return prev.set(key, cur)
  }, new Map())
})
````

##### @Category

위 예시 파일을 보게되면, `@category Utils/Array` 라는 주석이 있습니다.

이 주석은 문서 메뉴에서 해당 모듈이 속한 카테고리를 단순 표시하는 역할뿐 아니라, 웹사이트에서 사이드바의 메뉴 UI 를 결정하는 역할을 합니다.

예를들어, 위 예시 파일은 `Utils/Array` `Utils` 라는 그룹 메뉴 아래의 `Array` 라는 그룹 메뉴 아래의 `arrayToMap` 라는 메뉴로 보여 지게 됩니다.

##### doc script

문서를 생성하기 위해, api-extrator 를 사용하고 있는 스크립트를 실행하게 됩니다. 해당 스크립트 플로우는, 문서 생성을 위해, 세부적인 플로우도 포함하고 있습니다.

- 폴더 주소: [./scripts/generate-api-docs](./scripts/generate-api-docs)

- entry point: [./scripts/generate-api-docs/index.ts](./scripts/generate-api-docs/index.ts)

- 실행 스크립트: `pnpm gen:doc`

###### 1. [/install-packages.ts](./scripts/generate-api-docs/flows/install-packages.ts)

빌드에 필요한 패키지를 설치합니다. 실행환경이 github action 에서 실행되기 때문에 필요한 과정입니다.

###### 2. [/build-packages.ts](./scripts/generate-api-docs/flows/build-packages.ts)

(생략)

###### 3. [/handle-dts.ts](./scripts/generate-api-docs/flows/handle-dts.ts)

build 플로우를 거치게되면, 타입정의를 포함하고 있는 dts 파일이 생성됩니다. 생성된 dts 파일을 보정하여, 문서용 dts 파일을 새롭게 생성합니다.

해당 파일을 개행문자들을 재거하는등, 파일을 보정하고, @category 주석을 분석하여, 데이터화 시켜서 ScriptStore 임시 저장합니다.

###### 4. [/build-api-extractor-json.ts](./scripts/generate-api-docs/flows/build-api-extractor-json.ts)

api-extractor 를 통해, 주석을 분석하여, json 파일을 생성합니다.

###### 5. [/handle-api-extractor-json.ts](./scripts/generate-api-docs/flows/handle-api-extractor-json.ts)

생성된 json 파일을 보정합니다.

###### 6. [/build-api-docs.ts](./scripts/generate-api-docs/flows/build-api-docs.ts)

api-documenter 를 통해, 주석을 분석하여, md 파일을 생성합니다.

###### 7. [/handle-index-markdown.ts](./scripts/generate-api-docs/flows/handle-index-markdown.ts)

생성된 md 파일중 색인 역할을 하는 index.md 파일을 보정합니다. 일반적으로 생성한 index.md 파일은, category 화 되어있지 않기 때문에, 작성한 category 구조에 맞게 테이블을 분리하여 보정합니다.

###### 8. [/handle-api-doc-folder-structure.ts](./scripts/generate-api-docs/flows/handle-api-doc-folder-structure.ts)

api-documenter 를 통해 생성된 md 파일들을 폴더 구조에 맞게 정리합니다.

###### 9. [/clean-dts.ts](./scripts/generate-api-docs/flows/clean-dts.ts)

임시 생성했던 문서용 dts 파일을 제거합니다.
