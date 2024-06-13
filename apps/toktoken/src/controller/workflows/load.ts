const SYSTEM_PAGE_RULES = ['color', 'foundation']
export const load = async (): Promise<void> => {
  const systemPageNode = figma.root.children.find((page) =>
    SYSTEM_PAGE_RULES.some((val) =>
      page.name.toLocaleLowerCase().includes(val),
    ),
  )
  await systemPageNode?.loadAsync()
}
