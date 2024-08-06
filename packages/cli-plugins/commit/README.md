# @toktohan-dev/cli-plugin-commit

[@toktokhan-dev/cli](../../cli/README.md) 의 plugin 입니다.
대화형 cli 를 통해 commit message 를 일관된 형식으로 작성할 수 있도록 도와주는 플러그인 입니다. 자세한 내용은 [Tokdocs 공식 문서](https://toktokhan-dev-docs.vercel.app/docs/docs/tokript/Offical%20Plugins/commit)에서 확인 할 수 있습니다.

## Preview

```bash
? Pick Commit Type …
🚀 deploy:     프로젝트 배포
🤖 chore:      자잘한 수정
📝 docs:       문서 관련
🎸 feat:       새로운 기능, 페이지 추가
🐛 fix:        버그 수정
👽 perf:       성능 개선
💡 refactor:   코드 리팩토링
💍 test:       테스트 관련
🎨 style:      스타일링 관련

✔ Pick Commit Type · feat
✔ Pick Change Scope(skip by: Enter) · CartPage
✔ What did you do? · add Component 'List'
✔ has BREAKING CHANGE for major update?(skip by: Enter) ·
? has detail?(skip by: Enter) › ...

# -> feat(CartPage): 🎸add Component 'List'
```

## Installation

```
npm i -D @toktokhan-dev/cli @toktokhan-dev/cli-plugin-commit
```

## Register Plugin

```ts
// tok-cli.config.ts
import { commit } from '@toktokhan-dev/cli-plugin-commit'

const config: RootConfig<{
  plugins: [typeof commit]
}> = {
  plugins: [commit],
}
```

## Run Script

`tokript2` 명령어로 각 플러그인으로 등록된 기능들을 사용할 수 있습니다.

```
npx tokript2 commit
```

## Configuration

`tok-cli.config.ts` 에서 config 정의가 가능합니다.<br/>
각 plugin 별로 option 을 정의하고, 해당 plugin 을 등록하여 사용할 수 있습니다.

```ts
// tok-cli.config.ts
import { commit } from '@toktokhan-dev/cli-plugin-commit'

const config: RootConfig<{
  plugins: [typeof commit]
}> = {
  plugins: [commit],
  commit: {
    types: [{ name: 'deploy', description: '프로젝트 배포', emoji: '🚀' }],
  },
}
```

```ts
export interface CommitConfig {
  /** 모노래포 사용시, workspace 로 커밋 범위 설정할수 있습니다. */
  workspaces?: string[]
  /** 커밋 타입을 지정합니다. */
  types?: CommitType[] | ((initial: CommitType[]) => CommitType[])
}

export interface CommitType {
  name: string
  description: string
  emoji?: string
}
```
