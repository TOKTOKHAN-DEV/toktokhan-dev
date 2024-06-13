import {
  Children,
  FormEvent,
  HTMLAttributes,
  ReactNode,
  cloneElement,
  isValidElement,
  useCallback,
} from 'react'

import { isArray } from 'lodash'
import { ClassNameValue, twMerge } from 'tailwind-merge'

import {
  AccordionProvider,
  useAccordion,
  useAccordionProps,
} from './contexts/useAccodion'

interface RootAccordionProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onToggle' | 'className'>,
    useAccordionProps {
  children: ReactNode
  className?: ClassNameValue
}
const RootAccordion = ({
  children,
  defaultIndex,
  allowMultiple,
  hasDivider,
  styles,
  className,
  ...props
}: RootAccordionProps) => {
  const {
    defaultIndex: _defaultIndex,
    styles: _styles,
    hasDivider: _hasDivider,
    ...hookProps
  } = useAccordion()

  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <AccordionProvider
      value={{
        allowMultiple: allowMultiple ?? false,
        defaultIndex: defaultIndex ?? _defaultIndex,
        styles: styles ?? _styles,
        hasDivider: hasDivider ?? _hasDivider,
        ...hookProps,
      }}
    >
      <div className={twMerge(styles?._container, className)} {...props}>
        {childrenArray.filter(isValidElement).map((child, index) => {
          return cloneElement<any>(child, {
            index,
            key: index,
          })
        })}
      </div>
    </AccordionProvider>
  )
}

export default RootAccordion
