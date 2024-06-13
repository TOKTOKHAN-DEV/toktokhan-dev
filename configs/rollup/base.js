import { readFileSync } from 'fs'

import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin'
import commonjs from '@rollup/plugin-commonjs'
import esmShim from '@rollup/plugin-esm-shim'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

import dts from 'rollup-plugin-dts'

const jsonFrom = (path) => JSON.parse(readFileSync(path, 'utf-8'))

export const getExternals = (packageJsonPath) => {
  const packageJson = jsonFrom(packageJsonPath)
  const dependencies = packageJson.dependencies || {}
  const peerDependencies = packageJson.peerDependencies || {}
  const devDependencies = packageJson.devDependencies || {}

  return Object.keys({
    ...dependencies,
    ...peerDependencies,
    ...devDependencies,
  })
}

/**
 * @param {object} params
 * @param {string} params.packageJsonPath
 * @param {string} params.entry
 * @param {string[]} params.formats
 *
 * @return {import('rollup').RollupOptions[]}
 * */
export const setUpRollupByPackageJson = (params) => {
  const { packageJsonPath, entry, formats } = params
  const packageJson = jsonFrom(packageJsonPath)
  const external = getExternals(packageJsonPath)
  const exports = packageJson.exports || {}

  const has = (format) => formats.includes(format)

  const outCjs = exports['.'].require
  if (has('cjs') && !outCjs) {
    throw new Error('Please set exports["."].require in package.json')
  }

  const outEsm = exports['.'].import
  if (has('es') && !outEsm) {
    throw new Error('Please set exports["."].import in package.json')
  }

  const outDts = exports['.'].types
  if (has('dts') && !outDts) {
    throw new Error('Please set exports["."].dts in package.json')
  }

  const outputMap = {
    cjs: outCjs,
    es: outEsm,
    dts: outDts,
  }

  return formats.map((format) =>
    setUpRollUp({
      input: entry,
      output: outputMap[format],
      format,
      options:
        format !== 'cjs' ?
          {
            external,
          }
        : undefined,
    }),
  )
}
/**
 * @param {object} params
 * @param {string} params.input
 * @param {string} params.output
 * @param {string} params.format
 * @param {import('rollup').RollupOptions | undefined} params.options
 *
 * @return {import('rollup').RollupOptions}
 * */
export const setUpRollUp = (params) => {
  const { input, output, format, options } = params
  const isEsm = format === 'es'
  const isDts = format === 'dts'

  return {
    treeshake: isEsm,
    input,
    output: [
      {
        sourcemap: true,
        format: isDts ? 'es' : format,
        ...(isEsm ?
          {
            file: output,
          }
        : { file: output, inlineDynamicImports: true }),
      },
    ],
    plugins: [
      optimizeLodashImports(),
      ...(isDts ? [dts()] : []),
      ...(isEsm ?
        [esmShim()]
      : [
          nodeResolve({
            exportConditions: ['node'],
            extensions: ['.ts', '.js', '.tsx', '.jsx'],
          }),
        ]),
      json(),
      commonjs(),
      typescript({
        exclude: ['**/__tests__', '**/*.spec.ts', '**/*.test.ts'],
        declaration: false,
      }),
    ],
    ...(options || {}),
  }
}
