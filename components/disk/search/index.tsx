import clsx from 'clsx';
import { SearchIcon } from 'public/icon/disk';

export default function Search() {
  return (
    <div className='w-full relative mb-2'>
      <div
        className={clsx(
          'absolute',
          'w-[45px] h-[45px] top-3 left-[5%]',
          'md:top-4 md:left-[6%]'
        )}
      >
        <SearchIcon className={clsx('w-6 h-6 m-[10.5px]', 'md:w-8 md:h-8')} />
      </div>
      <input
        className={clsx(
          'drop-shadow-xl z-10',
          'mx-[5%] mt-3 w-[90%] p-2 pl-[10%]',
          'h-[45px] rounded-xl bg-transparent border-2 outline-none',
          'text-gray-600 text-lg',
          'peer',
          'md:pl-[8%] md:h-[60px] md:text-2xl'
        )}
        required
      ></input>
      <div
        className={clsx(
          'absolute w-[90%] top-5 pl-[15%] h-9 opacity-70 text-gray-500 text-lg pointer-events-none',
          'transition-opacity duration-150 ease-in',
          'peer-focus:opacity-0',
          'peer-valid:opacity-0',
          'md:pl-[13%] md:text-2xl md:top-7'
        )}
      >
        在 KuShare中搜尋...
      </div>
    </div>
  );
}
