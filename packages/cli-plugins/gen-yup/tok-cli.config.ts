import { RootConfig } from '@toktokhan-dev/cli'

import { genYup } from './src'

const config: RootConfig<{ plugins: [typeof genYup] }> = {
  plugins: [genYup],
  'gen:yup': {},
}

export default config
