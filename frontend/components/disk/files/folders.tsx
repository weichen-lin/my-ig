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
    <div className='flex flex-col xs:flex-row xs:flex-wrap w-full gap-x-4 mx-auto items-center'>
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
    await router.push(`/home?f=${folderInfo.folder_id}`, undefined, { shallow: false })
    // refresh()
  }

  const onClick = () => {
    console.log('single click')
    setIsSelect((prev) => !prev)
  }

  const { handleClick } = useSingleAndDoubleClick(onClick, onDoubleClick)

  return (
    <div
      className={clsx(
        'flex transition-all duration-100 ease-in-out',
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%] mb-4'
            : 'w-full flex-col'
        }`
      )}
      onClick={handleClick}
    >
      <div
        className={clsx(
          'flex w-full h-12 justify-between rounded-lg items-center',
          'hover:bg-slate-200 cursor-pointer',
          `${isSelect ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
          `${false ? 'opacity-50' : 'opacity-100'}`,
          'selectable LIST',
          `${listMethod === ListMethod.Lattice ? 'border-2' : 'border-b-2'}`
        )}
      >
        <FcFolder className='w-6 h-6 mx-2' />
        <div className='flex-1 pr-1 truncate'>{folder_name}</div>
        {listMethod === ListMethod.List && (
          <div className='w-[200px] px-4 text-gray-400 text-right hidden md:block DATE'>
            {handleTime(last_modified_at)}
          </div>
        )}
      </div>
    </div>
  )
}

export const LatticeFolderBackbone = () => {
  return (
    <div
      className={clsx(
        'flex w-full h-12 justify-start rounded-lg items-center cursor-wait',
        'border-2 animate-pulse border-slate-100'
      )}
    >
      <div className='w-6 h-6 mx-2 bg-slate-100 rounded-md'></div>
      <div className='w-[140px] h-2/3 bg-slate-100 rounded-md'></div>
    </div>
  )
}

const handleTime = (e: string) => {
  const date = new Date(e) ?? new Date()
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`
}
