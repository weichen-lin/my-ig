import clsx from 'clsx'
import { Icon } from '@iconify/react'

interface ButtonProps {
  name: string
  onClick: () => void
  message?: string
}

export const MobileButton = (props: ButtonProps) => {
  const { name, onClick } = props

  return (
    <Icon
      className='w-6 h-6 xs:w-7 xs:h-7 rounded-md cursor-pointer hover:bg-slate-200'
      onClick={onClick}
      icon={name}
    />
  )
}

export const PCButton = (props: ButtonProps) => {
  const { name, onClick, message } = props

  return (
    <button
      className={clsx(
        'h-10 border-2 border-slate-100 hover:bg-slate-100 shadow-lg px-4 rounded-lg flex items-center justify-between gap-x-2',
        'transition-colors duration-300',
      )}
      onClick={onClick}
    >
      <Icon className='w-6 h-6' icon={name} />
      {message}
    </button>
  )
}
