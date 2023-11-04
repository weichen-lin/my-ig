import clsx from 'clsx'
import { useIsMobile } from 'hooks/disk'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { useBreadCrumb } from 'hooks/disk'
import { Breadcrumb } from 'store'

const BreadCrumbMobile = (props: { info: Breadcrumb[] }) => {
  const { info } = props

  const lastone = info?.length > 0 ? info[info.length - 1] : null

  return (
    <div className='max-w-[160px] hover:bg-slate-200 px-3 rounded-lg truncate select-none font-semibold'>
      {lastone && lastone?.name}
    </div>
  )
}

const BreadCrumbBackBone = (props: { isMobile: boolean }) => {
  const { isMobile } = props

  return (
    <div className='flex items-center justify-center py-1 gap-x-2'>
      {!isMobile && <span className='select-none'>我的 Kushare</span>}
      <Icon icon='ic:baseline-chevron-right' className='w-6 h-6' fill='gray' />
      <div className='xss:w-[100px] xs:w-[150px] md:w-[200px] h-9 bg-gray-300/20 animate-pulse rounded-2xl'></div>
    </div>
  )
}

const BreadCrumbDisplay = (props: { isMobile: boolean; data: Breadcrumb[] }) => {
  const { isMobile, data } = props
  const router = useRouter()

  const atRoot = data?.length === 0

  const BreadCrumb = (props: { info: Breadcrumb; isLastOne: boolean }) => {
    const { info, isLastOne } = props

    return (
      <div className='hover:cursor-pointer flex items-center'>
        <Icon icon='ic:baseline-chevron-right' className='w-6 h-6' fill='gray' />
        <span
          className='hover:bg-slate-100 px-3 rounded-lg truncate select-none font-bold py-1'
          onClick={async () => {
            if (isLastOne) return
            await router.push(`/home?f=${info.id}`, undefined, {
              shallow: false,
            })
          }}
        >
          {info.name}
        </span>
      </div>
    )
  }

  const handleMobileBack = async () => {
    if (Array.isArray(data) && data.length > 0) {
      if (data.length === 1) {
        await router.push('/home')
      } else {
        router.push(`/home?f=${data[data.length - 2].id}`)
      }
    }
  }

  const breads = Array.isArray(data) && data.length > 0 ? data.slice().sort((a, b) => a.depth - b.depth) : []

  return isMobile ? (
    <div className='flex items-center'>
      <Icon icon='ic:baseline-chevron-right' className='w-8 h-8 mr-2 rotate-180' onClick={() => handleMobileBack()} />
      <BreadCrumbMobile info={breads} />
    </div>
  ) : (
    <>
      <span
        className={clsx(
          'max-w-[160px] rounded-lg truncate select-none font-semibold py-1',
          `${!atRoot && 'hover:cursor-pointer hover:text-gray-500/70'}`,
        )}
        onClick={async () => {
          await router.push('/home')
        }}
      >
        我的 Kushare
      </span>
      {breads.map(e => (
        <BreadCrumb info={e} isLastOne={false} key={`bread_${e.id}`} />
      ))}
    </>
  )
}

export default function BreadCrumbs() {
  const { isMobile } = useIsMobile()
  const { isLoading, data } = useBreadCrumb()

  return (
    <div className='text-md flex text-gray-500 text-lg'>
      {isLoading ? <BreadCrumbBackBone isMobile={isMobile} /> : <BreadCrumbDisplay isMobile={isMobile} data={data} />}
    </div>
  )
}
