import clsx from 'clsx'
import {
  FormatProp,
  ListMethod,
  SelectionValue,
  SelectionStringList,
} from 'hooks/disk'
import { FileData } from 'context/type'
import { FcFolder } from 'react-icons/fc'

interface FilesProps extends FormatProp, SelectionStringList {
  files: FileData[]
  handleImageDisplay: (e: string) => void
}

interface FileProps extends FormatProp, SelectionValue {
  fileInfo: FileData
  handleImageDisplay: (e: string) => void
}

export default function Files(props: FilesProps) {
  const { listMethod, files, handleImageDisplay, selected, dragged } = props

  return (
    <div className='flex flex-col xs:flex-row xs:flex-wrap w-full gap-x-4 mx-auto items-center'>
      {files?.map((e) => (
        <FileElement
          listMethod={listMethod}
          fileInfo={e}
          isSelected={selected.has(`selectable-file-${e.id}`)}
          isDragged={dragged.has(`selectable-file-${e.id}`)}
          handleImageDisplay={handleImageDisplay}
          key={`file_${e.id}`}
        />
      ))}
    </div>
  )
}

export function FileElement(props: FileProps) {
  const { fileInfo, listMethod, handleImageDisplay, isSelected, isDragged } =
    props
  const { id, url, name, last_modified_at } = fileInfo

  return (
    <div
      className={clsx(
        'flex cursor-pointer',
        'transition-all duration-100 ease-out',
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%] mb-4'
            : 'w-full flex-col'
        }`
      )}
    >
      {listMethod === ListMethod.Lattice ? <LatticeFile /> : <ListFile />}
    </div>
  )
}

const LatticeFile = () => {
  return (
    <div
      className={clsx(
        'flex flex-col w-full h-[200px] justify-between rounded-lg items-center',
        'border-2',
        `${false ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
        `${false ? 'opacity-50' : 'opacity-100'}`,
        'selectable LIST'
      )}
    >
      <div className={clsx('overflow-hidden', 'h-full')}>
        <img
          className='min-h-[160px] min-w-full'
          src='https://cfcdn.apowersoft.info/projects/picwish/img/compress/compress.jpg'
          draggable={false}
        ></img>
      </div>
      <div className='truncate px-2 w-[200px] text-center h-8 my-2'>
        TESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILE
      </div>
    </div>
  )
}

const ListFile = () => {
  const date = new Date()
  return (
    <div
      className={clsx(
        'flex cursor-pointer items-center border-b-2',
        'w-full h-12',
        `${false ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
        `${false ? 'opacity-50' : 'opacity-100'}`,
        'selectable'
      )}
    >
      <div className={clsx('overflow-hidden', 'h-6 LIST')}>
        <img
          className='h-6 w-6 mx-2'
          src={
            'https://briian.com/wp-content/uploads/2014/08/%E5%9C%96%E7%89%87%E8%A3%81%E5%88%87%E6%90%9C%E5%B0%8B.png'
          }
          draggable={false}
        ></img>
      </div>
      <div className='truncate flex-1 px-4'>
        TESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILETESTFILE
      </div>
      <div className='w-[200px] px-2 text-gray-400 text-right hidden md:block'>
        {handleTime(date.toISOString())}
      </div>
    </div>
  )
}

const handleTime = (e: string) => {
  const date = new Date(e) ?? new Date()
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`
}
