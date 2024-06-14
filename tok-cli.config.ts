import { RootConfig } from '@toktokhan-dev/cli'
import { commit } from '@toktokhan-dev/cli-plugin-commit'

const config: RootConfig<{ plugins: [typeof commit] }> = {
  plugins: [commit],
  basePath: process.cwd(),
}

export default config
