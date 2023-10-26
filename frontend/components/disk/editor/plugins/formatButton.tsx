import { Icon } from '@iconify/react'
import clsx from 'clsx'

interface ButtonProps {
  onClick: () => void
}

interface FormatButtonProps extends ButtonProps {
  icon: string
  disabled?: boolean
  isactive?: boolean
}

interface LockButtonProps extends ButtonProps {
  isLock: boolean
}

export function FormatButton(props: FormatButtonProps) {
  const { icon, onClick, disabled, isactive } = props

  return (
    <button
      onClick={() => {
        onClick()
      }}
      className={clsx(
        'disabled:cursor-not-allowed disabled:opacity-30',
        'cursor-pointer hover:bg-slate-300/40 rounded-md',
        isactive && 'bg-[#f5f8fd]',
      )}
    >
      <Icon className='w-6 h-6 m-1' color='#929292' icon={icon} />
    </button>
  )
}

export function LockButton(props: LockButtonProps) {
  const { onClick, isLock } = props
  return (
    <button
      onClick={() => {
        // editor.dispatchCommand(UNDO_COMMAND, undefined)
      }}
      className='disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer hover:bg-slate-300/40 rounded-md'
    >
      <Icon className='w-5 h-5 m-[6px]' color='#929292' icon={isLock ? 'ion:lock-closed' : 'heroicons:lock-open'} />
    </button>
  )
}
