import { Cancel, SuccessIcon } from 'public/icon/disk'
import { LoadingIcon, ErrorIcon } from 'public/icon/login'
import clsx from 'clsx'
import { useState } from 'react'

export default function UploadTasks() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div
      className={clsx(
        'fixed bottom-0 2xl:right-[15%] flex flex-col z-20',
        'w-full md:w-2/3 lg:w-2/5 md:ml-[5%] 2xl:ml-0 3xl:ml-[20%] max-w-[480px]',
        'border-t-2 md:border-2',
        'transition-all duration-300 ease-out',
        `${isOpen ? 'h-[400px]' : 'h-0'}`
      )}
    >
      <div className='w-full h-12 flex bg-slate-300 m-0'>
        <div className='py-3 px-4 flex-1 w-full h-full'>上傳檔案</div>
        <Cancel
          className='h-7 w-7 m-[10px] hover:opacity-60 hover:cursor-pointer'
          onClick={() => {
            setIsOpen((prev) => !prev)
          }}
        />
      </div>
      <div className='overflow-y-auto flex-1 flex flex-col w-full'>
        <div className='h-12 w-full border-b-2 border-slate-100 flex bg-white'>
          <div className='flex-1 truncate py-3 px-4'>
            filenamefilenamefilenamefilenamefilenameasdasdasdasd
          </div>
          <LoadingIcon className='w-5 h-5 m-[14px] animate-spin' />
        </div>
        <div className='h-12 w-full border-b-2 border-slate-100 flex bg-white'>
          <div className='flex-1 truncate py-3 px-4'>
            filenamefilenamefilenamefilenamefilenameasdasdasdasd
          </div>
          <ErrorIcon className='w-6 h-6 m-3' fill='#9f1d35' />
        </div>
        <div className='h-12 w-full border-b-2 border-slate-100 flex bg-white'>
          <div className='flex-1 truncate py-3 px-4'>
            filenamefilenamefilenamefilenamefilenameasdasdasdasd
          </div>
          <SuccessIcon className='w-5 h-5 m-[14px]' />
        </div>
        <div className='h-12 w-full border-b-2 border-slate-100 flex bg-white'>
          <div className='flex-1 truncate py-3 px-4'>
            filenamefilenamefilenamefilenamefilenameasdasdasdasd
          </div>
          <SuccessIcon className='w-5 h-5 m-[14px]' />
        </div>
        <div className='h-12 w-full border-b-2 border-slate-100 flex bg-white'>
          <div className='flex-1 truncate py-3 px-4'>
            filenamefilenamefilenamefilenamefilenameasdasdasdasd
          </div>
          <SuccessIcon className='w-5 h-5 m-[14px]' />
        </div>
        <div className='h-12 w-full border-b-2 border-slate-100 flex bg-white'>
          <div className='flex-1 truncate py-3 px-4'>
            filenamefilenamefilenamefilenamefilenameasdasdasdasd
          </div>
          <SuccessIcon className='w-5 h-5 m-[14px]' />
        </div>
        <div className='h-12 w-full border-b-2 border-slate-100 flex bg-white'>
          <div className='flex-1 truncate py-3 px-4'>
            filenamefilenamefilenamefilenamefilenameasdasdasdasd
          </div>
          <SuccessIcon className='w-5 h-5 m-[14px]' />
        </div>
        <div className='h-12 w-full border-b-2 border-slate-100 flex bg-white'>
          <div className='flex-1 truncate py-3 px-4'>
            filenamefilenamefilenamefilenamefilenameasdasdasdasd
          </div>
          <SuccessIcon className='w-5 h-5 m-[14px]' />
        </div>
        <div className='h-12 w-full border-b-2 border-slate-100 flex bg-white'>
          <div className='flex-1 truncate py-3 px-4'>
            filenamefilenamefilenamefilenamefilenameasdasdasdasd
          </div>
          <SuccessIcon className='w-5 h-5 m-[14px]' />
        </div>
        <div className='h-12 w-full border-b-2 border-slate-100 flex bg-white'>
          <div className='flex-1 truncate py-3 px-4'>
            filenamefilenamefilenamefilenamefilenameasdasdasdasd
          </div>
          <SuccessIcon className='w-5 h-5 m-[14px]' />
        </div>
      </div>
    </div>
  )
}
