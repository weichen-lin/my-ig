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
        'w-full h-7 flex justify-between mb-2',
        'md:mt-2',
        'lg:w-full'
      )}
    >
      <div className={clsx('text-lg flex cursor-pointer')}>
        排序方式
        <ArrowIcon className={clsx('w-[18px] h-[18px] m-[5px]')} />
      </div>
      <div
        className='hover:bg-slate-200 rounded-full cursor-pointer'
        onClick={handleListMethod}
      >
        {listMethod > 0 ? (
          <Lattice className={clsx('h-[18px] m-[5px]')} />
        ) : (
          <List className={clsx('w-[18px] h-[18px] m-[5px]')} />
        )}
      </div>
    </div>
  );
}
