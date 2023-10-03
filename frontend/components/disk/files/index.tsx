import clsx from 'clsx'
import { File } from 'components/disk/files/files'
import { Folder } from 'components/disk/files/folders'
import { KushareDriveBackbonePC } from './gdrivebone'
import { useRecoilValue } from 'recoil'
import { listMethodState, ListMethod, driveState, CommonProps } from 'store'

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
  const { isLoading } = drive

  if (isLoading) return <KushareDriveBackbonePC />

  const files: CommonProps[] = [
    { id: '1', name: 'test', last_modified_at: '2021-10-10' },
    { id: '1', name: 'test', last_modified_at: '2021-10-10' },
    { id: '1', name: 'test', last_modified_at: '2021-10-10' },
    { id: '1', name: 'test', last_modified_at: '2021-10-10' },
    { id: '1', name: 'test', last_modified_at: '2021-10-10' },
    { id: '1', name: 'test', last_modified_at: '2021-10-10' },
  ]
  const folders: CommonProps[] = [
    { id: '1', name: 'test', last_modified_at: '2021-10-10' },
    { id: '2', name: 'test', last_modified_at: '2021-10-10' },
    { id: '3', name: 'test', last_modified_at: '2021-10-10' },
    { id: '4', name: 'test', last_modified_at: '2021-10-10' },
    { id: '5', name: 'test', last_modified_at: '2021-10-10' },
    { id: '6', name: 'test', last_modified_at: '2021-10-10' },
  ]

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
      <div className='mx-auto flex w-full flex-col items-center gap-x-4 xs:flex-row xs:flex-wrap'>
        {folders?.map((e: CommonProps) => (
          <Folder info={e} method={listMethod} key={`folder_index_${e.id}`} />
        ))}
      </div>
      {listMethod === ListMethod.Lattice && files && files.length > 0 && (
        <p className='mt-2 pl-[1%] text-gray-400'>檔案</p>
      )}
      <div className='mx-auto flex w-full flex-col items-center gap-x-4 xs:flex-row xs:flex-wrap'>
        {files?.map((e: CommonProps) => (
          <File method={listMethod} info={e} key={`file_${e.id}`} />
        ))}
      </div>
    </div>
  ) : (
    <EmptyContent />
  )
}
