import clsx from 'clsx'
import { CiSearch } from 'react-icons/ci'

export default function Search() {
  return (
    <div className='flex w-full items-center'>
      <div className='relative flex-1'>
        <div className={clsx('absolute', 'w-8 h-8 xs:w-12 xs:h-12 top-3')}>
          <CiSearch
            className={clsx('w-6 h-6 my-2 mx-2 xs:w-6 xs:h-6 xs:m-3')}
          />
        </div>
        <input
          className={clsx(
            'drop-shadow-xl z-10',
            'mt-3 py-2 pl-10 xs:pl-14',
            'lg:w-2/3 w-full h-10 xs:h-12',
            'rounded-xl bg-transparent border-2 outline-none',
            'text-gray-600 text-lg',
            'peer'
          )}
          required
        ></input>
        <div
          className={clsx(
            'absolute top-3 left-0 pl-10 opacity-70 text-gray-500 pointer-events-none bg-slate-200',
            'w-full lg:w-2/3 h-10 xs:h-12',
            'pl-10 xs:pl-14',
            'text-md xs:text-lg',
            'transition-opacity duration-150 ease-in',
            'py-2 xs:py-[10px] rounded-xl',
            'peer-focus:opacity-0',
            'peer-valid:opacity-0'
          )}
        >
          在 KuShare中搜尋...
        </div>
      </div>
    </div>
  )
}
