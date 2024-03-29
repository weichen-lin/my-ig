import clsx from 'clsx'
import { Icon } from '@iconify/react'

interface ButtonProps {
  label: string
  isRequest: boolean
  onClick: () => void
  disabled: boolean
}

export default function AuthButton(props: ButtonProps) {
  const { label, isRequest, onClick, disabled } = props

  return (
    <div className='relative mx-auto w-full'>
      <button
        className={clsx(
          'w-full bg-gradient-to-r',
          'rounded-xl p-3 text-lg text-yellow-50 font-black',
          'flex justify-center',
          `${
            isRequest || disabled
              ? 'cursor-not-allowed from-gray-500/80 to-gray-700/70'
              : 'cursor-pointer active:top-1 from-blue-500/80 to-blue-700/70'
          }`,
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {isRequest ? <Icon icon='mingcute:loading-fill' className='w-8 h-8 animate-spin' /> : <span>{label}</span>}
      </button>
    </div>
  )
}
