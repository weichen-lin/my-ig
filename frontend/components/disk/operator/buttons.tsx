import clsx from 'clsx'
import { IconType } from 'react-icons/lib'

interface ButtonProps {
  Icon: IconType
  onClick: () => void
  message?: string
}

export const MobileButton = (props: ButtonProps) => {
  const { Icon, onClick } = props

  return (
    <div
      className='w-8 h-8 xs:w-8 xs:h-8 rounded-md cursor-pointer hover:bg-slate-200'
      onClick={onClick}
    >
      <Icon className='w-6 h-6 xs:w-[20px] xs:h-[20px] m-1 xs:m-[6px] cursor-pointer' />
    </div>
  )
}

export const PCButton = (props: ButtonProps) => {
  const { Icon, onClick, message } = props

  return (
    <button
      className={clsx(
        'h-10 border-2 border-slate-100 hover:bg-slate-100 shadow-lg px-4 rounded-lg flex items-center justify-between gap-x-2',
        'transition-colors duration-300'
      )}
      onClick={onClick}
    >
      <Icon className='w-8 h-6' />
      {message}
    </button>
  )
}
