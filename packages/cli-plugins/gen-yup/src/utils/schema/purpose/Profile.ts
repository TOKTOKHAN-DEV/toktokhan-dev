import { getStringSchema } from '../utils/get-common-schema'
import { getNameDetailSchema } from '../utils/get-name-detail-schema'
import { RequiredOrNotText } from '../utils/get-required-or-not'

export const ProfileSchema = {
  phone: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'phone',
      requiredOrNot,
      `.matches(REGEX['PHONE'], HELPER_TEXT['PHONE'])`,
    ),

  cellPhone: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'cellPhone',
      requiredOrNot,
      `.matches(REGEX['CELL_PHONE'], HELPER_TEXT['CELL_PHONE'])`,
    ),

  businessPhone: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'businessPhone',
      requiredOrNot,
      `.matches(REGEX['BUSINESS_PHONE'], HELPER_TEXT['BUSINESS_PHONE'])`,
    ),

  birthdate: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'birthdate',
      requiredOrNot,
      `
        .matches(REGEX['BIRTHDATE_COMMON'], HELPER_TEXT['BIRTHDATE_COMMON'])
        .matches(
        REGEX['BIRTHDATE_DETAIL_FORMAT'],
        HELPER_TEXT['BIRTHDATE_DETAIL_FORMAT'],
        )`,
    ),

  nickname: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'nickname',
      requiredOrNot,
      `
        .min(2, HELPER_TEXT['NICKNAME_MIN'])
        .nullable()
        .transform((value) => (!!value ? value : null))
        .max(10, HELPER_TEXT['NICKNAME_MAX'])
        .test(
        HELPER_TEXT['NICKNAME_SPECIAL_CHARACTER'],
        HELPER_TEXT['NICKNAME_SPECIAL_CHARACTER'],
        (value) => !REGEX['SPECIAL_CHARACTER'].test(value || ''),
        )
        .matches(REGEX['NICKNAME'], HELPER_TEXT['NICKNAME_COMMON'])`,
    ),

  username: (requiredOrNot: RequiredOrNotText) =>
    getNameDetailSchema('username', requiredOrNot),

  firstName: (requiredOrNot: RequiredOrNotText) =>
    getNameDetailSchema('firstName', requiredOrNot),

  lastName: (requiredOrNot: RequiredOrNotText) =>
    getNameDetailSchema('lastName', requiredOrNot),
}
