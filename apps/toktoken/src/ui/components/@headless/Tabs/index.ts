import RootTabs from './RootTabs'
import TabItem from './TabItem'
import TabList from './TabList'
import TabPanels from './TabPanels'

export const Tabs = Object.assign(RootTabs, {
  Item: TabItem,
  Panels: TabPanels,
  List: TabList,
})
