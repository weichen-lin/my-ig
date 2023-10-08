import clsx from 'clsx'
import { useRecoilState } from 'recoil'
import { breadcrumbState } from 'store'

import { useIsMobile } from 'hooks/disk'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFetch, getBreadCrumb } from 'api'
import { Icon } from '@iconify/react'

interface Folder {
  id: string
  name: string
}

const BreadCrumbMobile = (props: { folderInfo: Folder[]; isLastOne: boolean }) => {
  const { folderInfo } = props

  const lastone = folderInfo.length > 0 ? folderInfo.pop() : null

  return (
    <div className='max-w-[160px] hover:bg-slate-200 px-3 rounded-lg truncate select-none font-bold'>
      {lastone && lastone?.name}
    </div>
  )
}

const BreadCrumbBackBone = (props: { isMobile: boolean }) => {
  const { isMobile } = props

  return (
    <div className='flex items-center flex-1 px-3'>
      {!isMobile && (
        <span
          className={`hover:cursor-pointer max-w-[160px] hover:bg-slate-200 pr-3 rounded-lg truncate select-none font-bold py-1 my-2`}
        >
          我的 Kushare
        </span>
      )}
      <Icon icon='ic:baseline-chevron-right' className='w-6 h-6' fill={'gray'} />
      <div className='ml-4 xss:w-[100px] xs:w-[150px] md:w-[200px] h-9 bg-gray-300/20 animate-pulse rounded-2xl'></div>
    </div>
  )
}

const BreadCrumbDisplay = (props: { isMobile: boolean; data: Folder[] }) => {
  const { isMobile, data } = props
  const router = useRouter()

  const atRoot = data?.length === 0

  const BreadCrumb = (props: { folderInfo: Folder; isLastOne: boolean }) => {
    const { folderInfo, isLastOne } = props

    return (
      <div className='hover:cursor-pointer flex flex-1 items-center'>
        <Icon icon='ic:baseline-chevron-right' className='w-6 h-6' fill={'gray'} />
        <span
          className='max-w-[160px] hover:bg-slate-200 px-3 rounded-lg truncate select-none font-bold py-1'
          onClick={async () => {
            if (isLastOne) return
            await router.push(`/home?f=${folderInfo.id}`, undefined, {
              shallow: false,
            })
          }}
        >
          {folderInfo.name}
        </span>
      </div>
    )
  }

  return isMobile ? (
    <>
      {data?.length > 0 && (
        <div className='flex items-center'>
          <Icon icon='ic:baseline-chevron-right' className={clsx('w-8 h-8 mr-2 rotate-180')} />
          <BreadCrumbMobile folderInfo={data} isLastOne={false} />
        </div>
      )}
    </>
  ) : (
    <>
      <span
        className={clsx(
          'max-w-[160px] px-3 rounded-lg truncate select-none font-bold my-2 py-1',
          `${!atRoot && 'hover:cursor-pointer hover:bg-slate-200'}`
        )}
        onClick={async () => {
          await router.push('/home')
        }}
      >
        我的 Kushare
      </span>
      {data?.length > 0 && data.map((e) => <BreadCrumb folderInfo={e} isLastOne={false} key={`folder_${e.id}`} />)}
    </>
  )
}

export default function BreadCrumbs() {
  const router = useRouter()
  const { isMobile } = useIsMobile()
  const { data, isLoading, run } = useFetch(getBreadCrumb)
  const [breadcrumbs, setBreadCrumbs] = useRecoilState(breadcrumbState)

  useEffect(() => {
    const f = (router.query.f ?? null) as string | null
    if (!f) {
      setBreadCrumbs((e) => ({ ...e, breadcrumbs: [], isLoading: false }))
      return
    }
    run(f)
  }, [router.query.f])

  useEffect(() => {
    const f = (router.query.f ?? null) as string | null
    console.log('triggered', f)
    if (!f) {
      setBreadCrumbs((e) => ({ ...e, breadcrumbs: [], isLoading: false }))
      return
    }

    setBreadCrumbs((e) => ({ ...e, breadcrumbs: data, isLoading: false }))
  }, [data])

  console.log({ breadcrumbs: breadcrumbs.breadcrumbs })

  return (
    <div className={clsx('flex', `${isMobile ? '' : 'w-[90%] mt-3'}`)}>
      <div className='font-bold text-xl flex items-center text-gray-500'>
        {isLoading ? (
          <BreadCrumbBackBone isMobile={isMobile} />
        ) : (
          <BreadCrumbDisplay isMobile={isMobile} data={breadcrumbs.breadcrumbs} />
        )}
      </div>
    </div>
  )
}
