import { createObjBySelector, pass } from '@toktokhan-dev/universal'

import { flow, mapKeys, mapValues, prop, replace } from 'lodash/fp'

import {
  ColorModes,
  ColorTokenValue,
  ThemeToken,
  V2ColorToken,
  V3ColorToken,
} from './type'
import { assertNullish } from './utils/assert-nullish'
import { throwError } from './utils/throw-error'

import { GenThemeConfig } from '.'

const isNumeric = (v: any) => {
  return !isNaN(parseFloat(v))
}

const getColorKey: (str: string) => string = flow(
  replace(/\s/g, ''),
  replace(/-/g, '.'),
)

const getColorTokenKey: (str: string) => string = flow(getColorKey, (str) => {
  const splitted = str.split('.')
  if (isNumeric(splitted.at(-1))) {
    const temp = [...splitted]
    const last = temp.pop()
    return temp.join('-') + `.${last}`
  }

  return splitted.join('-')
})
const refColorSchema = (key: string) => `colorSchema["${key}"]`

/**
 * 주어진 JSON 객체에서 색상 스키마를 추출하고 변환합니다.
 *
 * @param json - 색상 스키마가 포함된 ThemeToken 객체입니다.
 * @param version - Chakra UI 버전입니다.
 * @returns 변환된 색상 스키마 객체를 반환합니다.
 */
const getColorSchemaObj: (
  json: ThemeToken['colors'],
  version?: GenThemeConfig['version'],
) => Record<string, string | { value: string }> = (json, version) => {
  return flow(
    prop('colorSchema'), //
    mapKeys(getColorTokenKey),
    mapValues(
      flow(
        prop('value'),
        assertNullish("not found value. Please check 'colorSchema' value."),
        (value) => {
          if (version === 'v2') {
            return value
          }
          return { value }
        },
      ),
    ),
  )(json)
}

/**
 * 주어진 값 객체가 유효한 토큰 모드를 가지고 있는지 확인합니다.
 *
 * @param val - 확인할 값 객체입니다.
 * @param tokenModes - 확인할 토큰 모드 객체입니다.
 */
const checkValidToken = (val: object, tokenModes: Required<ColorModes>) => {
  if (!(tokenModes['light'] in val)) {
    throwError(
      'The light key for "tokenModes" is not found in the semanticTokens objects.',
    )
  }
  if (Object.values(val).length === 2 && !(tokenModes['dark'] in val)) {
    throwError(
      `The dark key for "tokenModes" is not found in the semanticTokens objects.`,
    )
  }
  return
}

/**
 * 주어진 모드에 따라 토큰 값을 반환합니다.
 *
 * @param mode - 토큰 값을 가져올 모드입니다.
 * @returns 주어진 토큰에 대한 값을 반환하는 함수입니다.
 */
const getTokenValue = (mode: string) => (token: any) => {
  const ref = prop(`${mode}.ref`)(token)
  const value = prop(`${mode}.value`)(token)
  if (ref) return flow(getColorTokenKey, refColorSchema)(ref)
  return value
}

/**
 * v3 버전에서 주어진 모드에 따라 토큰 값을 반환합니다.
 *
 * @param mode - 토큰 값을 가져올 모드입니다.
 * @returns 주어진 토큰에 대한 값을 반환하는 함수입니다.
 */
const getTokenValueV3 = (mode: string) => (token: any) => {
  const ref = prop(`${mode}.ref`)(token)
  const value = prop(`${mode}.value`)(token)
  if (ref) return `{colors.${flow(getColorTokenKey)(ref)}}`
  return value
}

/**
 * 색상 토큰 변환의 공통 로직을 처리하는 함수입니다.
 *
 * @param json - 색상 토큰이 포함된 ThemeToken 객체입니다.
 * @param mode - 색상 모드 객체입니다.
 * @param postProcess - 변환 후 추가 처리를 위한 함수입니다.
 * @returns 변환된 색상 토큰 객체를 반환합니다.
 */
const processColorToken = <T>(
  json: ThemeToken['colors'],
  mode: Required<ColorModes>,
  postProcess: (obj: ColorTokenValue) => T,
): Record<string, T> =>
  flow(
    pass(json),
    prop('semanticTokens'),
    mapKeys(getColorKey),
    mapValues(
      flow(
        (identity) => {
          checkValidToken(identity, mode)
          return identity
        },
        createObjBySelector({
          _light: getTokenValue(mode['light']),
          _dark: getTokenValue(mode['dark']),
        }),
        postProcess,
      ),
    ),
  )() as Record<string, T>

