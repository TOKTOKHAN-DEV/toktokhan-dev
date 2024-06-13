import { setUpRollUp } from '@toktokhan-dev/rollup-config/base.js'

const config = [
  setUpRollUp({
    input: 'src/index.ts',
    output: 'dist/index.js',
    format: 'cjs',
  }),
]

export default config
