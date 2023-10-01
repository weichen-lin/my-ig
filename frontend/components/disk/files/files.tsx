import clsx from 'clsx'
import { FormatProp, ListMethod, SelectionValue, SelectionStringList } from 'hooks/disk'
import { FileData } from 'context/type'
import { useState, useCallback, memo } from 'react'
import { Icon } from '@iconify/react'
import { useSingleAndDoubleClick } from 'hooks/utils'

interface FilesProps extends FormatProp, SelectionStringList {
  files: FileData[]
  handleImageDisplay: (e: string) => void
}

interface FileProps extends FormatProp {
  fileInfo: FileData
  handleImageDisplay: (e: string) => void
}

export default function Files(props: any) {
  const { listMethod, files, handleImageDisplay, selected, dragged } = props

  return (
    <div className='mx-auto flex w-full flex-col items-center gap-x-4 xs:flex-row xs:flex-wrap'>
      {files?.map((e: FileData) => (
        <File listMethod={listMethod} fileInfo={e} handleImageDisplay={handleImageDisplay} key={`file_${e.file_id}`} />
      ))}
    </div>
  )
}

Files.displayName = 'Files'

export const File = memo((props: FileProps) => {
  const { fileInfo, listMethod, handleImageDisplay } = props
  const { file_id, file_name, last_modified_at } = fileInfo
  const [isSelect, setIsSelect] = useState(false)

  const date = new Date()

  const onClick = () => {
    setIsSelect((prev) => !prev)
  }

  const onDoubleClick = () => {
    console.log('double click')
  }

  const { handleClick } = useSingleAndDoubleClick(onClick, onDoubleClick)

  const isLattice = listMethod === ListMethod.Lattice

  return (
    <div
      className={clsx(
        'flex w-full cursor-pointer items-center justify-between',
        `${isSelect ? 'border-[1px] border-blue-700 bg-blue-500/50' : 'hover:bg-slate-200'}`,
        `${false ? 'opacity-50' : 'opacity-100'}`,
        `${isLattice ? 'h-[200px] flex-col rounded-lg border-[1px] border-b-2 bg-[#f2f6fc]' : 'h-12 border-b-[1px]'}`,
        `${isLattice ? 'mb-4 w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%]' : 'mb-[1px] w-full'}`
      )}
      onClick={handleClick}
    >
      <CustomImage src={`http://localhost:8080/file/${file_id}`} listMethod={listMethod} />
      <div className={clsx('truncate', `${isLattice ? 'my-2 h-8 w-[200px] px-2 text-center' : 'flex-1 px-2'}`)}>
        {file_name}
      </div>
      {!isLattice && (
        <div className='hidden w-[200px] px-2 text-right text-gray-400 md:block'>{handleTime(date.toISOString())}</div>
      )}
    </div>
  )
})

File.displayName = 'File'

const CustomImage = (props: { src: string; listMethod: ListMethod }) => {
  const [isLoaded, setIsLoaded] = useState(true)
  const [isError, setIsError] = useState(false)
  const { src, listMethod } = props

  const handleError = useCallback(() => {
    setIsError(true)
    setIsLoaded(false)
  }, [])

  const handleLoading = useCallback(() => {
    setIsLoaded(false)
  }, [])

  return (
    <div
      className={clsx(
        'relative h-full w-full overflow-hidden border-b-[1px] border-gray-300 bg-white',
        `${listMethod === ListMethod.Lattice ? 'h-full rounded-t-lg' : 'mx-2 h-6 w-6'}`
      )}
    >
      <div className='absolute flex h-full w-full items-center justify-center'>
        {isLoaded && <Icon icon='mingcute:loading-3-fill' className='h-12 w-12 animate-spin' />}
        {isError && (
          <div className='flex flex-col items-center justify-center gap-y-2'>
            <Icon icon='tabler:error-404' className='h-12 w-12 text-red-300' />
            <div className='font-semibold text-red-300'>圖片載入失敗</div>
          </div>
        )}
      </div>
      <img
        src={src}
        loading='lazy'
        className={clsx(`${isLoaded || isError ? 'invisible' : ''}`, 'm-auto')}
        onError={handleError}
        onLoad={handleLoading}
      />
    </div>
  )
}

export const LatticeFileBackbone = () => {
  return (
    <div
      className={clsx(
        'flex h-[200px] w-full flex-col items-center justify-between rounded-lg',
        'animate-pulse cursor-wait border-2 border-slate-100'
      )}
    >
      <div className='h-full w-full bg-slate-100'></div>
      <div className='my-2 h-8 w-[180px] truncate rounded-xl bg-slate-100 px-2 text-center'></div>
    </div>
  )
}

LatticeFileBackbone.displayName = 'LatticeFileBackbone'


const handleTime = (e: string) => {
  const date = new Date(e) ?? new Date()
  return `${date.getFullYear()}年 ${date.getMonth() + 1}月 ${date.getDate()}日`
}
