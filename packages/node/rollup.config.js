import {
  getExternals,
  setUpRollUp,
  setUpRollupByPackageJson,
} from '@toktokhan-dev/rollup-config/base.js'

const config = [
  ...setUpRollupByPackageJson({
    packageJsonPath: 'package.json',
    entry: 'src/index.ts',
    formats: ['cjs', 'es', 'dts'],
    cjsInternals: ['boxen', 'chalk', 'globby', 'ora'],
  }),

  setUpRollUp({
    input: 'src/playground.ts',
    output: 'play/playground.cjs',
    format: 'cjs',
    options: {
      external: getExternals('package.json').filter(
        (name) => !['boxen', 'chalk', 'globby', 'ora'].includes(name),
      ),
    },
  }),
]

export default config
