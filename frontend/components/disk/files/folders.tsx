import clsx from 'clsx'
import { FcFolder } from 'react-icons/fc'
import { FormatProp, SelectionValue, ListMethod, SelectionStringList } from 'hooks/disk'
import { FolderData, CurrentFolder, useGdrive } from 'context'
import type { HoverHandler } from 'hooks/disk/useGdrive'
import { ListBackBone } from 'components/disk/files/listbackbone'
import { useState } from 'react'
import { useSingleAndDoubleClick } from 'hooks/utils'
import { useRouter } from 'next/router'

interface FolderInfo {
  folder_id: string
  folder_name: string
  last_modified_at: string
}

export default function Folders(props: any) {
  const { listMethod, folders, handleCurrentFolder, selected, dragged, hoverHandler } = props

  return (
    <div className='mx-auto flex w-full flex-col items-center gap-x-4 xs:flex-row xs:flex-wrap'>
      {folders?.map((e: FolderInfo) => (
        <Folder folderInfo={e} listMethod={listMethod} key={`folder_index_${e.folder_id}`} />
      ))}
    </div>
  )
}

function Folder(props: { folderInfo: FolderInfo; listMethod: ListMethod }) {
  const { folderInfo, listMethod } = props
  const { folder_name, last_modified_at } = folderInfo
  const [isSelect, setIsSelect] = useState(false)
  const router = useRouter()
  const { refresh } = useGdrive()

  const onDoubleClick = async () => {
    await router.push(`/home?f=${folderInfo.folder_id}`, undefined, {
      shallow: false,
    })
    refresh()
  }

  const onClick = () => {
    console.log('single click')
    setIsSelect((prev) => !prev)
  }

  const { handleClick } = useSingleAndDoubleClick(onClick, onDoubleClick)

  return (
    <div
      className={clsx(
        'flex transition-all duration-1000 ease-in-out',
        `${
          listMethod === ListMethod.Lattice
            ? 'mb-4 w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%]'
            : 'w-full flex-col'
        }`
      )}
      onClick={handleClick}
    >
      <div
        className={clsx(
          'flex h-12 w-full cursor-pointer items-center justify-between rounded-lg',
          `${isSelect ? 'border-[1px] border-blue-700 bg-blue-300/70' : 'hover:bg-slate-200'}`,
          'transition-all duration-300 ease-in-out',
          `${listMethod === ListMethod.Lattice ? 'border-2' : 'rounded-none border-b-2'}`,
          `${false ? 'opacity-50' : 'opacity-100'}`
        )}
      >
        <FcFolder className='mx-2 h-6 w-6' />
        <div className='flex-1 truncate px-2 pr-1'>{folder_name}</div>
        {listMethod === ListMethod.List && (
          <div className='DATE hidden w-[200px] px-4 text-right text-gray-400 md:block'>
            {handleTime(last_modified_at)}
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
        'animate-pulse border-2 border-slate-100'
      )}
    >
      <div className='mx-2 h-6 w-6 rounded-md bg-slate-100'></div>
      <div className='h-2/3 w-[140px] rounded-md bg-slate-100'></div>
    </div>
  )
}

const handleTime = (e: string) => {
  const date = new Date(e) ?? new Date()
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`
}
