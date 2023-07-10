import clsx from 'clsx'
import { CurrentFolder } from 'context'

import { MdKeyboardArrowRight } from 'react-icons/md'

import { useIsMobile } from 'hooks/disk'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFetch, getBreadCrumb } from 'api'

const BreadCrumb = (props: { folderInfo: CurrentFolder; isLastOne: boolean }) => {
  const { folderInfo, isLastOne } = props

  return (
    <div className='hover:cursor-pointer flex flex-1 items-center'>
      <MdKeyboardArrowRight className='w-6 h-6' fill={'gray'} />
      <span
        className='max-w-[160px] hover:bg-slate-200 px-3 rounded-lg truncate select-none font-bold py-1'
        onClick={() => {
          if (isLastOne) return
        }}
      >
        {folderInfo.folder_name}
      </span>
    </div>
  )
}

const BreadCrumbMobile = (props: { folderInfo: CurrentFolder[]; isLastOne: boolean }) => {
  const { folderInfo } = props

  const lastone = folderInfo.length > 0 ? folderInfo.pop() : null

  return (
    <div className='max-w-[160px] hover:bg-slate-200 px-3 rounded-lg truncate select-none font-bold'>
      {lastone && lastone?.folder_name}
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

const BreadCrumbDisplay = (props: { isMobile: boolean; data: CurrentFolder[] }) => {
  const { isMobile, data } = props

  return isMobile ? (
    <>
      {data.length > 0 && (
        <div className='flex items-center'>
          <MdKeyboardArrowRight className={clsx('w-8 h-8 mr-2 rotate-180')} />
          <BreadCrumbMobile folderInfo={data} isLastOne={false} />
        </div>
      )}
    </>
  ) : (
    <>
      <span
        className={`hover:cursor-pointer max-w-[160px] hover:bg-slate-200 px-3 rounded-lg truncate select-none font-bold py-1 mb-2`}
      >
        我的 Kushare
      </span>
      {data?.length > 0 && data.map((e) => <BreadCrumb folderInfo={e} isLastOne={false} />)}
    </>
  )
}

export default function BreadCrumbs() {
  const router = useRouter()
  const { isMobile } = useIsMobile()
  const { data, isLoading, run } = useFetch(getBreadCrumb)

  useEffect(() => {
    const locate_at = (router.query.f ?? null) as string | null

    run(locate_at)
  }, [])

  return (
    <div className={clsx('flex', `${isMobile ? '' : 'w-[90%] mt-8'}`)}>
      <div className='font-bold text-xl flex items-center text-gray-500'>
        {isLoading ? <BreadCrumbBackBone isMobile={isMobile} /> : <BreadCrumbDisplay isMobile={isMobile} data={data} />}
      </div>
    </div>
  )
}
