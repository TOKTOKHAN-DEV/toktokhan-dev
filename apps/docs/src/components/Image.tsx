import React, { HtmlHTMLAttributes, forwardRef } from 'react'

import { twMerge } from 'tailwind-merge'

import { WithClass } from '../types/withClass'

interface ImageProps extends HtmlHTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  aspectRatio?: [number, number]
}

const Image = forwardRef<HTMLDivElement, WithClass<ImageProps>>(
  ({ src, alt, aspectRatio = [1, 1], className, id, ...props }, ref) => {
    return (
      <div
        id={id}
        ref={ref}
        className={twMerge(
          `aspect-w-${aspectRatio[0]} aspect-h-${aspectRatio[1]}`,
          className,
        )}
        {...props}
      >
        <img src={src} alt={alt} className={twMerge('object-cover')} />
      </div>
    )
  },
)
Image.displayName = 'Image'

export default Image
