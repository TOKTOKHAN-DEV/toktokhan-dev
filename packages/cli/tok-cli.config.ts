import { test } from './src/commands/test'
import { RootConfig } from './src/types/root-config'

const config: RootConfig<{ plugins: [typeof test] }> = {
  plugins: [test],
  basePath: process.cwd(),
}

export default config
