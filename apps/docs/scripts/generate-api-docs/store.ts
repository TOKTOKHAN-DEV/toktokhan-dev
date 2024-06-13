export class ScriptStore {
  private constructor() {}

  static categorized: Categorized = []

  static getCategories = () => {
    return ScriptStore.categorized
  }

  static setCategories = (categories: Categorized) => {
    ScriptStore.categorized = categories
  }
}

export type CategorizedItem = {
  category: string
  name: string
}

export type Categorized = {
  name: string
  dts: string
  categorized: CategorizedItem[]
}[]
