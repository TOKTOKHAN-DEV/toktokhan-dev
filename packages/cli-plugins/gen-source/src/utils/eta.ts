import { readdirSync } from 'fs'

import { Eta } from 'eta'

import { packageRoot } from './package-root'

type ImportsProps = {
  exportName: string
  importPath: string
}

type DefinedTemplate = {
  component: {
    name: string
    props?: Array<{
      prop: string
      type: string
      optional: boolean
    }>
    additionalImports?: ImportsProps[]
  }
  'dynamic-page-component': {
    name: string
    contentName: string
    pageTitle: string
    slug: string
  }
  index: ImportsProps
  import: ImportsProps
  'page-component': {
    name: string
    contentName: string
    pageTitle: string
  }
}

export const eta = new Eta({
  views: packageRoot('templates'),
})

export const renderDefinedEta = <K extends keyof DefinedTemplate>(
  name: K,
  options: DefinedTemplate[K],
) => {
  return eta.render(`${name}.template.eta`, options)
}
