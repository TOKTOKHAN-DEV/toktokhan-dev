import { getStringSchema } from '../utils/get-common-schema'
import { RequiredOrNotText } from '../utils/get-required-or-not'

export const AddressSchema = {
  postcode: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'postcode',
      requiredOrNot,
      `
        .min(4, HELPER_TEXT['POSTCODE'])
        .max(20, HELPER_TEXT['POSTCODE'])
        .matches(REGEX['POSTCODE'].EXCEPT_HYPHEN, HELPER_TEXT['POSTCODE'])`,
    ),

  addressMain: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'addressMain',
      requiredOrNot,
      `.max(100, HELPER_TEXT['ADDRESS_MAIN'].MAX)`,
    ),

  addressDetail: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'addressDetail',
      requiredOrNot,
      `.max(100, HELPER_TEXT['ADDRESS_DETAIL'].MAX)`,
    ),

  city: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'city',
      requiredOrNot,
      `.max(100, HELPER_TEXT['CITY'].MAX)`,
    ),

  region: (requiredOrNot: RequiredOrNotText) =>
    getStringSchema(
      'region',
      requiredOrNot,
      `.max(50, HELPER_TEXT['REGION'].MAX)`,
    ),
}
