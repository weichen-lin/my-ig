import clsx from 'clsx'
import { SearchIcon } from 'public/icon/disk'

export default function Search() {
  return (
    <div className='w-full h-full relative'>
      <SearchIcon className='absolute top-[3.5%] left-[9%] w-6 h-6' />
      <input
        className={clsx(
          'drop-shadow-xl z-10',
          'mx-[5%] mt-3 w-[90%] p-2 pl-16',
          'h-[45px] rounded-xl bg-transparent border-2 outline-none',
          'text-gray-600 text-lg',
          'peer'
        )}
        required
      ></input>
      <div
        className={clsx(
          'absolute w-[90%] top-5 pl-20 h-9 opacity-70 text-gray-500 text-lg pointer-events-none',
          'transition-opacity duration-150 ease-in',
          'peer-focus:opacity-0',
          'peer-valid:opacity-0'
        )}
      >
        在 KuShare中搜尋...
      </div>
    </div>
  )
}
