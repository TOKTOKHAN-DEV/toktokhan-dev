import { commit } from './src/commands/commit'
import { RootConfig } from './src/types/root-config'

const config: RootConfig<{ plugins: [typeof commit] }> = {
  plugins: [],
  basePath: process.cwd(),
  commit: {},
}

export default config
