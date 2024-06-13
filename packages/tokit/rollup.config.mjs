import { setUpRollUp } from '@toktokhan-dev/rollup-config/base.js'

const config = [
  setUpRollUp({
    input: 'src/run.ts',
    output: 'bin/run.js',
    format: 'es',
  }),
  setUpRollUp({
    input: 'src/playground.ts',
    output: 'play/playground.js',
    format: 'es',
  }),
]

export default config
