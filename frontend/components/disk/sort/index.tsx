import clsx from 'clsx'
import { ArrowIcon, Lattice, List, ArrowNoLineIcon } from 'public/icon/disk'

import { ListMethod } from 'hooks/disk'

import CustomDatePicker from './date-picker'

import type { DiskProps, DatetimeProps } from 'hooks/disk'
import { CurrentFolder } from 'context'

const BreadCrumb = (props: {
  folderInfo: CurrentFolder
  isLastOne: boolean
  needTruncate: boolean
  handleBreadChangeFolder: (e: CurrentFolder) => void
}) => {
  const { folderInfo, isLastOne, needTruncate, handleBreadChangeFolder } = props
  return (
    <div className='text-gray-500 flex hover:cursor-pointer flex-1'>
      <span
        className={`${
          needTruncate ? 'max-w-[160px]' : 'max-w-[200px] xs:max-w-[300px]'
        } hover:bg-slate-200 px-3 rounded-lg h-9 mt-[6px] leading-7 py-1 truncate select-none`}
        onClick={() => {
          if (isLastOne) return
          handleBreadChangeFolder(folderInfo)
        }}
      >
        {folderInfo.folder_name}
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

interface SortProps extends Pick<DiskProps, 'sortProps'> {
  customDatePickerProps: DatetimeProps
}

export default function Sort(props: SortProps) {
  const { sortProps, customDatePickerProps } = props
  const {
    listMethod,
    handleListMethod,
    current_folder,
    handleBreadChangeFolder
  } = sortProps

  const current_folder_copy = [...current_folder]

  return (
    <div
      className={clsx('w-[90%] mx-auto flex justify-around flex-wrap', 'mt-1')}
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
          'w-full mt-2 pt-2 pb-1 md:pt-0 md:pb-[6px] text-lg text-gray-500 border-b-2 md:border-t-2 px-2 flex overflow-x-auto',
          `${current_folder_copy.length > 0 ? '' : 'hidden md:block'}`
        )}
      >
        <span className='hidden md:block'>
          <BreadCrumb
            folderInfo={{
              folder_name: 'My Kushare',
              folder_uuid: ''
            }}
            isLastOne={current_folder_copy.length === 0}
            needTruncate={false}
            handleBreadChangeFolder={handleBreadChangeFolder}
          />
        </span>
        <span className='hidden md:flex'>
          {current_folder_copy.map((e, index) => (
            <BreadCrumb
              folderInfo={e}
              isLastOne={index === current_folder_copy.length - 1}
              needTruncate={index !== current_folder_copy.length - 1}
              key={`BreadCrumb_${index}`}
              handleBreadChangeFolder={handleBreadChangeFolder}
            ></BreadCrumb>
          ))}
        </span>
        <span className='block md:hidden'>
          {current_folder_copy.length > 0 ? (
            <span className='flex'>
              <ArrowNoLineIcon
                className={clsx('w-6 h-6 my-2 ml-1 mr-2 rotate-180')}
                fill={'gray'}
              />
              <BreadCrumb
                folderInfo={
                  current_folder_copy?.pop() ?? {
                    folder_name: 'My Kushare',
                    folder_uuid: ''
                  }
                }
                isLastOne={true}
                needTruncate={false}
                handleBreadChangeFolder={handleBreadChangeFolder}
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
