import clsx from 'clsx'
import { Icon } from '@iconify/react'
import { KushareAuth } from 'context'
import { useContext } from 'react'

interface ButtonProps {
  name: string
  onClick: () => void
  message?: string
}

export const MobileButton = (props: ButtonProps) => {
  const { name, onClick } = props
  const { user } = useContext(KushareAuth)

  return (
    <button
      disabled={!user?.isValidate}
      className={clsx('rounded-md enable:hover:bg-slate-200', 'disabled:opacity-50 disabled:cursor-not-allowed')}
      onClick={onClick}
    >
      <Icon icon={name} className='w-6 h-6 xs:w-7 xs:h-7 ' />
    </button>
  )
}

export const PCButton = (props: ButtonProps) => {
  const { name, onClick, message } = props
  const { user } = useContext(KushareAuth)

  return (
    <button
      className={clsx(
        'h-10 border-2 border-slate-100 hover:bg-slate-100 shadow-lg px-4 rounded-lg',
        'transition-colors duration-300',
        'flex items-center justify-between gap-x-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
      )}
      onClick={onClick}
      disabled={!user?.isValidate}
    >
      <Icon className='w-6 h-6' icon={name} />
      {message}
    </button>
  )
}
