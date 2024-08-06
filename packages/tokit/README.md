# @toktokhan-dev/tokit

`Tokit` 은 똑똑한개발자에서 관리하는 프론트엔드 보일러 템플릿을 관리하고, 로컬 환경에 설치 하기 위한 CLI tool 입니다.<br/>
`create-react-app` 처럼 커멘드라인 한줄로 쉽게 설치가 가능하며 원격 레포지토리에 생성하고, 연동 시킬 수 있는 옵션이 있습니다.

### Template List

- [next-page-init](https://github.com/TOKTOKHAN-DEV/next-page-init)
- [next-app-init](https://github.com/TOKTOKHAN-DEV/next-app-init) (준비중)
- [rn-init]() (준비중)
- [monorepo-init]() (준비중)

자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokit/Overview)에서 확인 할 수 있습니다.

## Installation

```
npm i -g @oktokhan-dev/tokit
```

## Run Script

```bash
tokit
```

## Preview

```
 _             _      _   _
 | |_    ___   | | __ (_) | |_
 | __|  / _ \  | |/ / | | | __|
 | |_  | (_) | |   <  | | | |_
  \__|  \___/  |_|\_\ |_|  \__|

Usage: tokit [options] [path]

CLI to help install tok's template

Arguments:
  path                source code path

Options:
  -V, --version       output the version number
  -p, --project-name
  -t, --template      output the version number
  -m, --manager       output the version number
  -h, --help          display help for command
✔ What is your project name? · my-project

? What's your template?next-page-init
❯ next-page-init
  next-app-init
  rn-native-base-init

? What version do you want to use? v0.0.9
❯ v0.0.9
  v0.0.8
  v0.0.7
  v0.0.6
  v0.0.5
  v0.0.4
  v0.0.3
  v0.0.2
  v0.0.1

? What is your package manager? npm
❯ npm
  pnpm
  yarn

? Would you like to create a remote repository on GitHub? …
❯ No
  Yes
```

## Environment

```
# .zshrc (ex)

export TOKIT_GITHUB_TOKEN=<your-github-token>
export TOKIT_GITHUB_OWNER=<your-github-owner>
export TOKIT_GITHUB_USERNAME=<your-github-username>
```
