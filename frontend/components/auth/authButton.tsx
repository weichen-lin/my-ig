import clsx from 'clsx'
import { LoadingIcon } from 'public/icon/login'

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
      >
        <span className={`${isRequest ? 'hidden' : ''}`}>{label}</span>
        <LoadingIcon
          className={`h-6 w-6 animate-spin transition-opacity ease-out duration-200 ${isRequest ? 'block' : 'hidden'}`}
        />
      </button>
    </div>
  )
}
