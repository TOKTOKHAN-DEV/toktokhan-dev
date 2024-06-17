import { writeFileSync } from 'fs'

import { json, pathOf, prettierString } from '@toktokhan-dev/node'
import {
  DataOrFn,
  Obj,
  awaitted,
  pass,
  runIfFn,
} from '@toktokhan-dev/universal'

import { flow, merge } from 'lodash'

const updator =
  <T>(target: DataOrFn<T>) =>
  (prev: T): T =>
    merge(prev, runIfFn(target, prev))

export const modifyPackageJson = (data: DataOrFn<Obj>, path: string) =>
  flow(
    pass(path),
    pathOf('package.json'),
    json,
    updator(data),
    JSON.stringify,
    (src) => prettierString(src, { parser: 'json' }),
    awaitted((src) => writeFileSync(pathOf('package.json', path), src)),
  )()
