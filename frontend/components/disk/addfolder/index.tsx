import clsx from 'clsx'
import AddFolderPageButton from 'components/disk/addfolder/addfolderbutton'
// import useClickOutside from 'hooks/utils/useClickOutside'
// import { useRef, RefObject } from 'react'

interface AddFolderPageProps {
  creatFolderOpen: boolean
  toogleCreateFolder: () => void
}

export default function AddFolderPage(props: AddFolderPageProps) {
  const { creatFolderOpen, toogleCreateFolder } = props
  // const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={clsx(
        'absolute top-0 left-0 h-screen w-full bg-gray-700/40 backdrop-blur-sm',
        'transition-all duration-100 ease-in',
        `${creatFolderOpen ? 'opacity-100 z-10' : 'hidden opacity-0'}`
      )}
    >
      <div
        className={clsx(
          'bg-gray-100 m-auto rounded-xl flex flex-col p-5 gap-y-2',
          'mt-[300px] w-[280px]',
          'transition-all duration-100 ease-in',
          `${creatFolderOpen ? 'w-[20%] h-[180px]' : 'w-0 h-0'}`
        )}
        // ref={ref}
      >
        <p className='w-full text-xl font-bold truncate'>新增資料夾</p>
        <label className=''>
          <input className='border-[3px] border-gray-400 p-2 pl-4 rounded-lg w-full focus:border-blue-300 outline-none' />
        </label>
        <div className='flex justify-end w-full mt-4'>
          <AddFolderPageButton
            name='取消'
            disable={false}
            handleOpen={toogleCreateFolder}
          />
          <AddFolderPageButton
            name='建立'
            disable={false}
            handleOpen={toogleCreateFolder}
          />
        </div>
      </div>
    </div>
  )
}
