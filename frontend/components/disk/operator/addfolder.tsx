import clsx from 'clsx'
import AddFolderPageButton from './button'
import { ErrorIcon } from 'public/icon/login'
import type { OperatorProps } from 'hooks/disk/useOperator'

export default function AddFolderPage(
  props: Pick<OperatorProps, 'addFolderProps'>
) {
  const { addFolderProps } = props
  const {
    creatFolderOpen,
    toogleCreateFolder,
    isRequesting,
    folderName,
    handleFolderName,
    createFolder,
    errorMsg
  } = addFolderProps

  return (
    <div
      className={clsx(
        'absolute top-0 left-0 h-screen w-full bg-gray-300/40 backdrop-blur-sm',
        'transition-all duration-100 ease-in',
        `${creatFolderOpen ? 'opacity-100 z-10' : 'hidden opacity-0'}`
      )}
    >
      <div
        className={clsx(
          'bg-gray-300 m-auto rounded-xl flex flex-col p-5 gap-y-2 border-2 border-slate-400',
          'mt-[300px] w-[280px]',
          'transition-all duration-100 ease-in',
          `${creatFolderOpen ? 'w-[260px] h-[180px]' : 'w-0 h-0'}`,
          `${errorMsg !== '' ? 'h-[220px]' : ''}`
        )}
      >
        <p className='w-full text-base xs:text-xl font-bold truncate'>
          新增資料夾
        </p>
        <label className=''>
          <input
            className='border-[3px] border-gray-400 p-2 pl-4 rounded-lg w-full focus:border-blue-300 outline-none'
            value={folderName}
            onChange={handleFolderName}
          />
        </label>
        <div className='flex justify-end w-full'>
          <AddFolderPageButton
            name='取消'
            isRequesting={false}
            onClick={toogleCreateFolder}
          />
          <AddFolderPageButton
            name='建立'
            isRequesting={isRequesting}
            onClick={() => {
              createFolder(folderName)
            }}
          />
        </div>
        {errorMsg !== '' ? (
          <div className='flex w-full text-base border-b-2 border-red-500'>
            <ErrorIcon className='w-6 h-6 fill-red-500' />
            <span className='px-2 text-red-500 truncate max-w-[230px]'>
              {errorMsg}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
