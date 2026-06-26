import { Obj, arrayToRecord, removeStr } from '@toktokhan-dev/universal'

import { flatten, flow, head, mapValues, prop, replace, toLower } from 'lodash/fp'

import { load } from '../load'
import { ColorResult, ColorSchemaMap, SemanticTokenMap } from './types/type'
import {
  findTargetCollection,
  isVariableAlias,
  resolveColorValue,
} from './utils'

const slashTo = replace(/\//g)
const parseColorName = flow(removeStr('color/'), removeStr('\b'), slashTo('-'))

type VarMap = Record<string, Variable>
type ModeMap = Record<string, string>

const buildModeMap = (collections: VariableCollection[]): ModeMap =>
  flow(
    flatten,
    arrayToRecord(prop('modeId')),
    mapValues(flow(prop('name'), toLower)),
  )(collections.map((c) => c.modes)) as ModeMap

const order = ['light', 'dark']
const sortByMode = (rec: Obj): Obj =>
  Object.keys(rec)
    .sort((a, b) => order.indexOf(a) - order.indexOf(b))
    .reduce((acc, key) => ({ ...acc, [key]: rec[key] }), {} as Obj)

const createColorSchemaMap = (
  paletteVars: Variable[],
  varMap: VarMap,
  modeMap: ModeMap,
): ColorSchemaMap =>
  flow(
    arrayToRecord(flow(prop('name'), parseColorName)),
    mapValues((v: Variable) => {
      const byMode = Object.entries(v.valuesByMode).reduce(
        (acc, [modeId, val]) => ({
          ...acc,
          [modeMap[modeId] ?? modeId]: resolveColorValue(val, varMap, modeId),
        }),
        {} as Record<string, string | undefined>,
      )
      const modes = Object.keys(byMode)

      if (modes.length <= 1) {
        return { id: v.id, value: byMode[modes[0]] }
      }
      return {
        id: v.id,
        value: byMode['light'] ?? byMode[modes[0]],
        dark: byMode['dark'],
      }
    }),
  )(paletteVars)

const buildSemanticToken = (v: Variable, varMap: VarMap, modeMap: ModeMap) => {
  const modeEntries = Object.entries(v.valuesByMode)
  const onlyValue = head(modeEntries.map(([, val]) => val))

  if (modeEntries.length === 1 && isVariableAlias(onlyValue)) {
    const target = varMap[onlyValue.id]
    if (target) {
      const ref = parseColorName(target.name)
      const result = Object.entries(target.valuesByMode).reduce(
        (acc, [modeId, cVal]) => ({
          ...acc,
          [modeMap[modeId] ?? modeId]: {
            id: v.id,
            refId: target.id,
            ref,
            value: resolveColorValue(cVal, varMap, modeId),
          },
        }),
        {} as Obj,
      )
      return sortByMode(result)
    }
  }

  const result = modeEntries.reduce((acc, [modeId, val]) => {
    const mode = modeMap[modeId] ?? modeId
    if (isVariableAlias(val)) {
      const target = varMap[val.id]
      return {
        ...acc,
        [mode]: {
          id: v.id,
          refId: target?.id ?? null,
          ref: target ? parseColorName(target.name) : null,
          value: resolveColorValue(val, varMap, modeId),
        },
      }
    }
    return {
      ...acc,
      [mode]: {
        id: null,
        refId: null,
        ref: null,
        value: resolveColorValue(val, varMap, modeId),
      },
    }
  }, {} as Obj)
  return sortByMode(result)
}

const createSemanticTokenMap = (
  semanticVars: Variable[],
  varMap: VarMap,
  modeMap: ModeMap,
): SemanticTokenMap =>
  flow(
    arrayToRecord(flow(prop('name'), parseColorName)),
    mapValues((v: Variable) => buildSemanticToken(v, varMap, modeMap)),
  )(semanticVars) as SemanticTokenMap

export const parseColorStyles = async (): Promise<ColorResult> => {
  await load()

  const collections = await figma.variables.getLocalVariableCollectionsAsync()
  const modeMap = buildModeMap(collections)

  const semanticCollection = findTargetCollection([
    'theme',
    'tokens',
    'token',
    'colors',
  ])(collections)
  if (!semanticCollection) {
    throw new Error(
      '시맨틱 토큰 컬렉션(Theme/Tokens)을 찾을 수 없습니다. Figma 변수 컬렉션 이름을 확인해주세요.',
    )
  }
  const semanticId = semanticCollection.id

  const colorVariables = await figma.variables.getLocalVariablesAsync('COLOR')
  const varMap = arrayToRecord(prop('id'))(colorVariables) as VarMap

  const semanticVars = colorVariables.filter(
    (v) => v.variableCollectionId === semanticId,
  )
  const paletteVars = colorVariables.filter(
    (v) => v.variableCollectionId !== semanticId,
  )

  const colorSchema = createColorSchemaMap(paletteVars, varMap, modeMap)
  const semanticTokens = createSemanticTokenMap(semanticVars, varMap, modeMap)

  return {
    colorSchema,
    semanticTokens,
  }
}
