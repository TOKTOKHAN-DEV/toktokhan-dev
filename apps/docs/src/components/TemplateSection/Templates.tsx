import React from 'react'

import { MY_IMAGES } from '@site/src/generated/images'

import { twMerge } from 'tailwind-merge'

const TEMPLATE_DATA = {
  rn: {
    title: 'React Native',
    img: MY_IMAGES.TEMPLATE_RN,
  },
  'next-app': {
    title: 'Next\nApp Router',
    img: MY_IMAGES.TEMPLATE_NEXT,
  },
  'next-page': {
    title: 'Next\nPage Router',
    img: MY_IMAGES.TEMPLATE_NEXT,
  },
  webapp: {
    title: 'Web App',
    img: MY_IMAGES.TEMPLATE_WEBAPP,
  },
}

const Templates = () => {
  return (
    <div className="flex gap-4">
      {Object.entries(TEMPLATE_DATA).map(([key, { title, img }]) => (
        <div
          key={key}
          className={twMerge(
            'flex flex-col gap-2 justify-between',
            'rounded-[12px]',
            'border-solid',
            'border-[1px]',
            'border-tokColor-border.primary',
            'bg-tokColor-background.primary',
            'box-shadow-[0px 4px 15px 0px rgba(0, 0, 0, 0.10)]',
            'pt-[12px]',
            'pl-[12px]',
          )}
        >
          <p
            className={twMerge(
              'text-tokColor-text.primary',
              'font-jaro',
              'text-[16.096px]',
              'leading-[120%]',
              'tracking-[-0.322px]',
              'font-[400]',
              'whitespace-pre-wrap',
            )}
          >
            {title}
          </p>
          <img {...img} />
        </div>
      ))}
    </div>
  )
}

export default Templates
