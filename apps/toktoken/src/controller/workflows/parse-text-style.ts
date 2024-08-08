import {
  Obj,
  arrayToRecord,
  awaited,
  pass,
  suffix,
} from '@toktokhan-dev/universal'

import { propertyOf } from 'lodash'
import {
  flow,
  identity,
  mapKeys,
  mapValues,
  prop,
  replace,
  toString,
} from 'lodash/fp'

import { mapValuesAsPromise } from '../../utils/obj'
import { getModeMap } from '../utils/get-mode-map'

const px = flow(toString, suffix('px'))
const percent = flow(toString, suffix('%'))
const slashTo = replace(/\//gi)

export const parseTextStyle = async (): Promise<Obj> => {
  const modeMap = await getModeMap()

  const getFontWieght = propertyOf({
    Thin: 100,
    ExtraLight: 200,
    Light: 300,
    Regular: 400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
    ExtraBold: 800,
    Black: 900,
  })

  const getTextDecoration = propertyOf({
    NONE: 'none',
    UNDERLINE: 'underline',
    STRIKETHROUGH: 'line-through',
  })

  const getUnitSize = (style: LineHeight | LetterSpacing): string => {
    if (style.unit === 'AUTO') return 'auto'
    return {
      PERCENT: percent(style.value),
      PIXELS: px(style.value),
    }[style.unit as string] as string
  }

  const isAlias = (value: unknown): value is VariableAlias => {
    if (typeof value !== 'object') return false
    return (value as Obj).type === 'VARIABLE_ALIAS'
  }

  const getFontVariables = async (id: string): Promise<Record<string, any>> => {
    return flow(
      pass(id),
      figma.variables.getVariableByIdAsync,
      awaited(
        flow(
          prop('valuesByMode'),
          mapKeys((key) => modeMap[key]),
          mapValuesAsPromise(async (value) => {
            if (!isAlias(value)) return value
            const token = await figma.variables.getVariableByIdAsync(value.id)
            return Object.values(token?.valuesByMode || {})?.[0]
          }),
        ),
      ),
    )()
  }

  const getTextStyle = async (style: TextStyle) => {
    const varOrStyle = async <T>(
      key: keyof NonNullable<typeof style.boundVariables>,
      styleValue: T,
      mapper: {
        forVar: (vari: string | number) => string | number
        forStyle: (styleValue: T) => string | number
      },
    ) => {
      const id = (style.boundVariables?.[key] as any)?.id
      const variables = id ? await getFontVariables(id) : null
      return variables ?
          mapValues(mapper.forVar, variables)
        : mapper.forStyle(styleValue)
    }

    return {
      fontFamily: style.fontName.family,
      textDecoration: getTextDecoration(style.textDecoration),
      /**
       * ---- below is tokenize ----
       */
      fontWeight: await varOrStyle('fontWeight', style.fontName.style, {
        forVar: identity,
        forStyle: getFontWieght,
      }),
      fontSize: await varOrStyle('fontSize', style.fontSize, {
        forVar: px,
        forStyle: px,
      }),
      lineHeight: await varOrStyle('lineHeight', style.lineHeight, {
        forVar: px,
        forStyle: getUnitSize,
      }),
      letterSpacing: await varOrStyle('letterSpacing', style.letterSpacing, {
        forVar: px,
        forStyle: getUnitSize,
      }),
    }
  }

  return figma
    .getLocalTextStylesAsync()
    .then(
      flow(
        arrayToRecord(prop('name') as any),
        mapKeys(slashTo('-')),
        mapValuesAsPromise(flow(getTextStyle)),
      ),
    ) as Promise<Obj>
}
