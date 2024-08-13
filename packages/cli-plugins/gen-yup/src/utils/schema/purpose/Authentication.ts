import { getStringSchema } from '../utils/get-common-schema'
import { RequiredOrNotText } from '../utils/get-required-or-not'

export const AuthenticationSchema = {
  id: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'id',
      requiredOrNot,
      `
        .test(
        HELPER_TEXT['ID'].SPECIAL_CHARACTER,
        HELPER_TEXT['ID'].SPECIAL_CHARACTER,
        (value) => !REGEX['SPECIAL_CHARACTER'].test(value || ''),
        )
        .matches(REGEX['ID'], HELPER_TEXT['ID'].COMMON)`,
    ),

  email: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'email',
      requiredOrNot,
      `.matches(REGEX['EMAIL'], HELPER_TEXT['EMAIL'])`,
    ),

  password: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'password',
      requiredOrNot,
      `.matches(REGEX['PASSWORD'], HELPER_TEXT['PASSWORD'])`,
    ),

  passwordConfirm: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'passwordConfirm',
      requiredOrNot,
      `.oneOf([yup.ref('password')], HELPER_TEXT['PASSWORD_CONFIRM'])`,
    ),

  newPassword: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'newPassword',
      requiredOrNot,
      `.matches(REGEX['PASSWORD'], HELPER_TEXT['PASSWORD'])`,
    ),

  newPasswordConfirm: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'newPasswordConfirm',
      requiredOrNot,
      `.oneOf([yup.ref('newPassword')], HELPER_TEXT['PASSWORD_CONFIRM'])`,
    ),
}
