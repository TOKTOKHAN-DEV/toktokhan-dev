import { getStringSchema } from '../utils/get-common-schema'
import { RequiredOrNotText } from '../utils/get-required-or-not'

export const AuthenticationSchema = {
  id: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'id',
      requiredOrNot,
      `
        .test(
        HELPER_TEXT['ID_SPECIAL_CHARACTER'],
        HELPER_TEXT['ID_SPECIAL_CHARACTER'],
        (value) => !REGEX['SPECIAL_CHARACTER'].test(value || ''),
        )
        .matches(REGEX['ID'], HELPER_TEXT['ID_COMMON'])`,
    ),

  email: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'email',
      requiredOrNot,
      `.matches(REGEX['EMAIL'], HELPER_TEXT['EMAIL_COMMON'])`,
    ),

  password: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'password',
      requiredOrNot,
      `.matches(REGEX['PASSWORD'], HELPER_TEXT['PASSWORD_COMMON'])`,
    ),

  passwordConfirm: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'passwordConfirm',
      requiredOrNot,
      `.oneOf([yup.ref('password')], HELPER_TEXT['PASSWORD_NOT_EQ'])`,
    ),

  newPassword: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'newPassword',
      requiredOrNot,
      `.matches(REGEX['PASSWORD'], HELPER_TEXT['PASSWORD_COMMON'])`,
    ),

  newPasswordConfirm: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'newPasswordConfirm',
      requiredOrNot,
      `.oneOf([yup.ref('newPassword')], HELPER_TEXT['PASSWORD_NOT_EQ'])`,
    ),
}
