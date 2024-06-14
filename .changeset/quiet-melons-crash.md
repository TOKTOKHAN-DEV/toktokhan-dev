---
'@toktokhan-dev/cli': patch
---

commit move to plugin

기존 내장되어 있던 command 'commit' 이 plugin 으로 분리되었습니다.

# Installation

```
npm i -D @toktokhan-dev/cli-plugin-commit
```

# Configuration

```typescript
//tok-cli.config.ts
import { RootConfig } from '@toktokhan-dev/cli'
import { commit } from '@toktokhan-dev/cli-plugin-commit'

const config: RootConfig<{ plugins: [typeof commit] }> = {
  plugins: [commit],
  basePath: process.cwd(),
}

export default config
```
