import clsx from 'clsx'
import Files from 'components/disk/files/files'
import Folders from 'components/disk/files/folders'
import { KushareDriveBackbonePC } from './gdrivebone'
import { useRecoilValue } from 'recoil'
import { listMethodState, ListMethod, driveState } from 'store'

const EmptyContent = () => {
  return (
    <div className='xss:mt-[25%] md:mt-[10%] flex h-full w-full flex-col items-center gap-y-12'>
      <img src='static/empty.jpg' className='h-[300px] w-[350px]'></img>
      <div className='text-lg font-bold text-gray-500 px-12'>此位置目前無創建任何資料夾或是上傳任何圖片。</div>
    </div>
  )
}

export default function KushareDrive() {
  const drive = useRecoilValue(driveState)
  const listMethod = useRecoilValue(listMethodState)
  const { isLoading, files, folders } = drive

  if (isLoading) return <KushareDriveBackbonePC />

  return files.length > 0 && folders.length > 0 ? (
    <div
      className={clsx(
        'relative mx-auto mb-2 flex h-full w-[92%] select-none flex-col items-start overflow-y-auto',
        `${listMethod === ListMethod.Lattice ? 'mt-3 gap-y-2 xs:gap-x-6 md:gap-y-6' : 'w-full'}`
      )}
    >
      {listMethod === ListMethod.Lattice && folders && folders.length > 0 && (
        <p className='mt-2 text-gray-400 xss:w-full xss:pl-[5%] xs:w-[20%] xs:pl-[1%]'>資料夾</p>
      )}
      <Folders listMethod={listMethod} folders={folders} />
      {listMethod === ListMethod.Lattice && files && files.length > 0 && (
        <p className='mt-2 pl-[1%] text-gray-400'>檔案</p>
      )}
      <Files listMethod={listMethod} files={files} />
    </div>
  ) : (
    <EmptyContent />
  )
}
