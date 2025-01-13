# TOKTOKHAN-DEV

똑똑한 개발자 프론트엔드에서 사용하는 모듈을 관리하는 모노레포입니다.

## Template

아래 템플릿들은 각각 프로젝트 시작시 사용되는 보일러 템플릿입니다.
모노레포의 서브모듈로써 관리되므로, 각각의 Repo 를 가지고 있어, 개별, 통합관리가 가능합니다.

> ##### Template Clone 하는 방법
>
> 각각의 레포 주소에서 템플릿을 clone 할수도 있지만, CLI 툴인 Tokit 을 사용하여, 버전별로 다운로드가 가능합니다.

> ##### Submodule 이란
>
> Git 서브모듈은 Git 저장소 안에 다른 Git 저장소를 디렉토리로 분리해 넣을 수 있게 해주는 기능입니다.
> 프로젝트의 개별 레포에서 간단히 커밋하는것도 가능합니다.
>
> ###### 서브모듈 관리 방법
>
> 1. 서브모듈 초기화 및 업데이트
>
> ```bash
> # 저장소 클론 후 최초 1회
> git submodule init
> git submodule update
>
> # 또는 한 번에 실행
> git submodule update --init --recursive
> ```
>
> 2. 서브모듈 최신 변경사항 가져오기
>
> ```bash
> # 모든 서브모듈 한 번에 업데이트
> git submodule update --remote
>
> # 특정 서브모듈만 업데이트
> git submodule update --remote [서브모듈_경로]
> ```
>
> 참고 문서:
>
> - [Git 공식 문서 - 서브모듈](https://git-scm.com/book/ko/v2/Git-도구-서브모듈)
> - [Atlassian Git 튜토리얼 - 서브모듈](https://www.atlassian.com/git/tutorials/git-submodule)

#### Next Page Init

next 의 page router 방식으로 작성된 템플릿입니다.

- [Repo](https://github.com/TOKTOKHAN-DEV/next-page-init)
- [@toktokhan-dev/next-app-init](./templates/next-app-init/README.md)

#### Next App Init

next 의 app router 방식으로 작성된 템플릿입니다.

- [Repo](https://github.com/TOKTOKHAN-DEV/next-app-init)
- [@toktokhan-dev/next-app-router-init](./templates/next-app-init/README.md)

## CLI

#### Tokit

프로젝트를 버젼별로 install 할 수 있는cli 툴입니다.
환경변수를 등록하면, 처음 clone 하고 TOKTOKHAN-DEV 레포에 push 하는 과정까지 cli 에서 가능합니다.

- [@toktokhan-dev/cli](./packages/tokit/README.md)
- [노션 온보딩에서 똑똑한개발자 깃헙 토큰 확인하기](https://www.notion.so/toktokhan/Tokit-Next-Page-Router-push-dd86c3dc19e54cc0bb1be7c055e0d23b?pvs=4)

#### Tokript

프로젝트를 진행하며 필요한 cli 모듈을 관리하는 툴입니다.
다양한 플러그인으로 구성되어 있으며, 플러그인을 추가하여 사용할 수 있습니다.

- [@toktokhan-dev/tokript](./packages/cli/README.md)

##### 플러그인 목록

- [@toktokhan-dev/cli-plugins-commit](./packages/cli-plugins/commit/README.md)
- [@toktokhan-dev/cli-plugins-gen-api-react-query](./packages/cli-plugins/gen-api-react-query/README.md)
- [@toktokhan-dev/cli-plugins-gen-icon-chakra](./packages/cli-plugins/gen-icon-chakra/README.md)
- [@toktokhan-dev/cli-plugins-gen-icon-rn](./packages/cli-plugins/gen-icon-rn/README.md)
- [@toktokhan-dev/cli-plugins-gen-img](./packages/cli-plugins/gen-img/README.md)
- [@toktokhan-dev/cli-plugins-gen-img-rn](./packages/cli-plugins/gen-img-rn/README.md)
- [@toktokhan-dev/cli-plugins-gen-route-pages](./packages/cli-plugins/gen-route-pages/README.md)
- [@toktokhan-dev/cli-plugins-gen-sitemap-next-page](./packages/cli-plugins/gen-sitemap-next-page/README.md)
- [@toktokhan-dev/cli-plugins-gen-theme-chakra](./packages/cli-plugins/gen-theme-chakra/README.md)
- [@toktokhan-dev/cli-plugins-gen-yup](./packages/cli-plugins/gen-yup/README.md)

##### Script

각 플러그인은 고유하게 관리될 수 있으나, 공통 적으로 사용되는 스크립트가 있습니다.

- playground 환경 실행: `pnpm --filter {package-name} play`

해당 스크립트는 각 플러그인 패키지의 `src/playground.ts` 파일을 실행하여, 빠르게 플러그인의 input 을 조정하여 실행할수 있는 환경을 제공합니다.

## Modules

프로젝트에서 공통으로 사용할수 있는 다양한 모듈들을 관리합니다. 각 모듈은 사용 범위별로 구분되어 있습니다.

#### Universal

js 환경에서 사용 가능한 모듈입니다.

- [@toktokhan-dev/universal](./packages/universal/README.md)

#### Node

node 환경에서 사용 가능한 모듈입니다.

- [@toktokhan-dev/node](./packages/node/README.md)

#### React

react 환경에서 사용 가능한 모듈입니다.

- [@toktokhan-dev/react-universal](./packages/react/universal/README.md)
- [@toktokhan-dev/react-app](./packages/react/app/README.md)
- [@toktokhan-dev/react-web](./packages/react/web/README.md)

#### Third Party

외부 라이브러리를 사용하는 모듈입니다.

##### Zustand

- [@toktokhan-dev/zustand-react](./packages/zustand/react/README.md)
- [@toktokhan-dev/zustand-with-setter](./packages/zustand/with-setter/README.md)
- [@toktokhan-dev/zustand-create-store-context](./packages/zustand/create-store-context/README.md)

##### Chakra

- [@toktokhan-dev/chakra](./packages/chakra/README.md)

##### Github

- [@toktokhan-dev/github](./packages/github/README.md)

## Apps

#### Toktoken (Figma Plugin)

피그마에서 실행되는 피그마 플러그인으로써 figma token 을 분석해, 컬러, 텍스트 스타일에 대한 토큰을 json 파일로 추출합니다.

자세한 내용은 [@toktokhan-dev/toktoken guide](./apps/toktoken/guide.md) 을 확인해 보세요

## 배포 및 버전 관리

[github action](.github/workflows/release.yml) 과 [chageset](https://github.com/changesets/changesets) 을 사용하여 베포하고, 버전을 관리합니다.

자세한 내용은 [.changeset/README.md](./.changeset/README.md) 을 확인해보세요

## 문서 작성

해당 레포에서 관리하는 모듈에 대한 문서는 웹사이트 형태로 배포되어 있으며, [여기](https://toktokhan-dev-docs.vercel.app/) 에서 확인할 수 있습니다.

- 폴더 경로: [./apps/docs](./apps/docs)
- 스크립트:
  - 문서 빌드: `pnpm gen:doc`
  - 문서 실행: `pnpm start:doc`

자세한 내용은 [./apps/docs/README.md](./apps/docs/README.md) 를 참고해보세요.
