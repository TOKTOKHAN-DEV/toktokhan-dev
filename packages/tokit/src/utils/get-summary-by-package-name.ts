import { find, flow, isEqual, prop } from 'lodash/fp'

import { releasedTemplates } from '../services/github'

export const getSummaryByPackageName = (selected: string) =>
  releasedTemplates
    .choices('template')
    .then(
      flow(
        find(flow(prop('name'), isEqual(selected))), //
        prop('id'),
      ),
    )
    .then((id) => {
      if (!id) {
        throw new Error('Template not found')
      }
      return releasedTemplates
        .summary('template')
        .then(find(flow(prop('id'), isEqual(id))))
    })
