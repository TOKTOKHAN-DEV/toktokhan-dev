import clsx from 'clsx'

const TopBar = () => {
  return (
    <div
      className={clsx(
        'w-full',
        'bg-gradient-to-r',
        'from-primary-100',
        'to-primary-800',
        'p-3',
        'text-center',
        'font-medium',
        'text-white',
      )}
    >
      Experience Frontend Innovation, All in One Place.
    </div>
  )
}

export default TopBar
