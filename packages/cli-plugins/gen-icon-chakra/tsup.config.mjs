import base from '@toktokhan-dev/tsup-config/base.js'

import { defineConfig } from 'tsup'

export default defineConfig([
  {
    ...base,
    entry: ['src/index.ts'],
    outDir: 'dist',
  },
  {
    ...base,
    entry: ['src/playground.ts'],
    outDir: 'play',
  },
])
