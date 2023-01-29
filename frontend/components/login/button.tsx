import clsx from 'clsx'
import { LoadingIcon } from 'public/icon/login'

export default function LoginButton() {
  return (
    <div className='relative mx-auto w-full md:w-2/3'>
      <button
        className={clsx(
          'w-full bg-gradient-to-r from-gray-500/80 to-gray-700/70 absolute',
          'rounded-xl p-3 text-lg text-yellow-50 font-black',
          'cursor-pointer active:top-2 flex justify-center'
        )}
      >
        <span className='mr-2'>Login</span>
        <LoadingIcon className='h-6 w-6 animate-spin opacity-0 transition-opacity ease-out duration-200' />
      </button>
    </div>
  )
}
