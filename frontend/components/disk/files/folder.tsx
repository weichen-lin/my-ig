import clsx from 'clsx'
import { Folder } from 'public/icon/disk'
import { FormatProp, SelectionValue } from 'hooks/disk/type'
import { ListMethod } from 'hooks/disk/useDisk'

interface FolderProps extends FormatProp, SelectionValue {
  id: number
  folderName: string
}

export default function FolderTypeElement(props: FolderProps) {
  const { id, listMethod, folderName, selected, dragged } = props

  return (
    <div
      className={clsx(
        'flex hover:bg-slate-200 cursor-pointer',
        `${selected ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
        `${dragged ? 'opacity-70' : 'opacity-100'}`,
        `${listMethod === ListMethod.Lattice ? 'rounded-lg' : 'border-b-2'}`
      )}
    >
      <div
        className={clsx(
          `${
            listMethod === ListMethod.Lattice
              ? 'w-[200px] lg:w-[225px] flex-col border-2'
              : 'w-full'
          }`,
          'h-[48px] relative rounded-lg',
          'cursor-pointer truncate',
          'transition-all duration-200 ease-out',
          'selectable'
        )}
        data-key={`selectable-${id}`}
      >
        <div className='flex'>
          <Folder
            className={clsx(
              `${
                listMethod === ListMethod.Lattice ? 'w-9 p-2 ml-2' : 'h-6 m-3'
              }`,
              'transition-all duration-300 ease-out'
            )}
          />
          <div className='flex-1 text-base py-[10px] px-2 truncate'>
            {folderName}
          </div>
        </div>
      </div>
      {listMethod === ListMethod.Lattice ? (
        <></>
      ) : (
        <div className='w-[400px] p-3 text-gray-400 text-center'>
          2022年 12月 24日
        </div>
      )}
    </div>
  )
}
