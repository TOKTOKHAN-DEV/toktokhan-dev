import { Children } from 'react'

import { Obj } from '@toktokhan-dev/universal'

import {
  entries,
  flow,
  groupBy,
  head,
  join,
  map,
  slice,
  split,
} from 'lodash/fp'
import { twJoin } from 'tailwind-merge'

import { ExpendableSection } from '../../common/ExpendableSection'
import { Sections } from '../../common/Sections'

interface TextStyleViewerProps {
  token: Obj
  className?: string
}

export const TextStyleViewer = ({ token, className }: TextStyleViewerProps) => {
  return <div className={className}>{renderGroup(token)}</div>
}

const renderText = flow(
  map(([key, value]) => {
    return (
      <div className="flex h-[24px] gap-[4px] bg-background-tertiary px-[8px] py-[4px] rounded-[4px] items-center">
        <div
          className={twJoin(
            'text-[10px] font-[500]',
            'font-mono leading-[150%] tracking-[0.2px]',
            'whitespace-nowrap',
          )}
        >
          {key}
        </div>
      </div>
    )
  }),
  Children.toArray,
  (children) => <div className="flex flex-wrap gap-[8px]">{children}</div>,
)

const renderGroup = flow(
  entries,
  groupBy(flow(head, split('-'), slice(0, 2), join('-'))),
  entries,
  map(([key, value]) => {
    return (
      <ExpendableSection title={key} initialExpanded={false}>
        {renderText(value)}
      </ExpendableSection>
    )
  }),
  Children.toArray,
  (children) => <Sections className={'p-0'}>{children}</Sections>,
)
