#### Toktoken (Figma Plugin) Guide

피그마에서 실행되는 피그마 플러그인으로써 figma token 을 분석해, 컬러, 텍스트 스타일에 대한 토큰을 json 파일로 추출합니다.

- [@toktokhan-dev/toktoken](./apps/toktoken/README.md)

##### 환경변수

- 노션: [Toktoken 피그마 플러그인 환경변수](https://www.notion.so/toktokhan/6aa0019caef14693b4dd3d66828692c6?pvs=4)

##### 실행하기

아래 스크립트를 실행하여 소스파일을 빌드합니다.

```
pnpm --filter Toktoken build:watch
```

이후 figma 에서 맥기준 상단바의 `Plugins > Development > import plugin from manifest...` 메뉴를 클릭하여, `./apps/toktoken/manifest.json` 파일을 선택하여 플러그인을 실행합니다.

##### 배포하기

github action 을 통해 관리되고 있지 않으며, 직접 figma plugin 에서 배포를 해야합니다. [figma plugin 배포 가이드](https://help.figma.com/hc/en-us/articles/360042293394-Publish-plugins-to-the-Figma-Community#h_01HA2DQNF7CMZW2Q5T6H7DSZX0) 를 참고하여 배포 할 수 있습니다.

[계정정보](https://www.notion.so/toktokhan/6aa0019caef14693b4dd3d66828692c6?pvs=4)를 참고하여 figma 에서 fe-system 계정으로 구글 로그인 한 후에 배포를 진행 할 수 있습니다.

```
devmode 실행 > 우측 plugin 탭 > toktoken 개발버젼 메뉴 버튼 클릭 > Publish New Version 클릭 후 배포 진행
```

##### 플러그인 배포 플로우

build:watch 를 실행하게 되면, html 파일과 js 파일을 포함한 소스코드가 빌드됩니다. 빌드된 파일을 루트 경로의 [manifest.json](./manifest.json) 파일에 등록합니다. 피그마에서 해당 파일을 읽어, 개발 환경 실행 및 배포에 사용됩니다.

##### 주요 환경 및 코드 설명

피그마 플러그인의 주요 환경은 크게 두가지가 있습니다.

1. ui (유저에게 보여지는 화면)
2. controller (피그마 api 를 사용하여 피그마 데이터에 접근 할 수 있는 환경)

이 두가지 환경은 각각 window meessage event 로 양방향 통신하여, 데이터를 주고받거나, 피그마를 제어하는 행동을 수행합니다.

하지만, 해당 프로젝트에서는 관리의 편의성을 위해, 단방향 통신 처럼 작동하도록 사용하고 있습니다.

1.  UI(요청) -> Controller(응답)
2.  Controller(요청) -> UI(응답)

각각의 통신 방식은 action 이라 명명하여, 아래 파일에서 관리됩니다.

- [UI Action](./src/action/ui/index.ts)
- [Controller Action](./src/action/controller/index.ts)

UI Action 을 만들경우 Controller 측에서 Listerner 를 등록하여, 요청에 맞는 응답을 정의할 수 있습니다.

- [Controller Listerner](./src/controller/main.ts)

이런 요청 응답 방식을 react query 와 비슷한 형식의 hook 으로 추상화 하여 사용합니다.

- [useFetch](./src/ui/hooks/useFetch.ts)
- [useMutation](./src/ui/hooks/useMutation.ts)
- [사용 예시](./src/ui/App.tsx)
