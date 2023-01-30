import clsx from 'clsx'
import { LoadingIcon } from 'public/icon/login'

interface ButtonProps {
  label: string
  isRequest: boolean
  onClick: () => void
}

export default function AuthButton(props: ButtonProps) {
  const { label, isRequest, onClick } = props
  return (
    <div className='relative mx-auto w-full md:w-2/3'>
      <button
        className={clsx(
          'w-full bg-gradient-to-r from-gray-500/80 to-gray-700/70 absolute',
          'rounded-xl p-3 text-lg text-yellow-50 font-black',
          'flex justify-center',
          `${isRequest ? 'cursor-not-allowed' : 'cursor-pointer active:top-1'}`
        )}
        onClick={onClick}
      >
        <span className={`mr-2 ${isRequest ? 'hidden' : ''}`}>{label}</span>
        <LoadingIcon
          className={`h-6 w-6 animate-spin transition-opacity ease-out duration-200 ${
            isRequest ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </button>
    </div>
  )
}
