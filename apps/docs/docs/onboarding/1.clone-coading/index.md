---
id: intro
sidebar_label: 개미생활 클론 코딩
sidebar_position: 1
description: 프로젝트를 클론코딩 하면서, 똑똑한개발자에서 주로 사용하는 라이브러리를 경험해 보세요
---

# 개미생활 클론 코딩

- [피그마 시안](https://www.figma.com/file/V0Qhv4lQjmwZPOIk4RMtBV/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EC%98%A8%EB%B3%B4%EB%94%A9?node-id=1%3A4838)&#x20;

## 목표

- 프로젝트에서 주로 사용하는 기능과, 툴에 익숙해지기
- 유지보수 하기 좋은 코드를 위해 어떤 것 을 신경써야 하는지
- UX 를 개선 시키기 위해 어떤 처리를 해야하는지

## 주요 기능과 툴

- Styling -> [Chakra-UI](https://chakra-ui.com/)
- Form Logic -> [React-Hook-Form](https://react-hook-form.com/)
- State Management -> React Context
- Network -> [Axios](https://axios-http.com/kr/), [React-Query](https://tanstack.com/query/latest/docs/react/overview)

## 개발 우선 순위

1. 구현 및 일정
2. 유지 보수 고려
3. 가독성
4. 안정성
5. 최적화

## 설치

### “next-init2.0” 프로젝트 생성

보일러 탬플릿 → [Link](https://github.com/TOKTOKHAN-DEV/next-init-2.0)

- 위의 링크를 클릭해서 `next-init-2.0`을 기반으로 한 템플릿 리포지토리를 생성해주세요. 리포지토리의 네이밍은 `front-onboarding-<본인이니셜>`로 통일합니다. ex) `front-onboarding-tok` (**use this template**을 사용하면 기존의 commit history를 제외하고, 리포지토리를 생성 할 수 있습니다.)

### 온보딩 프로세스 진행을 위한 server 프로젝트 클론

Server → [Link](https://github.com/TOKTOKHAN-DEV/front-onboarding-server)

- 위의 링크 클릭하여 온보딩 프로젝트에서 활용할 server 프로젝트를 클론해주세요.
- `yarn` 커맨드를 사용하여 의존성 파일들을 설치하세요.
- `yarn start` 커맨드를 입력하여 온보딩 프로젝트에서 사용할 서버를 구동합니다.
- https://localhost:4000/api-docs 에 접근해서 swagger 확인하기
