import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

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
  const { icon, onClick, isactive } = props
  const [editor] = useLexicalComposerContext()

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
      disabled={!editor.isEditable()}
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
        onClick()
      }}
      className='disabled:cursor-not-allowed disabled:opacity-30 cursor-pointer hover:bg-slate-300/40 rounded-md mr-2'
    >
      <Icon className='w-5 h-5 m-[6px]' color='#929292' icon={isLock ? 'ion:lock-closed' : 'heroicons:lock-open'} />
    </button>
  )
}
