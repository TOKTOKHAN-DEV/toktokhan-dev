import { setUpRollupByPackageJson } from '@toktokhan-dev/rollup-config/base.js'

const config = [
  ...setUpRollupByPackageJson({
    packageJsonPath: 'package.json',
    entry: 'src/index.ts',
    formats: ['cjs', 'es', 'dts'],
  }),
]

export default config
