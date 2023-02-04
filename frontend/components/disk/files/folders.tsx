import clsx from 'clsx'
import { Folder } from 'public/icon/disk'
import { FormatProp, SelectionValue } from 'hooks/disk/type'
import { ListMethod } from 'hooks/disk/type'
import { useRecoilValue } from 'recoil'
import { folderInitState } from 'context/folder'

interface FolderProps extends FormatProp {
  id: number
  folderName: string
}

export default function Folders(props: FormatProp) {
  const folders = useRecoilValue(folderInitState)
  const { listMethod } = props
  return (
    <div className='flex flex-col xs:flex-row xs:flex-wrap w-full items-center'>
      {folders.map((e) => (
        <FolderElement
          id={e.id}
          listMethod={listMethod}
          folderName={e.name}
          key={`folder_index_${e.id}`}
          // selected={selected.has(`selectable-${e.id}`)}
          // dragged={dragged.has(`selectable-${e.id}`)}
        />
      ))}
    </div>
  )
}

function FolderElement(props: FolderProps) {
  const { id, listMethod, folderName } = props

  return (
    <div
      className={clsx(
        'flex hover:bg-slate-200 cursor-pointer h-12 justify-between',
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%] border-2 md:ml-0 xs:mr-4 mb-2'
            : 'w-full'
        }`,
        // `${selected ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
        // `${dragged ? 'opacity-70' : 'opacity-100'}`,
        `${listMethod === ListMethod.Lattice ? 'rounded-lg' : 'border-b-2'}`
      )}
    >
      <div className='flex'>
        <Folder
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
          {folderName}
        </div>
      </div>
      {listMethod === ListMethod.Lattice ? (
        <></>
      ) : (
        <div className='w-[400px] py-3 px-2 text-gray-400 text-right hidden md:block'>
          2022年 12月 24日
        </div>
      )}
    </div>
  )
}