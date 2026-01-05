import { RootConfig } from '@toktokhan-dev/cli'
import { commit } from '@toktokhan-dev/cli-plugin-commit'
import { genApi } from '@toktokhan-dev/cli-plugin-gen-api-react-query'

import { genThemeColors } from './scripts/ui/gen-color-theme'

const tokriptRootConfig: RootConfig<{
  plugins: [typeof commit, typeof genThemeColors, typeof genApi]
}> = {
  'gen:api': {
    swaggerSchemaUrls: [],
  },
  plugins: [commit, genThemeColors, genApi],
}
export default tokriptRootConfig
