import clsx from 'clsx'
import { Folder } from 'public/icon/disk'
import { FileType, FormatProp } from 'hooks/disk/type'
import { ListMethod } from 'hooks/disk/useDisk'
import ReactDom from 'react'

interface FolderProps extends FormatProp {
  id: number
  folderName: string
  isOnDrag: boolean
  isDragHovered: boolean
  isBeingDragged: boolean
  handleOndrag: (dragFileType: number, y: number) => void
  handleDragEnter: (dragHoverdFileType: number, dragHoverdFile: number) => void
  handleDragEnd: (dragFileType: number) => void
}

export default function FolderTypeElement(props: FolderProps) {
  const {
    id,
    listMethod,
    folderName,
    isOnDrag,
    isDragHovered,
    isBeingDragged,
    handleOndrag,
    handleDragEnter,
    handleDragEnd,
  } = props

  return (
    <div
      className={clsx(
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[200px] lg:w-[225px] flex-col border-2'
            : 'w-full'
        }`,
        // `${isBeingDragged ? 'lg:w-0 border-none -ml-[24px]' : ''}`,
        `${isBeingDragged ? 'opacity-70' : ''}`,
        `${isOnDrag ? 'hover:bg-white' : ''}`,
        `${isDragHovered ? 'bg-blue-200' : ''}`,
        'rounded-lg h-[48px] relative',
        'cursor-pointer truncate',
        'transition-all duration-200 ease-out',
        'hover:bg-slate-200'
      )}
      draggable
      onDragStart={() => {
        handleOndrag(FileType.Folder, id)
      }}
      onDragEnter={() => {
        handleDragEnter(FileType.Folder, id)
      }}
      onDragEnd={() => {
        handleDragEnd(FileType.Folder)
      }}
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
