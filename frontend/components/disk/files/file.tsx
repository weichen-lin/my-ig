import clsx from 'clsx'
import { FormatProp, ListMethod, SelectionValue } from 'hooks/disk/type'
import { useImageDisplay } from 'hooks/disk'

export interface FilesProps extends FormatProp, SelectionValue {
  id: number
  imgUrl: string | undefined
  fileName: string
  index: number
  handleImageDisplay: (e: number) => void
}

export default function FileTypeElement(props: FilesProps) {
  const {
    id,
    listMethod,
    imgUrl,
    fileName,
    selected,
    dragged,
    index,
    handleImageDisplay
  } = props

  return (
    <div
      className={clsx(
        'flex cursor-pointer md:ml-0',
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%] h-[200px] flex-col border-2 xs:mr-4 xs:mb-2 mb-4'
            : 'w-full h-12'
        }`,
        `${selected ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
        `${dragged ? 'opacity-70' : 'opacity-100'}`,
        `${listMethod === ListMethod.Lattice ? 'rounded-lg' : 'border-b-2'}`
      )}
      onDoubleClick={() => handleImageDisplay(index - 1)}
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
            'overflow-hidden bg-yellow-200',
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
            src={imgUrl}
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
          {fileName}
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
