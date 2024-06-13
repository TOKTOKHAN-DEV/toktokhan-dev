import { Children, ReactNode, useCallback } from 'react'

import { ClassNameValue, twMerge } from 'tailwind-merge'

import AccordionIcon from './AccordionIcon'
import { useAccordionContext } from './contexts/useAccodion'

interface AccordionButtonProps {
  index?: number
  isExpanded?: boolean
  className?: ClassNameValue
  children: ReactNode
}

const AccordionButton = ({
  index,
  isExpanded,
  className,
  children,
}: AccordionButtonProps) => {
  const hasSVG = Children.toArray(children).some(
    (child) =>
      typeof child === 'object' && 'type' in child && child.type === 'svg',
  )

  const { onToggle, setOpenIndexes, allowMultiple, styles } =
    useAccordionContext()

  const handleToggle = useCallback(
    (index?: number) => {
      if (index === undefined) return
      setOpenIndexes?.((prevIndexes) => {
        if (index === undefined) return prevIndexes
        const newIndexes = new Set(prevIndexes)
        if (newIndexes.has(index)) {
          newIndexes.delete(index)
        } else {
          newIndexes.add(index)
        }
        return newIndexes
      })
    },
    [setOpenIndexes],
  )

  return (
    <button
      type="button"
      className={twMerge(
        'body02-normal-bold',
        'flex w-full justify-between items-center',
        styles?._button,
        className,
      )}
      onClick={() => {
        if (allowMultiple) {
          handleToggle(index)
          return
        }
        onToggle?.(index)
      }}
    >
      {hasSVG ?
        <>{children}</>
      : <>
          {children}
          <AccordionIcon isExpanded={!!isExpanded} />
        </>
      }
    </button>
  )
}

export default AccordionButton
