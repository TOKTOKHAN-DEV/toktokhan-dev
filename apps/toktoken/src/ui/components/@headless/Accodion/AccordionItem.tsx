import { Children, ReactNode, cloneElement, isValidElement } from 'react'
import React from 'react'

import { ClassNameValue, twJoin, twMerge } from 'tailwind-merge'

import AccordionButton from './AccordionButton'
import AccordionPanel from './AccordionPanel'
import { useAccordionContext } from './contexts/useAccodion'

const AccordionItem = ({
  index,
  children,
  className,
}: {
  index?: number
  children: ReactNode | ((props: { isExpanded: boolean }) => ReactNode)
  className?: ClassNameValue
}) => {
  const { styles, hasDivider, checkIsExpanded } = useAccordionContext()
  const isExpanded = !!checkIsExpanded?.(index)

  const _children =
    typeof children === 'function' ? children({ isExpanded }) : children

  const button = Children.map(_children, (child) => {
    if (isValidElement(child)) {
      if (child.type === AccordionButton) {
        return cloneElement(child, { index, isExpanded } as React.Attributes & {
          isExpanded: boolean
          index: number
        })
      }
    }
    return null
  })

  const panel = Children.map(_children, (child) => {
    if (isValidElement(child)) {
      if (child.type === AccordionPanel) {
        return cloneElement(child, {
          isExpanded,
        } as React.Attributes & {
          isExpanded: boolean
        })
      }
    }
    return null
  })
  return (
    <>
      <div
        className={twMerge(
          'w-full pt-[10px] pb-[11px]',
          styles?._item,
          className,
        )}
      >
        <h2>{button}</h2>
        <div
          className={twMerge(
            'overflow-hidden',
            'transition-all duration-200 transform translate-y-1',
            isExpanded ?
              'block opacity-100 translate-y-0 h-auto'
            : 'opacity-0 h-0',
          )}
        >
          {panel}
        </div>
      </div>
      {hasDivider && <div className="border-b-[1px] border-border-secondary" />}
    </>
  )
}

export default AccordionItem
