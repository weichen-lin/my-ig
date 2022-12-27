import clsx from 'clsx'
import AddFolderPageButton from 'components/disk/addfolder/addfolderbutton'

interface AddFolderPageProps {
  creatFolderOpen: boolean
  toogleCreateFolder: () => void
}

export default function AddFolderPage(props: AddFolderPageProps) {
  const { creatFolderOpen, toogleCreateFolder } = props

  return (
    <div
      className={clsx(
        'absolute top-0 left-0 h-screen w-full bg-black/40',
        'transition-all duration-100 ease-in',
        `${creatFolderOpen ? 'opacity-100 z-10' : 'opacity-0 -z-10'}`
      )}
    >
      <div
        className={clsx(
          'bg-gray-100 m-auto mt-[17%] rounded-xl flex flex-col p-5 gap-y-2',
          'transition-all duration-100 ease-in',
          `${creatFolderOpen ? 'w-[20%] h-[180px]' : 'w-0 h-0'}`
        )}
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
