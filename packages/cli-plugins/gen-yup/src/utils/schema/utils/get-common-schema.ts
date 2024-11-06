import { RequiredOrNotText } from './get-required-or-not'

/**
 * @description 공통으로 사용되는 yup schema syntax를 반환합니다.
 * @param name string
 * @param requiredText required(HELPER_TEXT['REQUIRED_INPUT']) | optional()
 * @param [additionalTests = ''] string
 */
export const getStringSchema = (
  name: string,
  requiredText: RequiredOrNotText,
  additionalTests: string = '',
): string => {
  return `${name}: yup
      .string()
      ${additionalTests ? `.${requiredText}${additionalTests},` : `.${requiredText},`}`
}
