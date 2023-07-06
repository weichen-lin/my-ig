import { forwardRef, useState, useContext } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BiError } from 'react-icons/bi'
import { GdriveContext } from 'context'

interface AddFolderProps {
  close: () => void
}

const AddFolder = forwardRef<HTMLInputElement, AddFolderProps>((prop, ref) => {
  const gdrive = useContext(GdriveContext)
  const { dialogLoading, handleCloseDialog } = gdrive

  const Error = () => {
    return (
      <div className='rounded-md text-red-500 w-full text-right pr-4 flex justify-end items-center gap-x-2'>
        <BiError className='w-6 h-6' />
        資料夾名稱重複
      </div>
    )
  }

  return (
    <div className='rounded-lg bg-white drop-shadow-lg flex flex-col p-4 gap-y-4 w-full'>
      <p className='text-lg text-gray-500 select-none'>新資料夾</p>
      <input
        className='p-2 border-2 focus:border-blue-300 outline-none rounded-md text-black text-base select-all'
        defaultValue={'未命名資料夾'}
        ref={ref}
        disabled={dialogLoading}
      />
      <div className='flex justify-end gap-x-2'>
        <button
          className='px-4 py-1 hover:bg-gray-100 rounded-lg'
          onClick={handleCloseDialog}
          disabled={dialogLoading}
        >
          取消
        </button>
        <button
          className='px-4 py-1 hover:bg-gray-100 rounded-lg'
          disabled={dialogLoading}
        >
          {dialogLoading ? (
            <AiOutlineLoading3Quarters className='animate-spin w-5 h-5 mx-1' />
          ) : (
            '建立'
          )}
        </button>
      </div>
      <Error />
    </div>
  )
})

export default AddFolder
