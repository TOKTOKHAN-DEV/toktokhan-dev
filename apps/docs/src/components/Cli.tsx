import React from 'react'

import { twJoin } from 'tailwind-merge'

import { PlusIcon } from '../generated/icons'

const CLI_DATA = [
  'gen : token',
  'gen : api',
  'gen : img',
  'gen : icon',
  'convert : webp',
]

const Cli = () => {
  const isSmallScreen = false
  const itemsToShow = isSmallScreen ? 8 : 9
  const dataItems = CLI_DATA.slice(0, itemsToShow)
  const remainingItems = itemsToShow - dataItems.length

  const renderItem = (item, index) => (
    <p
      key={index}
      className={twJoin(
        'h-[44px]',
        'font-ibmFlexMono',
        'text-white text-center font-mono text-sm font-bold leading-normal',
        'flex flex-[1] items-center justify-center',
        'rounded-full',
        'bg-black-gradient',
      )}
    >
      {item}
    </p>
  )

  const renderButton = (index) => (
    <div
      key={index + dataItems.length}
      className={twJoin(
        'h-[44px]',
        'text-white text-center font-mono text-sm font-bold leading-normal',
        'flex flex-[1] items-center justify-center',
        'rounded-full',
        'bg-gray-gradient',
      )}
    >
      <PlusIcon />
    </div>
  )

  return (
    <div
      className={twJoin(
        'w-full grid grid-cols-2 md:grid-cols-3 gap-y-[24px] gap-x-[32px]',
      )}
    >
      {dataItems.map(renderItem)}
      {Array.from({ length: remainingItems }, (_, index) =>
        renderButton(index),
      )}
    </div>
  )
}

export default Cli
