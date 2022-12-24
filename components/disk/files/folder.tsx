import clsx from 'clsx'
import { Folder } from 'public/icon/disk'
import { FolderProps } from 'components/disk/files/type'
import { ListMethod } from 'hooks/disk/useDisk'

export default function FolderTypeElement(props: FolderProps) {
  const { listMethod, folderName } = props

  return (
    <div
      className={clsx(
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[200px] lg:w-[225px] flex-col border-2'
            : 'w-full'
        }`,
        'rounded-lg h-[48px] relative',
        'cursor-pointer',
        'transition-all duration-200 ease-out',
        'hover:bg-slate-200'
      )}
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
