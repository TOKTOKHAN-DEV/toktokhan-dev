import AccordionButton from './AccordionButton'
import AccordionItem from './AccordionItem'
import AccordionPanel from './AccordionPanel'
import RootAccordion from './RootAccodion'

export const Accordion = Object.assign(RootAccordion, {
  Item: AccordionItem,
  Panels: AccordionPanel,
  Button: AccordionButton,
})
