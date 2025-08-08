import { RootConfig } from '@toktokhan-dev/cli'
import { commit } from '@toktokhan-dev/cli-plugin-commit'
import { genApi } from '@toktokhan-dev/cli-plugin-gen-api-react-query'

import { genThemeColors } from './scripts/ui/gen-color-theme'

const tokriptRootConfig: RootConfig<{
  plugins: [typeof commit, typeof genThemeColors, typeof genApi]
}> = {
  'gen:api': {
    swaggerSchemaUrls: [
      'https://service-api.dev.tagme.my/v3/api-docs/6.%20ADMIN%20API',
      'https://service-api.dev.tagme.my/v3/api-docs/1.%20%EC%9D%BC%EB%B0%98%20API',
    ],
  },
  plugins: [commit, genThemeColors, genApi],
}
export default tokriptRootConfig
