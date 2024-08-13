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

  birthdate: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'birthdate',
      requiredOrNot,
      `
        .matches(REGEX['BIRTHDATE'].COMMON, HELPER_TEXT['BIRTHDATE'].COMMON)
        .matches(
        REGEX['BIRTHDATE'].DETAIL_FORMAT,
        HELPER_TEXT['BIRTHDATE'].DETAIL_FORMAT,
        )`,
    ),

  nickname: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'nickname',
      requiredOrNot,
      `
        .min(2, HELPER_TEXT['NICKNAME'].MIN)
        .nullable()
        .transform((value) => (!!value ? value : null))
        .max(10, HELPER_TEXT['NICKNAME'].MAX)
        .test(
        HELPER_TEXT['NICKNAME'].SPECIAL_CHARACTER,
        HELPER_TEXT['NICKNAME'].SPECIAL_CHARACTER,
        (value) => !REGEX['SPECIAL_CHARACTER'].test(value || ''),
        )
        .matches(REGEX['NICKNAME'], HELPER_TEXT['NICKNAME'].COMMON)`,
    ),

  username: (requiredOrNot: RequiredOrNotText) =>
    getNameDetailSchema('username', requiredOrNot),

  firstName: (requiredOrNot: RequiredOrNotText) =>
    getNameDetailSchema('firstName', requiredOrNot),

  lastName: (requiredOrNot: RequiredOrNotText) =>
    getNameDetailSchema('lastName', requiredOrNot),
}
