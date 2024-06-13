import React, { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
  footer: ReactNode
}

const Layout = ({ children, footer }: LayoutProps) => {
  return (
    <div className="h-full flex flex-col box-border">
      {children}
      <div className="fixed right-0 bottom-0">{footer}</div>
    </div>
  )
}

export default Layout
