import React from 'react'

const AccordionIcon = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <svg
      className={`transition-transform duration-300 transform origin-center ${isExpanded ? 'rotate-180' : ''}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="CaretDown" clipPath="url(#clip0_4115_1162)">
        <path id="Vector" d="M17.5 9.5L12 14.5L6.5 9.5" fill="#292929" />
      </g>
      <defs>
        <clipPath id="clip0_4115_1162">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default AccordionIcon
