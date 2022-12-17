import clsx from 'clsx'
import { SearchIcon } from 'public/icon/disk'

export default function Search() {
  return (
    <div className='w-full relative mb-2'>
      <div className='w-[45px] h-[45px] absolute top-3 left-[5%]'>
        <SearchIcon className='w-6 h-6 m-[10.5px]' />
      </div>
      <input
        className={clsx(
          'drop-shadow-xl z-10',
          'mx-[5%] mt-3 w-[90%] p-2 pl-[10%]',
          'h-[45px] rounded-xl bg-transparent border-2 outline-none',
          'text-gray-600 text-lg',
          'peer'
        )}
        required
      ></input>
      <div
        className={clsx(
          'absolute w-[90%] top-5 pl-[15%] h-9 opacity-70 text-gray-500 text-lg pointer-events-none',
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
