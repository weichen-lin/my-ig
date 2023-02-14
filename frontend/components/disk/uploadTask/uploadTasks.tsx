import { Cancel } from 'public/icon/disk'
import clsx from 'clsx'
import Task from './task'
import { useOperatorInterface } from 'hooks/disk/useOperator'

type UploadTasksProps = Pick<
  useOperatorInterface,
  'uploader' | 'handleUploaderClose'
>

export default function UploadTasks(props: UploadTasksProps) {
  const { uploader, handleUploaderClose } = props
  return (
    <div
      className={clsx(
        'fixed bottom-0 2xl:right-[15%] flex flex-col z-20',
        'w-full md:w-2/3 lg:w-2/5 md:ml-[5%] 2xl:ml-0 3xl:ml-[20%] max-w-[480px]',
        'border-t-2 md:border-2',
        'transition-all duration-300 ease-out',
        `${uploader.isOpen ? 'h-[400px]' : 'h-0'}`
      )}
    >
      <div className='w-full h-12 flex bg-slate-300 m-0'>
        <div className='py-3 px-4 flex-1 w-full h-full'>上傳檔案</div>
        <Cancel
          className='h-7 w-7 m-[10px] hover:opacity-60 hover:cursor-pointer'
          onClick={handleUploaderClose}
        />
      </div>
      <div className='overflow-y-auto flex-1 flex flex-col w-full'>
        {Array.from(uploader.uploadfiles).map(([fileName, status]) => (
          <Task fileName={fileName} status={status} />
        ))}
      </div>
    </div>
  )
}
