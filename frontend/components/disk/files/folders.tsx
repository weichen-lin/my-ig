import clsx from 'clsx'
import { FolderIcon } from 'public/icon/disk'
import {
  FormatProp,
  SelectionValue,
  ListMethod,
  SelectionStringList
} from 'hooks/disk'
import { FolderData } from 'context/type'

interface FoldersProps extends FormatProp, SelectionStringList {
  folders: FolderData[]
  handleCurrentFolder: (e: string) => void
  selected: Set<string>
}

interface FolderProps extends FormatProp, SelectionValue {
  folderInfo: FolderData
  handleCurrentFolder: (e: string) => void
}

export default function Folders(props: FoldersProps) {
  const { listMethod, folders, handleCurrentFolder, selected, dragged } = props

  return (
    <div className='flex flex-col xs:flex-row xs:flex-wrap w-full items-center'>
      {folders?.map((e) => (
        <FolderElement
          folderInfo={e}
          listMethod={listMethod}
          key={`folder_index_${e.id}`}
          handleCurrentFolder={handleCurrentFolder}
          isSelected={selected.has(`selectable-folder-${e.id}`)}
          isDragged={dragged.has(`selectable-folder-${e.id}`)}
        />
      ))}
    </div>
  )
}

function FolderElement(props: FolderProps) {
  const { folderInfo, listMethod, handleCurrentFolder, isSelected, isDragged } =
    props
  const { id, name, last_modified_at } = folderInfo

  return (
    <div
      className={clsx(
        'flex hover:bg-slate-200 cursor-pointer h-12 justify-between',
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%] border-2 md:ml-0 xs:mr-4 mb-2'
            : 'w-full'
        }`,
        `${isSelected ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
        `${isDragged ? 'opacity-50' : 'opacity-100'}`,
        `${
          listMethod === ListMethod.Lattice ? 'rounded-lg' : 'border-b-2 LIST'
        }`,
        'selectable'
      )}
      onDoubleClick={() => {
        handleCurrentFolder(name)
      }}
      data-key={`selectable-folder-${id}`}
    >
      <div className='flex selectable'>
        <FolderIcon
          className={clsx(
            `${listMethod === ListMethod.Lattice ? 'w-9 p-2' : 'h-6 m-3'}`,
            'transition-all duration-300 ease-out'
          )}
        />
        <div
          className={clsx(
            'flex-1 text-base py-[10px] px-2 truncate',
            'max-w-[200px] xs:max-w-[140px] md:max-w-[180px] lg:max-w-[170px]'
          )}
        >
          {name}
        </div>
      </div>
      {listMethod === ListMethod.Lattice ? (
        <></>
      ) : (
        <div className='w-[400px] py-3 px-2 text-gray-400 text-right hidden md:block DATE'>
          {handleTime(last_modified_at)}
        </div>
      )}
    </div>
  )
}

const handleTime = (e: string) => {
  const date = new Date(e) ?? new Date()
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`
}
