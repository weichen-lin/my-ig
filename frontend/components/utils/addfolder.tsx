import { forwardRef, useState, ChangeEvent } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BiError } from 'react-icons/bi'
import { createFolder, useFetch } from 'api'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { folderState } from 'store'
import { useSetRecoilState } from 'recoil'

interface AddFolderProps {
  close: () => void
}

interface CreateFolderProps {
  name: string
  locateAt: string | null
}

interface CreateFolderResponse {
  id: string
  name: string
  last_modified_at: string
}

const AddFolder = forwardRef<HTMLInputElement, AddFolderProps>((prop, ref) => {
  const { close } = prop
  const setFolders = useSetRecoilState(folderState)
  const router = useRouter()

  const { isLoading, error, run } = useFetch<CreateFolderProps, CreateFolderResponse>(createFolder, {
    onSuccess: (res) => {
      close()
      res && setFolders((prev) => [...prev, { id: res.id, name: res.name, last_modified_at: Date().toLocaleString() }])
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
        className={clsx(
          'p-2 border-2 focus:border-blue-300 outline-none',
          'rounded-md text-black text-base select-all'
        )}
        ref={ref}
        disabled={isLoading}
        value={folderName}
        onChange={handleFolderNameChange}
      />
      <div className='flex justify-end gap-x-2'>
        <button className='px-4 py-1 hover:bg-gray-100 rounded-lg' onClick={close} disabled={isLoading}>
          取消
        </button>
        <button
          className='px-4 py-1 hover:bg-gray-100 rounded-lg'
          disabled={isLoading}
          onClick={() => {
            if (folderName) {
              const locate_at = (router.query.f as string) ?? null
              run({ name: folderName, locateAt: locate_at })
            }
          }}
        >
          {isLoading ? <AiOutlineLoading3Quarters className='animate-spin w-5 h-5 mx-1' /> : '建立'}
        </button>
      </div>
      {error && <Error message={error.error} />}
    </div>
  )
})

AddFolder.displayName = 'AddFolder'
export default AddFolder