/**
 * v3 버전의 색상 토큰 변환 로직을 처리하는 함수입니다.
 *
 * @param json - 색상 토큰이 포함된 ThemeToken 객체입니다.
 * @param mode - 색상 모드 객체입니다.
 * @param postProcess - 변환 후 추가 처리를 위한 함수입니다.
 * @returns 변환된 색상 토큰 객체를 반환합니다.
 */
const processColorTokenV3 = <T>(
  json: ThemeToken['colors'],
  mode: Required<ColorModes>,
  postProcess: (obj: ColorTokenValue) => T,
): Record<string, T> =>
  flow(
    pass(json),
    prop('semanticTokens'),
    mapKeys(getColorKey),
    mapValues(
      flow(
        (identity) => {
          checkValidToken(identity, mode)
          return identity
        },
        createObjBySelector({
          _light: getTokenValueV3(mode['light']),
          _dark: getTokenValueV3(mode['dark']),
        }),
        (obj) => {
          if (!obj._dark) {
            return { ...obj, _dark: obj._light }
          }
          return obj
        },
        postProcess,
      ),
    ),
  )() as Record<string, T>

/**
 * V2 형식의 색상 토큰 객체를 생성합니다.
 */
const getColorTokenObjV2 = (
  json: ThemeToken['colors'],
  mode: Required<ColorModes>,
): Record<string, V2ColorToken> =>
  processColorToken<V2ColorToken>(json, mode, (obj) => ({
    default: obj._light,
    _dark: obj._dark,
  }))

/**
 * V3 형식의 색상 토큰 객체를 생성합니다.
 */
const getColorTokenObjV3 = (
  json: ThemeToken['colors'],
  mode: Required<ColorModes>,
): Record<string, V3ColorToken> =>
  processColorTokenV3<V3ColorToken>(json, mode, (obj) => ({ value: obj }))

/**
 * 주어진 JSON 객체에서 색상 토큰을 추출하고 변환합니다.
 * Chakra UI 버전에 따라 적절한 함수를 선택합니다.
 *
 * @param json - 색상 토큰이 포함된 ThemeToken 객체입니다.
 * @param mode - 색상 모드 객체입니다.
 * @param version - Chakra UI 버전입니다.
 * @returns 변환된 색상 토큰 객체를 반환합니다.
 */
const getColorTokenObj = (
  json: ThemeToken['colors'],
  mode: Required<ColorModes>,
  version?: GenThemeConfig['version'],
) => {
  if (version === 'v2') {
    return getColorTokenObjV2(json, mode)
  }
  // v3 또는 기본값
  return getColorTokenObjV3(json, mode)
}

/**
 * 주어진 JSON 객체를 기반으로 색상 스키마와 색상 토큰을 생성하고 렌더링합니다.
 *
 * @param json - 색상 스키마와 색상 토큰이 포함된 ThemeToken 객체입니다.
 * @param tokenModes - 색상 모드 객체입니다.
 * @param chakraVersion - Chakra UI 버전 정보입니다.
 * @returns 렌더링된 색상 스키마와 색상 토큰 문자열을 반환합니다.
 */
export const renderColor = (
  json: ThemeToken['colors'],
  tokenModes: Required<ColorModes>,
  chakraVersion?: GenThemeConfig['version'],
): string => {
  const colorSchema = getColorSchemaObj(json, chakraVersion)
  const colorToken = getColorTokenObj(json, tokenModes, chakraVersion)

  return `
    /**
     * !DO NOT EDIT THIS FILE
     * 
     * gnerated by script: tokript gen:theme
     * 
     * theme color 를 정의하는 곳입니다.
     * dark 모드를 대응하기 위해 semantic token 을 사용해서 정의합니다.
     *
     * @see https://chakra-ui.com/docs/styled-system/semantic-tokens
    **/

    export const colorSchema = ${JSON.stringify(colorSchema, null, 2)}

    export const colors = ${JSON.stringify(colorToken, null, 2)
      .replaceAll(/"colorSchema\[(.*)\]"/g, 'colorSchema[$1]')
      .replaceAll('\\', '')}
  `
}
