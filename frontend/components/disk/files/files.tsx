import clsx from 'clsx'
import {
  FormatProp,
  ListMethod,
  SelectionValue,
  SelectionStringList
} from 'hooks/disk'
import { FileData } from 'context/type'

interface FilesProps extends FormatProp {
  files: FileData[]
  handleImageDisplay: (e: string) => void
}

interface FileProps extends FormatProp {
  fileInfo: FileData
  handleImageDisplay: (e: string) => void
}

export default function Files(props: FilesProps) {
  const { listMethod, files, handleImageDisplay } = props

  return (
    <div className='flex flex-col xs:flex-row xs:flex-wrap w-full items-center'>
      {files?.map((e) => (
        <FileElement
          listMethod={listMethod}
          fileInfo={e}
          // selected={selected.has(`selectable-${e.id}`)}
          // dragged={dragged.has(`selectable-${e.id}`)}
          handleImageDisplay={handleImageDisplay}
          key={`file_${e.id}`}
        />
      ))}
    </div>
  )
}

export function FileElement(props: FileProps) {
  const { fileInfo, listMethod, handleImageDisplay } = props
  const { id, url, name, last_modified_at } = fileInfo

  return (
    <div
      className={clsx(
        'flex cursor-pointer md:ml-0',
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%] h-[200px] flex-col border-2 xs:mr-4 xs:mb-2 mb-4'
            : 'w-full h-12'
        }`,
        // `${selected ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
        // `${dragged ? 'opacity-70' : 'opacity-100'}`,
        `${listMethod === ListMethod.Lattice ? 'rounded-lg' : 'border-b-2'}`
      )}
      onDoubleClick={() => handleImageDisplay(id)}
    >
      <div
        className={clsx(
          'w-full h-[200px] flex',
          `${listMethod === ListMethod.Lattice ? 'flex-col' : 'flex-row'}`,
          'relative rounded-lg',
          'transition-all duration-200 ease-out',
          'selectable'
        )}
        data-key={`selectable-${id}`}
      >
        <div
          className={clsx(
            'overflow-hidden',
            `${
              listMethod === ListMethod.Lattice
                ? 'rounded-t-lg h-full'
                : 'rounded-md h-6 m-3'
            }`
          )}
        >
          <img
            className={`${
              listMethod === ListMethod.Lattice
                ? 'min-h-[160px] min-w-full'
                : 'h-full min-w-[24px] max-w-[24px]'
            }`}
            src={url}
            draggable={false}
          ></img>
        </div>
        <div
          className={clsx(
            'truncate px-2',
            `${
              listMethod === ListMethod.Lattice
                ? 'text-center h-8 my-2'
                : 'text-left h-9 my-3'
            }`
          )}
        >
          {name}
        </div>
      </div>
      {listMethod === ListMethod.Lattice ? (
        <></>
      ) : (
        <div className='w-[400px] py-3 px-2 text-gray-400 text-right hidden md:block'>
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
