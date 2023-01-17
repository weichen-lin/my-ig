import clsx from 'clsx'
import { ArrowIcon, Lattice, List } from 'public/icon/disk'

import { ListMethod } from 'hooks/disk/type'

import CustomDatePicker from 'components/disk/sort/date-picker'

interface SortProps {
  listMethod: number
  handleListMethod: () => void
}

export default function Sort(props: SortProps) {
  const { listMethod, handleListMethod } = props

  return (
    <div
      className={clsx(
        'w-full h-12 flex justify-between mb-2',
        'md:mt-2',
        'lg:w-full'
      )}
    >
      <div className='flex'>
        <span className='py-[10px] text-lg'>排序方式</span>
        <div className='w-6 h-6 my-[12px] rounded-md cursor-pointer hover:bg-slate-200 mx-1'>
          <ArrowIcon
            className={clsx(
              'w-[20px] h-[20px] m-[2px] rounded-md cursor-pointer'
            )}
          />
        </div>
      </div>
      <div className='flex'>
        <CustomDatePicker />
        <div
          className='w-9 h-9 my-[6px] rounded-md cursor-pointer hover:bg-slate-200'
          onClick={handleListMethod}
        >
          {listMethod > ListMethod.Lattice ? (
            <Lattice className={clsx('w-[20px] h-[20px] m-2 cursor-pointer')} />
          ) : (
            <List className={clsx('w-[20px] h-[20px] m-2 cursor-pointer')} />
          )}
        </div>
      </div>
    </div>
  )
}
