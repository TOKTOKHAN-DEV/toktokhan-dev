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
import {
  FONT_SIZE_VALUE_TO_NAME,
  FONT_WEIGHT_VALUE_TO_NAME,
  LETTER_SPACING_EM_TO_NAME,
  NEW_SYSTEM_COLLECTIONS,
} from '../utils/tailwind-scale'

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

  // 신규(Tailwind) 시스템은 no-underline, 구버전(Chakra 등)은 CSS 표준값 none을 그대로 씀.
  const getTextDecoration = (isNewSystem: boolean) =>
    propertyOf({
      NONE: isNewSystem ? 'no-underline' : 'none',
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

  // letterSpacing 전용 변환. CSS letter-spacing은 %(percent) 단위를 지원하지 않으므로
  // (Figma의 PERCENT는 "폰트 크기 대비 비율"이라는 의미이고, 이건 CSS em 단위와
  // 완전히 동일한 개념이라 손실 없이 변환 가능) em으로 바꾼다.
  // letterSpacing 자체는 신/구 시스템 어느 쪽이든 변수에 바인딩되는 일이 거의 없어서,
  // 같은 스타일의 다른 필드(fontSize 등)로 판단한 isNewSystem 신호를 그대로 받아 쓴다.
  // 신규 시스템이면 변환한 em 값이 Tailwind v4 tracking 스케일과 맞을 때만
  // var(--tracking-*)로 바꾸고, 구버전은 Tailwind 토큰 매칭 없이 %→em 변환만 해서
  // "최소한 유효한 CSS 값"으로만 보정한다(다운스트림이 없는 변수를 참조하지 않도록).
  // PIXELS 값은 이미 유효한 CSS라 신/구 구분 없이 변환 없이 그대로 둔다.
  const getLetterSpacingValue = (
    letterSpacing: LetterSpacing,
    isNewSystem: boolean,
  ): string => {
    if (letterSpacing.unit === 'PERCENT') {
      const em = Number((letterSpacing.value / 100).toFixed(3))
      const name = isNewSystem ? LETTER_SPACING_EM_TO_NAME[em] : undefined
      return name ? `var(--tracking-${name})` : `${em}em`
    }
    return px(letterSpacing.value)
  }

  const isAlias = (value: unknown): value is VariableAlias => {
    if (typeof value !== 'object' || value === null) return false
    return (value as Obj).type === 'VARIABLE_ALIAS'
  }

  const resolveValue = async (
    value: unknown,
    visited: Set<string> = new Set(),
  ): Promise<any> => {
    if (!isAlias(value)) return value
    if (visited.has(value.id)) return undefined
    visited.add(value.id)
    const token = await figma.variables.getVariableByIdAsync(value.id)
    const next = Object.values(token?.valuesByMode || {})?.[0]
    return resolveValue(next, visited)
  }

  const getFontVariables = async (id: string): Promise<Record<string, any>> => {
    return flow(
      pass(id),
      figma.variables.getVariableByIdAsync,
      awaited(
        flow(
          prop('valuesByMode'),
          mapKeys((key) => modeMap[key]),
          mapValuesAsPromise((value) => resolveValue(value)),
        ),
      ),
    )()
  }

  // 바인딩된 변수가 신규 디자인시스템의 실제 토큰 컬렉션(Font/Number)에 속해 있는지
  // 확인한다. 스타일 "이름" 규칙이 아니라 실제 어느 컬렉션에 바인딩됐는지로 신/구를
  // 구분하기 위함 — 이름 규칙은 구버전이 여러 개일 수 있어 취약하다.
  const isNewSystemBinding = async (id: string): Promise<boolean> => {
    const variable = await figma.variables.getVariableByIdAsync(id)
    if (!variable) return false
    const collection = await figma.variables.getVariableCollectionByIdAsync(
      variable.variableCollectionId,
    )
    return NEW_SYSTEM_COLLECTIONS.has(collection?.name ?? '')
  }

  // 바인딩된 변수의 모드별 "실제 값"을 valueToName 표에서 역으로 찾아 토큰명으로
  // 바꾼다. 변수 자체의 "이름"이 아니라 값으로 판단하므로, 변수 이름이 기대와 다르게
  // 지어져 있어도(오타, 다른 네이밍 등) 값만 맞으면 정확한 토큰으로 잡아낸다. 표에
  // 없는 값(스케일 밖)은 toRaw로 변환한 raw 값을 그대로 둔다. 모드가 desktop/tablet/
  // mobile처럼 여러 개면 모드별로 다른 토큰이 나올 수 있고, 1개(예: "value")뿐이면
  // 객체로 감싸지 않고 값만 반환한다.
  const resolveTokenByValue = async (
    id: string,
    valueToName: Record<string | number, string>,
    format: (name: string) => string,
    toRaw: (value: any) => any,
  ) => {
    const values = await getFontVariables(id)
    const mapped = mapValues(
      (v: any) => (valueToName[v] !== undefined ? format(valueToName[v]) : toRaw(v)),
      values,
    )
    const modeKeys = Object.keys(mapped)
    return modeKeys.length === 1 ? mapped[modeKeys[0]] : mapped
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

    type TokenResult = { value: any; isNewSystem: boolean }

    // fontWeight: 바인딩된 변수가 Font/Number 컬렉션에 속해 있으면, 모드별 실제 값을
    // Tailwind v4 CSS 변수 참조(var(--font-weight-bold))로 바꾼다. 그 외(구버전,
    // 바인딩 없음, 다른 컬렉션, 스케일 밖 값)에는 지금까지와 동일한 방식으로 fallback.
    const getFontWeightToken = async (): Promise<TokenResult> => {
      const boundId = (style.boundVariables?.fontWeight as any)?.id
      if (boundId && (await isNewSystemBinding(boundId))) {
        const value = await resolveTokenByValue(
          boundId,
          FONT_WEIGHT_VALUE_TO_NAME,
          (name) => `var(--font-weight-${name})`,
          identity,
        )
        return { value, isNewSystem: true }
      }
      const value = await varOrStyle('fontWeight', style.fontName.style, {
        forVar: identity,
        forStyle: getFontWieght,
      })
      return { value, isNewSystem: false }
    }

    // lineHeight: Tailwind v4는 숫자 line-height 스케일(leading-3~10)에 대응하는
    // 고정 CSS 변수가 없다(calc(var(--spacing) * N)으로 즉석 계산되는 방식이라 참조할
    // 변수 자체가 없음). 그래서 var() 매칭을 시도하지 않고, 바인딩돼 있으면 desktop/
    // tablet/mobile 등 모드별 raw px 값을(모드 1개면 값만), 없으면 기존 방식으로 반환.
    const getLineHeightToken = async (): Promise<TokenResult> => {
      const boundId = (style.boundVariables?.lineHeight as any)?.id
      if (boundId && (await isNewSystemBinding(boundId))) {
        const values = await getFontVariables(boundId)
        const mapped = mapValues((v: number) => px(v), values)
        const modeKeys = Object.keys(mapped)
        const value = modeKeys.length === 1 ? mapped[modeKeys[0]] : mapped
        return { value, isNewSystem: true }
      }
      const value = await varOrStyle('lineHeight', style.lineHeight, {
        forVar: px,
        forStyle: getUnitSize,
      })
      return { value, isNewSystem: false }
    }

    // fontSize: 바인딩된 변수가 Font/Number 컬렉션에 속해 있으면 desktop/tablet/mobile
    // 등 모드별 구조는 그대로 유지하면서, "각 모드의 실제 px 값"을 Tailwind v4 CSS
    // 변수 참조로 바꾼다(모드마다 값이 다르면 참조도 모드마다 다를 수 있음. 예:
    // desktop=36→var(--text-4xl), tablet=30→var(--text-3xl)). 스케일에 없는 값(예:
    // 26)은 그 모드만 raw px로 남긴다. 모드가 1개뿐이면 객체로 감싸지 않고 값만
    // 반환한다. 바인딩이 없으면(구버전) 기존과 동일하게 flat px로.
    const getFontSizeToken = async (): Promise<TokenResult> => {
      const boundId = (style.boundVariables?.fontSize as any)?.id
      if (boundId && (await isNewSystemBinding(boundId))) {
        const value = await resolveTokenByValue(
          boundId,
          FONT_SIZE_VALUE_TO_NAME,
          (name) => `var(--text-${name})`,
          px,
        )
        return { value, isNewSystem: true }
      }
      const value = await varOrStyle('fontSize', style.fontSize, {
        forVar: px,
        forStyle: px,
      })
      return { value, isNewSystem: false }
    }

    // fontFamily: 항상 raw 폰트 이름을 그대로 반환한다(var()로 감싸지 않음).
    // 다운스트림 CSS 생성기(gen-text-styles.ts)가 이미 raw 폰트 이름 → var(--font-*)
    // 매핑을 자체적으로 갖고 있어서, 여기서 미리 var()로 감싸면 그 매핑을 건너뛰고
    // 문자열이 그대로 통과돼버려 오히려 깨진다(예: admin globals.css엔 --font-sans
    // 자체가 없어서 var(--font-sans)를 직접 내려주면 admin에서 undefined 변수가 됨).
    // isNewSystem 판단(신규 컬렉션 바인딩 여부)만 유지하고 값은 항상 raw로 둔다.
    const getFontFamilyToken = async (): Promise<TokenResult> => {
      const boundId = (style.boundVariables?.fontFamily as any)?.id
      const isNewSystem = boundId ? await isNewSystemBinding(boundId) : false
      return { value: style.fontName.family, isNewSystem }
    }

    const [fontFamily, fontWeight, fontSize, lineHeight] = await Promise.all([
      getFontFamilyToken(),
      getFontWeightToken(),
      getFontSizeToken(),
      getLineHeightToken(),
    ])

    // textDecoration/letterSpacing은 Figma에서 변수 바인딩 자체가 안 되는 필드라
    // 직접 판단할 근거가 없다. 그래서 같은 스타일의 다른 필드들 중 하나라도 신규
    // 시스템(Font/Number 컬렉션)에 바인딩되어 있었다면 이 스타일 전체를 신규
    // 시스템으로 간주한다.
    const isNewSystem = [fontFamily, fontWeight, fontSize, lineHeight].some(
      (r) => r.isNewSystem,
    )

    return {
      fontFamily: fontFamily.value,
      textDecoration: getTextDecoration(isNewSystem)(style.textDecoration),
      /**
       * ---- below is tokenize ----
       */
      fontWeight: fontWeight.value,
      fontSize: fontSize.value,
      lineHeight: lineHeight.value,
      letterSpacing: await varOrStyle('letterSpacing', style.letterSpacing, {
        forVar: px,
        forStyle: (value) => getLetterSpacingValue(value, isNewSystem),
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
