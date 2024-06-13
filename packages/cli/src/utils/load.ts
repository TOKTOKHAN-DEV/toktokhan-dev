import path from 'path'

import { bundleRequire } from 'bundle-require'
import JoyCon from 'joycon'

export const loadConfigFile = async (cwd: string, configFile?: string) => {
  const configPath = await new JoyCon().resolve({
    files:
      configFile ?
        [configFile]
      : [
          'tok-cli.config.ts',
          'tok-cli.config.js',
          'tok-cli.config.mjs',
          'tok-cli.config.cjs',
        ],
    cwd,
    stopDir: path.parse(cwd).root,
    packageKey: 'tok-cli',
  })

  if (!configPath) {
    return null
  }
  const config = await bundleRequire({
    filepath: configPath,
    tsconfig: path.join(cwd, 'tsconfig.json'),
  })

  return {
    path: configPath,
    data: config.mod.tsup || config.mod.default || config.mod,
  }
}
