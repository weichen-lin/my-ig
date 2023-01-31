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
        'w-full h-6 xs:h-8 flex justify-around',
        'my-1',
        'lg:w-full'
      )}
    >
      <div className='flex rounded-md hover:bg-slate-200'>
        <span className='pl-1 py-[2px] text-sm xs:text-lg'>排序</span>
        <div className={clsx('cursor-pointer', 'w-6 h-6')}>
          <ArrowIcon
            className={clsx(
              'w-4 h-4 xs:w-[20px] xs:h-[20px] ml-[2px] my-1 xs:my-[6px] cursor-pointer'
            )}
          />
        </div>
      </div>
      <div className='flex-1 flex justify-end'>
        <CustomDatePicker />
        <div
          className='w-6 h-6 xs:w-8 xs:h-8 rounded-md cursor-pointer hover:bg-slate-200'
          onClick={handleListMethod}
        >
          {listMethod > ListMethod.Lattice ? (
            <Lattice
              className={clsx(
                'w-4 h-4 xs:w-[20px] xs:h-[20px] m-1 xs:m-[6px] cursor-pointer'
              )}
            />
          ) : (
            <List
              className={clsx(
                'w-4 h-4 xs:w-[20px] xs:h-[20px] m-1 xs:m-[6px] cursor-pointer'
              )}
            />
          )}
        </div>
      </div>
    </div>
  )
}
