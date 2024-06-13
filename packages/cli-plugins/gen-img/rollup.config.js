import {
  setUpRollUp,
  setUpRollupByPackageJson,
} from '@toktokhan-dev/rollup-config/base.js'

const config = [
  ...setUpRollupByPackageJson({
    packageJsonPath: 'package.json',
    entry: 'src/index.ts',
    formats: ['cjs', 'es', 'dts'],
  }),
  setUpRollUp({
    input: 'src/playground.ts',
    output: 'play/playground.js',
    format: 'es',
  }),
]

export default config
