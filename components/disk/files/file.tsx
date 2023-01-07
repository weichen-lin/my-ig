import clsx from 'clsx'
import { FormatProp, ListMethod } from 'hooks/disk/type'

export interface FilesProps extends FormatProp {
  id: number
  imgUrl: string | undefined
  fileName: string
}

export default function FileTypeElement(props: FilesProps) {
  const { id, listMethod, imgUrl, fileName, selected, dragged } = props

  return (
    <div
      className={clsx(
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[200px] lg:w-[225px] h-[200px] lg:h-[225px] flex-col border-2'
            : 'w-full h-12'
        }`,
        'flex cursor-pointer rounded-lg relative',
        'transition-all duration-200 ease-out',
        `${selected ? 'bg-blue-100' : 'hover:bg-slate-200'}`,
        `${dragged ? 'opacity-70' : 'opacity-100'}`,
        'selectable'
      )}
      data-key={`selectable-${id}`}
    >
      <div
        className={clsx(
          'overflow-hidden rounded-t-lg h-full',
          `${listMethod === ListMethod.Lattice ? 'm-auto' : 'w-6 h-6 m-3'}`
        )}
      >
        <img src={imgUrl} draggable={false}></img>{' '}
      </div>
      <div
        className={clsx(
          'truncate py-[10.5px] grow px-2 border-t-2',
          `${listMethod === ListMethod.Lattice ? 'text-center' : 'text-left'}`
        )}
      >
        {fileName}
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
