import { getStringSchema } from './get-common-schema'
import { RequiredOrNotText } from './get-required-or-not'

type Name = 'username' | 'firstName' | 'lastName' // 내국인 | 외국인

/**
 * @description 내국인 혹은 외국인의 이름은 공통된 규칙을 적용합니다.
 * @param name username | firstName | lastName
 * @param requiredText required(HELPER_TEXT['REQUIRED_INPUT']) | notRequired()
 */
export const getNameDetailSchema = (
  name: Name,
  requiredText: RequiredOrNotText,
): string => {
  return getStringSchema(
    name,
    requiredText,
    `
      .min(2, HELPER_TEXT['USERNAME_MIN'])
      .max(20, HELPER_TEXT['USERNAME_MAX'])
      .test(
        HELPER_TEXT['USERNAME_SPECIAL_CHARACTER'],
        HELPER_TEXT['USERNAME_SPECIAL_CHARACTER'],
        (value) => !REGEX['SPECIAL_CHARACTER'].test(value || ''),
      )
      .matches(REGEX['USERNAME'], HELPER_TEXT['USERNAME_COMMON'])`,
  )
}
