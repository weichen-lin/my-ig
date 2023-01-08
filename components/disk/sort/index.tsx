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
        'lg:w-full bg-green-200'
      )}
    >
      <div className='flex'>
        <span className='py-[7px] text-lg'>排序方式</span>
        <ArrowIcon
          className={clsx(
            'w-[18px] h-[18px] my-[12px] mx-1 hover:bg-slate-200 rounded-md cursor-pointer'
          )}
        />
      </div>
      <div className='flex'>
        <CustomDatePicker />
        <div
          className='w-[18px] h-[18px] mt-2 mx-4 rounded-md cursor-pointer'
          onClick={handleListMethod}
        >
          {listMethod > ListMethod.Lattice ? (
            <Lattice className={clsx('h-[18px] m-[5px]')} />
          ) : (
            <List className={clsx('w-[18px] h-[18px] m-[5px]')} />
          )}
        </div>
      </div>
    </div>
  )
}
