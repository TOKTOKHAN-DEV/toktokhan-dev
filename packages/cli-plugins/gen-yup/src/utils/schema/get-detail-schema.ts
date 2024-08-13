import { SchemaValue } from '../../constants/schema'
import { AddressSchema } from './purpose/Address'
import { AuthenticationSchema } from './purpose/Authentication'
import { ProfileSchema } from './purpose/Profile'
import { getStringSchema } from './utils/get-common-schema'
import {
  RequiredOrNot,
  RequiredOrNotText,
  getRequiredOrNot,
} from './utils/get-required-or-not'

type ReturnType = {
  [key in SchemaValue]?: (requiredText: RequiredOrNotText) => string
}

interface GetDetailSchemaProps {
  value: SchemaValue
  type: RequiredOrNot
}

const schemaDetailMap: ReturnType = {
  ...ProfileSchema,
  ...AuthenticationSchema,
  ...AddressSchema,
}

export function getDetailSchema({ value, type }: GetDetailSchemaProps) {
  const fn = schemaDetailMap[value]

  if (fn) {
    return fn(getRequiredOrNot(type))
  }

  return getStringSchema(value, getRequiredOrNot(type))
}
