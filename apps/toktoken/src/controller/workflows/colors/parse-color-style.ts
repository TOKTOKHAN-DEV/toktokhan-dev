import {
  Obj,
  arrayToRecord,
  isEvery,
  pass,
  removeStr,
} from '@toktokhan-dev/universal'

import { isNull } from 'lodash'
import {
  filter,
  find,
  flatten,
  flow,
  head,
  includesFrom,
  isEqual,
  isUndefined,
  map,
  mapValues,
  omit,
  omitBy,
  prop,
  reduce,
  replace,
  toLower,
} from 'lodash/fp'

import { load } from '../load'
import { ColorResult, ColorSchemaMap } from './types/type'
import { isColorSchema } from './utils/is-color-schema'
import { isSemanticToken } from './utils/is-semantic-token'
import { rgbToHex } from './utils/rgb-To-Hex'

const slashTo = replace(/\//g)
const entryKey = prop(0)
const entryValue = prop(1)
const parseColorName = flow(removeStr('color/'), removeStr('\b'), slashTo('-'))

const maybe = (fn: any) => (v: any) => {
  if (isNull(v) || isUndefined(v)) return undefined
  return fn(v)
}

const mustHave = (key: any) => (obj: any) => {
  return obj[key] ? obj : undefined
}

const createObjBy = (mapper: Obj) => (prev: Variable) => {
  const create = flow(
    Object.entries,
    reduce((acc, [key, fn]) => ({ ...acc, [key]: fn(prev) }), {} as any),
  )
  return create(mapper)
}

const createColorSchemaMap: (args: Variable[]) => ColorSchemaMap = flow(
  filter(isColorSchema),
  arrayToRecord(flow(prop('name'), parseColorName)),
  mapValues(
    createObjBy({
      id: prop('id'),
      value: flow(prop('valuesByMode'), Object.values, head, rgbToHex),
    }),
  ),
)

const createSemanticTokenMap = (
  colorSchema: ColorSchemaMap,
  variables: Variable[],
  mode: Record<string, string>,
) => {
  const schemaIds = flow(map(prop('id')))(colorSchema)

  const findColorSchemaKey = (id: string) =>
    flow(
      pass(colorSchema),
      Object.entries,
      find(flow(entryValue, prop('id'), isEqual(id))),
      maybe(entryKey),
    )()

  const findColorSchemaValue = (id: string) =>
    flow(
      pass(colorSchema),
      Object.entries,
      find(flow(entryValue, prop('id'), isEqual(id))),
      maybe(entryValue),
      prop('value'),
    )()

  const hasColorSchema = flow(
    prop('valuesByMode'),
    Object.values,
    head,
    prop('id'),
    includesFrom(schemaIds),
  )

  const create = flow(
    filter(isEvery([isSemanticToken, hasColorSchema])),
    arrayToRecord(flow(prop('name'), parseColorName)),
    mapValues(
      flow(
        (val) => {
          const array = Object.entries(val['valuesByMode']).map(
            ([modeId, modeValues]: [string, any]) => {
              return {
                mode: mode[modeId],
                id: val['id'],
                refId: modeValues['id'],
                ref: findColorSchemaKey(modeValues['id']),
                value: findColorSchemaValue(modeValues['id']),
              }
            },
          )

          const order = ['light', 'dark']
          array.sort((a, b) => order.indexOf(a.mode) - order.indexOf(b.mode))

          return arrayToRecord(flow(prop('mode')))(array)
        },
        mapValues(omit(['mode'])),
      ),
    ),
    omitBy(isUndefined),
  )

  return create(variables)
}

export const parseColorStyles = async (): Promise<ColorResult> => {
  await load()

  const localCollections =
    await figma.variables.getLocalVariableCollectionsAsync()
  const tokenModes = localCollections.map((i) => i.modes)

  const modes = flow(
    flatten,
    maybe(
      flow(
        arrayToRecord(flow(prop('modeId'), toLower)),
        mapValues(flow(prop('name'), toLower)),
      ),
    ),
  )(tokenModes as any) as Record<'light' | 'dark', string>

  const variables = await figma.variables.getLocalVariablesAsync('COLOR')

  const colorSchema = createColorSchemaMap(variables)
  const semanticTokens = createSemanticTokenMap(colorSchema, variables, modes)
  return {
    colorSchema,
    semanticTokens,
  }
}
