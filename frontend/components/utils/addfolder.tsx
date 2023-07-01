import { forwardRef } from 'react'

const AddFolder = forwardRef<HTMLInputElement>((prop, ref) => {
  return (
    <div
      className='rounded-lg bg-white drop-shadow-lg flex flex-col p-4 gap-y-4 w-full origin-center scale-0'
      style={{
        animation: 'popup 0.3s forwards ease-in-out',
      }}
    >
      <p className='text-lg text-gray-500 select-none'>新資料夾</p>
      <input
        className='p-2 border-2 focus:border-blue-300 outline-none rounded-md text-black text-base select-all'
        value={'未命名資料夾'}
        ref={ref}
      />
      <div className='flex justify-end gap-x-2'>
        <button className='px-4 py-1 hover:bg-gray-100 rounded-lg'>取消</button>
        <button className='px-4 py-1 hover:bg-gray-100 rounded-lg'>建立</button>
      </div>
    </div>
  )
})

export default AddFolder
