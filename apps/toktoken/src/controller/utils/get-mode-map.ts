import { arrayToRecord } from '@toktokhan-dev/universal'

import { isNull, isUndefined } from 'lodash'
import { flatten, flow, map, mapValues, prop, toLower } from 'lodash/fp'

const maybe = (fn: any) => (v: any) => {
  if (isNull(v) || isUndefined(v)) return undefined
  return fn(v)
}

export const getModeMap = async (): Promise<Record<string, string>> => {
  return figma.variables
    .getLocalVariableCollectionsAsync()
    .then(
      flow(
        map(prop('modes')),
        flatten,
        maybe(
          flow(
            arrayToRecord(flow(prop('modeId'), toLower)),
            mapValues(flow(prop('name'), toLower)),
          ),
        ),
      ),
    )
}
