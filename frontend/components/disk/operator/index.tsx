import clsx from 'clsx'
import { Plus, UploadFolder } from 'public/icon/disk'
import Option from 'components/disk/operator/option'
import { UploadFile, AddFolder } from 'public/icon/disk'
import type { useOperatorInterface } from 'hooks/disk'
import AddFolderPage from './addfolder'

export default function Operator(props: {
  operatorProps: useOperatorInterface
  isScrollDown: boolean
}) {
  const { operatorProps, isScrollDown } = props
  const {
    creatFolderOpen,
    operatorOpen,
    toogleCreateFolder,
    toogleOperatorOpen,
    isRequesting,
    createFolder,
    folderName,
    handleFolderName,
    errorMsg,
    handleFileUpload
  } = operatorProps

  return (
    <>
      <div
        className={clsx(
          'fixed bottom-4 right-[5%] lg:right-[5%] lg:bottom-[5%]',
          'transition-all duration-300 ease-linear',
          `${isScrollDown ? 'w-0 h-0' : 'w-16 h-16'}`
        )}
      >
        <div
          className={clsx(
            'absolute bottom-[15%] right-[5%] w-full h-full cursor-pointer bg-white/40',
            'lg:right-[10%]',
            'rounded-full hover:bg-gray-300',
            'border-[1px] hover:border-gray-100',
            'transition-all duration-700 ease-in-out',
            'md:right-[10%]',
            'hover:shadow-lg hover:shadow-gray-300 hover:border-none',
            `${operatorOpen ? 'rotate-[360deg]' : ''}`
          )}
          onClick={toogleOperatorOpen}
        >
          <Plus className='w-3/5 h-3/5 m-[20%] opacity-70' />
        </div>
        <ul
          className={clsx(
            'absolute bottom-[19.5%] right-[165%] md:right-[181%] 2xl:right-[170%] w-full h-full',
            'md:right-[70%] md:bottom-[30%]',
            'transition-all duration-300 ease-out',
            `${operatorOpen ? 'opacity-100' : 'opacity-0'}`
          )}
        >
          <Option
            operatorOpen={operatorOpen}
            angle={''}
            icon={<UploadFile className='w-1/2 h-1/2 m-[25%]' />}
            onClick={() => {
              handleFileUpload('FileOnly')
            }}
          />
          <Option
            operatorOpen={operatorOpen}
            angle={'rotate-[45deg]'}
            icon={
              <UploadFolder className='w-1/2 h-1/2 m-[25%] -rotate-[45deg]' />
            }
            onClick={() => {
              handleFileUpload('FilesInFolder')
            }}
          />
          <Option
            operatorOpen={operatorOpen}
            angle={'rotate-90'}
            icon={<AddFolder className='w-1/2 h-1/2 m-[25%] -rotate-90' />}
            onClick={() => {
              if (operatorOpen) {
                toogleCreateFolder()
              }
            }}
          />
        </ul>
      </div>
      <AddFolderPage
        creatFolderOpen={creatFolderOpen}
        toogleCreateFolder={toogleCreateFolder}
        isRequesting={isRequesting}
        folderName={folderName}
        handleFolderName={handleFolderName}
        createFolder={createFolder}
        errorMsg={errorMsg}
      />
    </>
  )
}
