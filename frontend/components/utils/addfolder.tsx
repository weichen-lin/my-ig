import { forwardRef, useState, ChangeEvent } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BiError } from 'react-icons/bi'
import { createFolder, useFetch } from 'api'
import { useGdrive } from 'context'
interface AddFolderProps {
  close: () => void
}

const AddFolder = forwardRef<HTMLInputElement, AddFolderProps>((prop, ref) => {
  const { handleCloseDialog, refresh } = useGdrive()

  const { isLoading, error, run } = useFetch(createFolder, {
    onSuccess: () => {
      handleCloseDialog()
      refresh()
    },
  })

  const [folderName, setFolderName] = useState('未命名資料夾')

  const handleFolderNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value)
  }

  const Error = ({ message }: { message: string }) => {
    return (
      <div className='rounded-md text-red-500 w-full text-right pr-4 flex justify-end items-center gap-x-2'>
        <BiError className='w-6 h-6' />
        {message}
      </div>
    )
  }

  return (
    <div className='rounded-lg bg-white drop-shadow-lg flex flex-col p-4 gap-y-4 w-full'>
      <p className='text-lg text-gray-500 select-none'>新資料夾</p>
      <input
        className='p-2 border-2 focus:border-blue-300 outline-none rounded-md text-black text-base select-all'
        ref={ref}
        disabled={isLoading}
        value={folderName}
        onChange={handleFolderNameChange}
      />
      <div className='flex justify-end gap-x-2'>
        <button className='px-4 py-1 hover:bg-gray-100 rounded-lg' onClick={handleCloseDialog} disabled={isLoading}>
          取消
        </button>
        <button
          className='px-4 py-1 hover:bg-gray-100 rounded-lg'
          disabled={isLoading}
          onClick={() => {
            if (folderName) {
              run({ folder_name: folderName, locate_at: null })
            }
          }}
        >
          {isLoading ? <AiOutlineLoading3Quarters className='animate-spin w-5 h-5 mx-1' /> : '建立'}
        </button>
      </div>
      {error && <Error message={error} />}
    </div>
  )
})

export default AddFolder
