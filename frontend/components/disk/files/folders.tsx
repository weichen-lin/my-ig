import clsx from 'clsx'
import { FcFolder } from 'react-icons/fc'
import {
  FormatProp,
  SelectionValue,
  ListMethod,
  SelectionStringList,
} from 'hooks/disk'
import { FolderData, CurrentFolder } from 'context'
import type { HoverHandler } from 'hooks/disk/useGdrive'
import { ListBackBone } from 'components/disk/files/listbackbone'

interface FolderBase extends FormatProp, HoverHandler {
  handleCurrentFolder: (e: CurrentFolder) => void
}

interface FoldersProps extends FolderBase, SelectionStringList {
  folders: FolderData[]
  selected: Set<string>
}

interface FolderProps extends FolderBase, SelectionValue {
  folderInfo: FolderData
}

export default function Folders(props: FoldersProps) {
  const {
    listMethod,
    folders,
    handleCurrentFolder,
    selected,
    dragged,
    hoverHandler,
  } = props
  return (
    <div className='flex flex-col xs:flex-row xs:flex-wrap w-full gap-x-4 mx-auto items-center'>
      {folders?.map((e) => (
        <FolderElement
          folderInfo={e}
          listMethod={listMethod}
          key={`folder_index_${e.id}`}
          handleCurrentFolder={handleCurrentFolder}
          isSelected={selected.has(`selectable-folder-${e.id}`)}
          isDragged={dragged.has(`selectable-folder-${e.id}`)}
          hoverHandler={hoverHandler}
        />
      ))}
    </div>
  )
}

function FolderElement(props: FolderProps) {
  const {
    folderInfo,
    listMethod,
    handleCurrentFolder,
    hoverHandler,
    isSelected,
    isDragged,
  } = props
  const { id, name, last_modified_at } = folderInfo

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
      {listMethod === ListMethod.Lattice ? (
        <LatticeFolderBackbone />
      ) : (
        <ListBackBone />
      )}
    </div>
  )
}

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
      <div className='flex-1 px-1 truncate'>
        FOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDER
      </div>
    </div>
  )
}

const ListFolder = () => {
  const data = new Date()
  return (
    <div
      className={clsx(
        'flex h-12 items-center w-full',
        'hover:bg-slate-200 cursor-pointer opacity-100 border-b-2',
        'selectable LIST'
      )}
    >
      <FcFolder className='w-6 h-6 mx-2' />
      <div className='flex-1 truncate px-4'>
        FOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDERFOLDER
      </div>
      <div className='w-[200px] px-2 text-gray-400 text-right hidden md:block DATE'>
        {handleTime(data.toISOString())}
      </div>
    </div>
  )
}

const LatticeFolderBackbone = () => {
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
