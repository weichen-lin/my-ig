import clsx from 'clsx'

import type { DiskProps, DatetimeProps } from 'hooks/disk'
import { CurrentFolder } from 'context'

import { MdKeyboardArrowRight } from 'react-icons/md'

import { useIsMobile } from 'hooks/disk'
import { useState, useEffect } from 'react'
import fetcher from 'api/fetcher'
import Router from 'next/router'

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

const BreadCrumbBackBone = (props: { isMobile: boolean }) => {
  const { isMobile } = props

  return (
    <div className='flex items-center flex-1'>
      {!isMobile && (
        <span
          className={`hover:cursor-pointer max-w-[160px] hover:bg-slate-200 pr-3 rounded-lg truncate select-none font-bold py-1`}
        >
          我的 Kushare
        </span>
      )}
      <MdKeyboardArrowRight className='w-6 h-6' fill={'gray'} />
      <div className='ml-4 xss:w-[100px] xs:w-[150px] md:w-[200px] h-9 bg-gray-300/20 animate-pulse rounded-2xl'></div>
    </div>
  )
}

interface SortProps extends Pick<DiskProps, 'sortProps'> {
  isLoading: boolean
}

const BreadCrumbDisplay = (props: {
  isMobile: boolean
  layerFolder: CurrentFolder[]
}) => {
  const { isMobile, layerFolder } = props

  return isMobile ? (
    <>
      {layerFolder.length > 0 && (
        <div className='flex items-center'>
          <MdKeyboardArrowRight className={clsx('w-8 h-8 mr-2 rotate-180')} />
          <BreadCrumbMobile folderInfo={layerFolder} isLastOne={false} />
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
      {layerFolder.length > 0 &&
        layerFolder.map((e) => <BreadCrumb folderInfo={e} isLastOne={false} />)}
    </>
  )
}

export default function BreadCrumbs(props: SortProps) {
  const { sortProps } = props
  const { current_folder, handleBreadChangeFolder } = sortProps

  const [breadcrumbs, setBreadCrumbs] = useState([])
  const [isFetch, setIsFetch] = useState(false)
  const { isMobile } = useIsMobile()

  useEffect(() => {
    const getBreadCrumb = async () => {
      try {
        const res = await fetcher.get('/disk/breadcrumb')
        if (res.status === 200) {
          const breadcrumbs = res.data
          setIsFetch(false)
          setBreadCrumbs(breadcrumbs)
        }
      } catch {
        Router.push('login')
      }
    }

    getBreadCrumb()
  }, [])

  return (
    <div className={clsx('flex', `${isMobile ? '' : 'w-[90%] mt-8'}`)}>
      <div className='font-bold text-xl flex items-center text-gray-500'>
        {isFetch ? (
          <BreadCrumbBackBone isMobile={isMobile} />
        ) : (
          <BreadCrumbDisplay isMobile={isMobile} layerFolder={breadcrumbs} />
        )}
      </div>
    </div>
  )
}
