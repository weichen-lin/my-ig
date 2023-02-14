import clsx from 'clsx'
import { ArrowIcon, Lattice, List, ArrowNoLineIcon } from 'public/icon/disk'

import { ListMethod } from 'hooks/disk/type'

import CustomDatePicker from './date-picker'
import { DateTimePickerProps } from './type'

interface SortProps {
  listMethod: number
  handleListMethod: () => void
  customDatePickerProps: DateTimePickerProps
}

const BreadCrumb = (props: {
  folderName: string
  isLastOne: boolean
  needTruncate: boolean
}) => {
  const { folderName, isLastOne, needTruncate } = props
  return (
    <div className={clsx('text-gray-500 flex')}>
      <span
        className={`${
          needTruncate ? 'truncate w-12' : ''
        } hover:bg-slate-200 px-2 rounded-lg h-7 mt-[6px] leading-7 p-[1px]`}
      >
        {folderName}
      </span>
      <ArrowNoLineIcon
        className={clsx(
          'w-6 h-6 my-2 ml-1 mr-2 hidden md:block',
          `${isLastOne ? 'md:hidden' : ''}`
        )}
        fill={'gray'}
      />
    </div>
  )
}

export default function Sort(props: SortProps) {
  const { listMethod, handleListMethod, customDatePickerProps } = props

  const current_folder: string[] = ['第一層', '第二層', '第三層']

  return (
    <div
      className={clsx('w-[90%] mx-auto flex justify-around flex-wrap', 'my-1')}
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
        <CustomDatePicker customDatePickerProps={customDatePickerProps} />
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
      <div
        className={clsx(
          'w-full mt-2 pt-2 pb-1 md:pt-0 md:pb-0 text-lg text-gray-500 border-b-2 md:border-t-2 px-2 flex',
          `${current_folder.length > 0 ? '' : 'hidden md:block'}`
        )}
      >
        <span className='hidden md:block'>
          <BreadCrumb
            folderName='My Kushare'
            isLastOne={current_folder.length === 0}
            needTruncate={false}
          />
        </span>
        <span className='hidden md:flex'>
          {current_folder.map((e, index) => (
            <BreadCrumb
              folderName={e}
              isLastOne={index === current_folder.length - 1}
              needTruncate={index !== current_folder.length - 1}
              key={`BreadCrumb_${index}`}
            ></BreadCrumb>
          ))}
        </span>
        <span className='block md:hidden'>
          {current_folder.length > 0 ? (
            <span className='flex'>
              <ArrowNoLineIcon
                className={clsx('w-6 h-6 my-2 ml-1 mr-2 rotate-180')}
                fill={'gray'}
              />
              <BreadCrumb
                folderName={current_folder.pop() ?? 'My Kushare'}
                isLastOne={true}
                needTruncate={false}
              ></BreadCrumb>
            </span>
          ) : (
            <></>
          )}
        </span>
      </div>
    </div>
  )
}
