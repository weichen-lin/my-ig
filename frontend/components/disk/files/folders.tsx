import clsx from 'clsx'
import { ListMethod } from 'store'
import { FormatProp, SelectionValue, SelectionStringList } from 'hooks/disk'
import { FolderData } from 'context'
import { ListBackBone } from 'components/disk/files/listbackbone'
import { useState } from 'react'
import { useSingleAndDoubleClick } from 'hooks/utils'
import { useRouter } from 'next/router'
import { Icon } from '@iconify/react'
import { useContextMenu } from 'hooks/disk'

interface CommonProps {
  id: string
  name: string
  lastModifiedAt: string
}

export function Folder(props: { info: CommonProps; method: ListMethod }) {
  const { info, method } = props
  const { name, lastModifiedAt } = info
  const [isSelect, setIsSelect] = useState(false)
  const router = useRouter()

  const { open } = useContextMenu()

  const onDoubleClick = async () => {
    await router.push(`/home?f=${info.id}`, undefined, {
      shallow: false,
    })
  }

  const onClick = () => {
    setIsSelect(prev => !prev)
  }

  const { handleClick } = useSingleAndDoubleClick(onClick, onDoubleClick)

  return (
    <div
      className={clsx(
        'flex transition-all duration-300 ease-in-out',
        `${
          method === ListMethod.Lattice
            ? 'mb-4 w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%]'
            : 'w-full flex-col'
        }`,
      )}
      onClick={handleClick}
      onContextMenu={e => {
        e.preventDefault()
        open(e.clientX, e.clientY, () => {
          setIsSelect(true)
        })
      }}
    >
      <div
        className={clsx(
          'flex h-12 w-full cursor-pointer items-center justify-between rounded-lg',
          `${isSelect ? 'border-[1px] border-blue-400 bg-blue-200/70' : 'hover:bg-slate-200'}`,
          'transition-all duration-300 ease-in-out',
          `${method === ListMethod.Lattice ? 'border-2' : 'rounded-none border-b-2'}`,
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
