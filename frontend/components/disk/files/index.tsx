import clsx from 'clsx'
import { File } from 'components/disk/files/files'
import { Folder } from 'components/disk/files/folders'
import { KushareDriveBackbone } from './gdrivebone'
import { useRecoilValue } from 'recoil'
import { listMethodState, ListMethod, CommonProps, fileState, folderState, OpenImageState } from 'store'
import { useGdrive } from 'hooks/disk'
import { ImagePlayground } from 'components/disk/'

const EmptyContent = () => {
  return (
    <div className='xss:mt-[25%] md:mt-[3%] 2xl:mt-[10%] flex h-full w-full flex-col items-center gap-y-12'>
      <img src='static/empty.jpg' className='h-[300px] w-[350px]'></img>
      <div className='text-lg font-bold text-gray-500 px-12'>此位置目前無創建任何資料夾或是上傳任何圖片。</div>
    </div>
  )
}

export default function KushareDrive() {
  const listMethod = useRecoilValue(listMethodState)
  const files = useRecoilValue(fileState)
  const folders = useRecoilValue(folderState)
  const { isOpen } = useRecoilValue(OpenImageState)
  const { isLoading } = useGdrive()

  if (true) return <KushareDriveBackbone />

  return files?.length > 0 || folders?.length > 0 ? (
    <div
      className={clsx(
        'flex w-full select-none flex-col items-start overflow-y-auto px-[5%] xl:px-0',
        `${listMethod === ListMethod.Lattice ? 'mt-1 gap-y-2 xs:gap-x-6 md:gap-y-3' : ''}`,
      )}
    >
      {listMethod === ListMethod.Lattice && folders && folders.length > 0 && (
        <p className='mt-2 text-gray-400'>資料夾</p>
      )}
      <div className='mx-auto flex w-full flex-col items-center gap-x-4 xs:flex-row xs:flex-wrap'>
        {folders?.map((e: CommonProps) => (
          <Folder info={e} method={listMethod} key={`folder_index_${e.id}`} />
        ))}
      </div>
      {listMethod === ListMethod.Lattice && files && files.length > 0 && <p className='text-gray-400'>檔案</p>}
      <div className='mx-auto flex w-full flex-col items-center gap-x-4 xs:flex-row xs:flex-wrap'>
        {files?.map((e: CommonProps, index) => (
          <File method={listMethod} info={e} key={`file_${e.id}`} index={index} />
        ))}
      </div>
      {isOpen && <ImagePlayground />}
    </div>
  ) : (
    <EmptyContent />
  )
}
