import clsx from 'clsx'
import { CommonProps, ListMethod, SelectedState, DragState } from 'store'
import { useSingleAndDoubleClick } from 'hooks/utils'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { useContextMenu, useDrag } from 'hooks/disk'
import { useRecoilValue, useResetRecoilState, useRecoilState } from 'recoil'

interface FolderProps {
  info: CommonProps
  method: ListMethod
}

export function Folder(props: FolderProps) {
  const { info, method } = props
  const { id, name, lastModifiedAt } = info
  const router = useRouter()

  const selected = useRecoilValue(SelectedState)
  const reset = useResetRecoilState(SelectedState)

  const { open, select } = useContextMenu()
  const { dragState, setTargetFolder } = useDrag()
  const { isDrag, targetFolder } = dragState

  const onDoubleClick = async () => {
    reset()
    await router.push(`/home?f=${info.id}`, undefined, {
      shallow: false,
    })
  }

  const { handleClick } = useSingleAndDoubleClick(() => {}, onDoubleClick)

  const isSelect = selected.folders.includes(id)

  return (
    <div
      className={clsx(
        'flex transition-all duration-300 ease-in-out selectable',
        `${
          method === ListMethod.Lattice
            ? 'mb-4 w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%]'
            : 'w-full flex-col'
        }`,
      )}
      onClick={handleClick}
      onContextMenu={e => {
        open(e.clientX, e.clientY, () => {
          select('folders', id)
        })
      }}
      data-key={`folder-${id}`}
      onMouseEnter={() => {
        if (isSelect || !isDrag) return
        setTargetFolder(id)
      }}
      onMouseLeave={() => {
        if (isSelect || !isDrag) return
        setTargetFolder(null)
      }}
    >
      <div
        className={clsx(
          'flex h-12 w-full cursor-pointer items-center justify-between rounded-lg',
          `${isSelect ? 'border-[1px] border-blue-400 bg-blue-200/70' : 'hover:bg-slate-200'}`,
          `${isDrag && targetFolder === id && !isSelect && 'border-[2px] border-slate-700 cursor-move'}`,
          'transition-all duration-300 ease-in-out',
          `${method === ListMethod.Lattice ? 'border-2' : 'rounded-none mb-[1px]'}`,
          `${false ? 'opacity-50' : 'opacity-100'}`,
        )}
      >
        <Icon icon='ic:round-folder' color='#F8D775' className='mx-2 h-6 w-6' />
        <div className='flex-1 truncate px-2 pr-1'>{name}</div>
        {method === ListMethod.List && (
          <div className='hidden w-[200px] px-3 text-sm text-right text-gray-400 md:block'>
            {handleTime(lastModifiedAt)}
          </div>
        )}
      </div>
    </div>
  )
}

export const FolderBackbone = () => {
  return (
    <div
      className={clsx(
        'flex h-12 w-full cursor-wait items-center justify-start rounded-lg',
        'animate-pulse border-2 border-slate-100',
      )}
    >
      <div className='mx-2 h-6 w-6 rounded-md bg-slate-100'></div>
      <div className='h-2/3 w-[calc(100%-48px)] rounded-md bg-slate-100'></div>
    </div>
  )
}

const handleTime = (e: string) => {
  const date = new Date(e) ?? new Date()
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
