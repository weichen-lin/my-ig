import clsx from 'clsx'
import { Folder } from 'public/icon/disk'
import { FormatProp } from 'hooks/disk/type'
import { ListMethod } from 'hooks/disk/useDisk'

interface FolderProps extends FormatProp {
  id: number
  folderName: string
  selected: boolean
  dragged: boolean
}

export default function FolderTypeElement(props: FolderProps) {
  const { id, listMethod, folderName, selected, dragged } = props

  return (
    <div
      className={clsx(
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[200px] lg:w-[225px] flex-col border-2'
            : 'w-full'
        }`,
        'rounded-lg h-[48px] relative',
        'cursor-pointer truncate',
        'transition-all duration-200 ease-out',
        'selectable',
        `${selected ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
        `${dragged ? 'opacity-70' : 'opacity-100'}`
      )}
      data-key={`selectable-${id}`}
    >
      <div className='flex'>
        <Folder
          className={clsx(
            `${listMethod === ListMethod.Lattice ? 'w-9 p-2 ml-2' : 'h-6 m-3'}`,
            'transition-all duration-300 ease-out'
          )}
        />
        <div className='flex-1 text-base py-[10px] px-2 truncate'>
          {folderName}
        </div>
      </div>
      <div
        className={clsx(
          'absolute h-[2px] w-full bg-slate-100 bottom-0',
          `${listMethod === ListMethod.Lattice ? 'hidden' : ''}`
        )}
      ></div>
    </div>
  )
}
