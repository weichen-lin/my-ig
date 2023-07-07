import clsx from 'clsx'
import { FcFolder } from 'react-icons/fc'
import { FormatProp, SelectionValue, ListMethod, SelectionStringList } from 'hooks/disk'
import { FolderData, CurrentFolder } from 'context'
import type { HoverHandler } from 'hooks/disk/useGdrive'
import { ListBackBone } from 'components/disk/files/listbackbone'

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

  const LatticeFolder = () => {
    return (
      <div
        className={clsx(
          'flex w-full h-12 justify-between rounded-lg items-center',
          'hover:bg-slate-200 border-2 cursor-pointer',
          `${false ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
          `${false ? 'opacity-50' : 'opacity-100'}`,
          'selectable LIST'
        )}
      >
        <FcFolder className='w-6 h-6 mx-2' />
        <div className='flex-1 pr-1 truncate'>{folder_name}</div>
      </div>
    )
  }

  const ListFolder = () => {
    return (
      <div
        className={clsx(
          'flex h-12 items-center w-full',
          'hover:bg-slate-200 cursor-pointer opacity-100 border-b-2',
          'selectable LIST'
        )}
      >
        <FcFolder className='w-6 h-6 mx-2' />
        <div className='flex-1 truncate px-4'>{folder_name}</div>
        <div className='w-[200px] px-4 text-gray-400 text-right hidden md:block DATE'>
          {handleTime(last_modified_at)}
        </div>
      </div>
    )
  }

  return (
    <div
      className={clsx(
        'flex',
        'transition-all duration-100 ease-out',
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%] mb-4'
            : 'w-full flex-col'
        }`
      )}
    >
      {listMethod === ListMethod.Lattice ? <LatticeFolder /> : <ListFolder />}
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
