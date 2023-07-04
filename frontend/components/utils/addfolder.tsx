import { forwardRef, useState } from 'react'

interface AddFolderProps {
  close: () => void
}

const useAddFolder = () => {}

const AddFolder = forwardRef<HTMLInputElement, AddFolderProps>((prop, ref) => {
  const { close } = prop
  return (
    <div className='rounded-lg bg-white drop-shadow-lg flex flex-col p-4 gap-y-4 w-full'>
      <p className='text-lg text-gray-500 select-none'>新資料夾</p>
      <input
        className='p-2 border-2 focus:border-blue-300 outline-none rounded-md text-black text-base select-all'
        defaultValue={'未命名資料夾'}
        ref={ref}
      />
      <div className='flex justify-end gap-x-2'>
        <button
          className='px-4 py-1 hover:bg-gray-100 rounded-lg'
          onClick={close}
        >
          取消
        </button>
        <button className='px-4 py-1 hover:bg-gray-100 rounded-lg'>建立</button>
      </div>
    </div>
  )
})

export default AddFolder
