import clsx from 'clsx'

import type { DiskProps, DatetimeProps } from 'hooks/disk'
import { CurrentFolder } from 'context'

import { MdKeyboardArrowRight } from 'react-icons/md'

import { useIsMobile } from 'hooks/disk'

const BreadCrumb = (props: {
  folderInfo: CurrentFolder
  isLastOne: boolean
  // handleBreadChangeFolder: (e: CurrentFolder) => void
}) => {
  const { folderInfo, isLastOne } = props

  return (
    <div className='hover:cursor-pointer flex flex-1 items-center'>
      <MdKeyboardArrowRight className='w-6 h-6' fill={'gray'} />
      <span
        className='max-w-[160px] hover:bg-slate-200 px-3 rounded-lg truncate select-none font-bold py-1'
        onClick={() => {
          if (isLastOne) return
          // handleBreadChangeFolder(folderInfo)
        }}
      >
        {folderInfo.folder_name}
      </span>
    </div>
  )
}

const BreadCrumbMobile = (props: {
  folderInfo: CurrentFolder[]
  isLastOne: boolean
  // handleBreadChangeFolder: (e: CurrentFolder) => void
}) => {
  const { folderInfo } = props

  const lastone = folderInfo.pop()

  return (
    <div className='max-w-[160px] hover:bg-slate-200 px-3 rounded-lg truncate select-none font-bold'>
      {lastone?.folder_name}
    </div>
  )
}

const BreadCrumbBackBone = () => {
  return (
    <div className='flex items-center'>
      <MdKeyboardArrowRight className='w-6 h-6' fill={'gray'} />
      <div className='ml-4 w-[200px] h-9 bg-gray-300/20 animate-pulse rounded-2xl'></div>
    </div>
  )
}

interface SortProps extends Pick<DiskProps, 'sortProps'> {}

export default function BreadCrumbs(props: SortProps) {
  const { sortProps } = props
  const { current_folder, handleBreadChangeFolder } = sortProps

  const test = [
    {
      folder_uuid: 'asdasdad',
      folder_name:
        '層級adadasdasdasdasdasd1層級adadasdasdasdasdasd1層級adadasdasdasdasdasd1層級adadasdasdasdasdasd1層級adadasdasdasdasdasd1',
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

  const isMobile = useIsMobile()

  return (
    <div className={clsx('flex', `${isMobile ? '' : 'w-[90%] mt-4'}`)}>
      <div className='font-bold text-xl flex items-center text-gray-500'>
        {isMobile ? (
          <>
            {current_folder_copy.length > 0 && (
              <div className='flex items-center'>
                <MdKeyboardArrowRight
                  className={clsx('w-8 h-8 mr-2 rotate-180')}
                />
                <BreadCrumbMobile
                  folderInfo={current_folder_copy}
                  isLastOne={false}
                />
              </div>
            )}
          </>
        ) : (
          <>
            <span
              className={`hover:cursor-pointer max-w-[160px] hover:bg-slate-200 px-3 rounded-lg truncate select-none font-bold py-1`}
            >
              我的 Kushare
            </span>
            {current_folder_copy.length > 0 ? (
              current_folder_copy.map((e) => (
                <BreadCrumb folderInfo={e} isLastOne={false} />
              ))
            ) : (
              <BreadCrumbBackBone />
            )}
          </>
        )}
      </div>
    </div>
  )
}
