import clsx from 'clsx'
import { Plus } from 'public/icon/disk'

export default function Operator() {
  return (
    <div
      className={clsx(
        'fixed bottom-[5%] right-[15%] w-16 h-16 cursor-pointer bg-white',
        'rounded-full shadow-lg shadow-gray-400/80 hover:bg-gray-300',
        'hover:border-[1px] hover:border-gray-300',
        'transition-all duration-150 ease-in-out',
        'md:right-[10%]'
      )}
    >
      <Plus className='w-8 h-8 m-4 opacity-70' />
      <div
        className={clsx(
          'absolute top-2 left-2 w-12 h-12 bg-red-500 rounded-full',
          'transition-all duration-200 ease-out',
          'custom_rotate'
        )}
      ></div>
    </div>
  )
}
