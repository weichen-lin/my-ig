import clsx from 'clsx'

import { ListMethod } from 'hooks/disk'

import type { DiskProps, DatetimeProps } from 'hooks/disk'
import { CurrentFolder } from 'context'

import { HiArrowSmUp, HiOutlinePlusSm } from 'react-icons/hi'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { TbLayoutDashboard } from 'react-icons/tb'
import {
  MdKeyboardArrowRight,
  MdManageSearch,
  MdOutlineDriveFolderUpload,
} from 'react-icons/md'
import { LuPlusSquare } from 'react-icons/lu'

import { useIsMobile } from 'hooks/disk'
import { IconType } from 'react-icons/lib'

const BreadCrumb = (props: {
  folderInfo: CurrentFolder
  isLastOne: boolean
  needTruncate: boolean
  handleBreadChangeFolder: (e: CurrentFolder) => void
}) => {
  const { folderInfo, isLastOne, needTruncate, handleBreadChangeFolder } = props

  return (
    // <div className='text-gray-500 flex hover:cursor-pointer flex-1'>
    //   <span
    //     className={`${
    //       needTruncate ? 'max-w-[160px]' : 'max-w-[200px] xs:max-w-[300px]'
    //     } hover:bg-slate-200 px-3 rounded-lg h-9 mt-[6px] leading-7 py-1 truncate select-none`}
    //     onClick={() => {
    //       if (isLastOne) return
    //       handleBreadChangeFolder(folderInfo)
    //     }}
    //   >
    //     {folderInfo.folder_name}
    //   </span>
    //   {!isLastOne && (
    //     <MdKeyboardArrowRight
    //       className={clsx('w-6 h-6 my-2 ml-1 mr-2 hidden md:block bg-red-300')}
    //       fill={'gray'}
    //     />
    //   )}
    // </div>
    <BreadCrumbBackBone />
  )
}

const BreadCrumbBackBone = () => {
  return (
    <div className='w-[200px] h-9 bg-gray-300/20 animate-pulse rounded-2xl'></div>
  )
}

interface SortProps extends Pick<DiskProps, 'sortProps'> {}

export default function Manipulator(props: SortProps) {
  const { sortProps } = props
  const {
    listMethod,
    handleListMethod,
    current_folder,
    handleBreadChangeFolder,
  } = sortProps

  const test = [
    {
      folder_uuid: 'asdasdad',
      folder_name: '層級1',
    },
    {
      folder_uuid: 'asdasdad',
      folder_name: '層級2',
    },
    {
      folder_uuid: 'asdasdad',
      folder_name: '層級3',
    },
    {
      folder_uuid: 'asdasdad',
      folder_name: '層級4',
    },
  ]

  const current_folder_copy = [...test]

  const { isMobile } = useIsMobile()

  const Bottons = [
    {
      Icon: HiOutlinePlusSm,
      message: '建立',
      onClick: () => console.log('press button'),
    },
    {
      Icon: MdOutlineDriveFolderUpload,
      message: '上傳',
      onClick: () => console.log('press button'),
    },
    {
      Icon: MdManageSearch,
      message: '設定過濾',
      onClick: () => console.log('press button'),
    },
    {
      Icon:
        listMethod > ListMethod.Lattice
          ? AiOutlineUnorderedList
          : TbLayoutDashboard,
      message: '調整檢視',
      onClick: handleListMethod,
    },
  ]

  return (
    <div
      className={clsx(
        'w-[90%] mx-auto flex flex-wrap mt-1',
        `${isMobile ? 'justify-around' : 'justify-start gap-4'}`
      )}
    >
      {Bottons.map((e) =>
        isMobile ? (
          <MobileButton Icon={e.Icon} onClick={e.onClick} />
        ) : (
          <PCButton Icon={e.Icon} onClick={e.onClick} message={e.message} />
        )
      )}
      <div
        className={clsx(
          'w-full mt-2 pt-2 pb-1 md:pt-0 md:pb-[6px] text-lg text-gray-500 border-b-2 md:border-none px-2 flex overflow-x-auto',
          `${current_folder_copy.length > 0 ? '' : 'hidden md:block'}`
        )}
      >
        <span className='hidden md:block'>
          <BreadCrumb
            folderInfo={{
              folder_name: 'My Kushare',
              folder_uuid: '',
            }}
            isLastOne={current_folder_copy.length === 0}
            needTruncate={false}
            handleBreadChangeFolder={handleBreadChangeFolder}
          />
        </span>
        {isMobile && current_folder_copy.length > 0 ? (
          <div className='flex w-full justify-between items-center'>
            <MdKeyboardArrowRight
              className={clsx('w-6 h-6 my-2 ml-1 mr-2 rotate-180')}
            />
            <span className='flex flex-1 justify-center'>
              <BreadCrumb
                folderInfo={
                  current_folder_copy?.pop() ?? {
                    folder_name: 'My Kushare',
                    folder_uuid: '',
                  }
                }
                isLastOne={true}
                needTruncate={false}
                handleBreadChangeFolder={handleBreadChangeFolder}
              ></BreadCrumb>
            </span>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  )
}

interface ButtonProps {
  Icon: IconType
  onClick: () => void
  message?: string
}

const MobileButton = (props: ButtonProps) => {
  const { Icon, onClick } = props

  return (
    <div
      className='w-8 h-8 xs:w-8 xs:h-8 rounded-md cursor-pointer hover:bg-slate-200'
      onClick={onClick}
    >
      <Icon className='w-6 h-6 xs:w-[20px] xs:h-[20px] m-1 xs:m-[6px] cursor-pointer' />
    </div>
  )
}

const PCButton = (props: ButtonProps) => {
  const { Icon, onClick, message } = props

  return (
    <button
      className='h-10 border-slate-50 hover:bg-slate-100 shadow-lg px-4 rounded-lg flex items-center justify-between gap-x-2'
      onClick={onClick}
    >
      <Icon className='w-8 h-6' />
      {message}
    </button>
  )
}
