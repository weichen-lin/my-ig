import clsx from 'clsx';
import { SearchIcon } from 'public/icon/disk';

export default function Search() {
  return (
    <div className='w-full relative mb-2'>
      <div className={clsx('absolute', 'w-12 h-12 top-3')}>
        <SearchIcon className={clsx('w-6 h-6 m-3')} />
      </div>
      <input
        className={clsx(
          'drop-shadow-xl z-10',
          'mt-3 lg:w-2/3 w-full p-2 pl-14',
          'h-[48px] rounded-xl bg-transparent border-2 outline-none',
          'text-gray-600 text-lg',
          'peer'
        )}
        required
      ></input>
      <div
        className={clsx(
          'absolute lg:w-2/3 w-full h-12 top-3 left-0 pl-14 opacity-70 text-gray-500 pointer-events-none bg-slate-200',
          'transition-opacity duration-150 ease-in',
          'text-lg py-[10px] rounded-xl',
          'peer-focus:opacity-0',
          'peer-valid:opacity-0'
        )}
      >
        在 KuShare中搜尋...
      </div>
    </div>
  );
}
