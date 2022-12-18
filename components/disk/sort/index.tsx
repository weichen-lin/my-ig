import clsx from 'clsx';
import { ArrowIcon, Lattice, List } from 'public/icon/disk';

interface SortProps {
  listMethod: number;
  handleListMethod: () => void;
}

export default function Sort(props: SortProps) {
  const { listMethod, handleListMethod } = props;
  return (
    <div
      className={clsx(
        'w-[90%] h-7 mx-[5%] flex justify-between mb-2',
        'md:mt-2'
      )}
    >
      <div className={clsx('text-lg flex cursor-pointer', 'md:text-2xl')}>
        排序方式
        <ArrowIcon
          className={clsx(
            'w-[18px] h-[18px] m-[5px]',
            'md:h-8 md:w-8 md:ml-1 md:m-0'
          )}
        />
      </div>
      <div
        className='hover:bg-slate-200 rounded-full cursor-pointer'
        onClick={handleListMethod}
      >
        {listMethod > 0 ? (
          <Lattice className={clsx('h-[18px] m-[5px]', 'md:h-8 md:w-8')} />
        ) : (
          <List
            className={clsx('w-[18px] h-[18px] m-[5px]', 'md:h-8 md:w-8')}
          />
        )}
      </div>
    </div>
  );
}
