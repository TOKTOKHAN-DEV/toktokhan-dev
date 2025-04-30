import { RootConfig } from '@toktokhan-dev/cli'
import { commit } from '@toktokhan-dev/cli-plugin-commit'

import { genThemeColors } from './scripts/ui/gen-color-theme'

const tokriptRootConfig: RootConfig<{
  plugins: [typeof commit, typeof genThemeColors]
}> = {
  plugins: [commit, genThemeColors],
}
export default tokriptRootConfig
