import { SuccessIcon } from 'public/icon/disk'
import { LoadingIcon, ErrorIcon } from 'public/icon/login'

export enum FileUploadStatus {
  LOADING,
  FAILED,
  SUCCESS,
}

export type FileStatus = 0 | 1 | 2

const FileStatusICon: { [key: number]: JSX.Element } = {
  0: <LoadingIcon className='w-5 h-5 m-[14px] animate-spin' />,
  1: <ErrorIcon className='w-6 h-6 m-3' fill='#9f1d35' />,
  2: <SuccessIcon className='w-5 h-5 m-[14px]' />,
}

interface TaskProps {
  fileName: string
  status: FileUploadStatus
}

export default function Task(props: TaskProps) {
  const { fileName, status } = props

  return (
    <div className='h-12 w-full border-b-2 border-slate-100 flex bg-white'>
      <div className='flex-1 truncate py-3 px-4'>{fileName} </div>
      {FileStatusICon[status]}
    </div>
  )
}
