import { Obj, arrayToRecord, suffix } from '@toktokhan-dev/universal'

import { propertyOf } from 'lodash'
import { flow, mapKeys, mapValues, prop, replace, toString } from 'lodash/fp'

const px = flow(toString, suffix('px'))
const percent = flow(toString, suffix('%'))
const slashTo = replace(/\//gi)

export const parseTextStyle = async (): Promise<Obj> => {
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

  const getTextStyle = (style: TextStyle) => {
    return {
      fontWeight: getFontWieght(style.fontName.style),
      fontFamily: style.fontName.family,
      fontSize: px(style.fontSize),
      lineHeight: getUnitSize(style.lineHeight),
      letterSpacing: getUnitSize(style.letterSpacing),
      textDecoration: getTextDecoration(style.textDecoration),
    }
  }

  return figma
    .getLocalTextStylesAsync()
    .then(
      flow(
        arrayToRecord(prop('name') as any),
        mapValues(getTextStyle),
        mapKeys(slashTo('-')),
      ),
    ) as Promise<Obj>
}
