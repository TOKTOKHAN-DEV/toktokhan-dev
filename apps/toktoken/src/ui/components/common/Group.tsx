import { twMerge } from 'tailwind-merge'

interface GroupProps {
  title: string
  children: React.ReactNode
  className?: string
}

export const Group = ({ title, children, className }: GroupProps) => {
  return (
    <div className={className}>
      <div
        className={twMerge(
          'h-[40px] py-[8px]',
          'text-primary text-[12px] font-[600] leading-[150%] tracking-[-0.24px]',
          'flex items-center justify-between cursor-pointer',
          'border-b-[1px] border-border-secondary',
        )}
      >
        <h3>{title}</h3>
      </div>
      <div className="py-[16px]">{children}</div>
    </div>
  )
}
