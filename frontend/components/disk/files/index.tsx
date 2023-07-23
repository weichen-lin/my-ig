import clsx from 'clsx'
import Files from 'components/disk/files/files'
import Folders from 'components/disk/files/folders'
import { FormatProp, ListMethod, GdriveSelectTarget } from 'hooks/disk'
import { DiskDataInterface, CurrentFolder } from 'context'
import type { HoverHandler } from 'hooks/disk/useGdrive'
import { GdriveLikeDiskBackbonePC } from './gdrivebone'
import { useGdrive } from 'context'

interface GdriveLikeDiskProps extends FormatProp, HoverHandler {
  data: DiskDataInterface
  handleCurrentFolder: (e: CurrentFolder) => void
  handleImageDisplay: (e: string) => void
  selected: GdriveSelectTarget
  dragged: GdriveSelectTarget
  isLoading: boolean
}

const EmptyContent = () => {
  return (
    <div className='w-full h-full flex flex-col items-center gap-y-12 mt-[5%]'>
      <img src='static/empty.jpg' className='w-[350px] h-[300px]'></img>
      <div className='text-gray-500 font-bold text-lg'>此位置目前無創建任何資料夾或是上傳任何圖片。</div>
    </div>
  )
}

export default function GdriveLikeDisk(props: any) {
  const { selected, dragged, handleImageDisplay, handleCurrentFolder, hoverHandler } = props

  const { diskData, isFetching, listMethod } = useGdrive()

  const files = diskData.files
  const folders = diskData.folders

  const haveContent = ((files && files.length > 0) || (folders && folders.length > 0)) ?? false

  const GdriveContent = ({ haveContent }: { haveContent: boolean }) => {
    return haveContent ? (
      <div
        className={clsx(
          'overflow-y-auto w-[92%] mx-auto flex items-start mb-2 select-none h-full relative flex-col',
          `${listMethod === ListMethod.Lattice ? 'gap-y-2 xs:gap-x-6 md:gap-y-6 mt-3' : 'w-full'}`
        )}
      >
        {listMethod === ListMethod.Lattice && folders && folders.length > 0 && (
          <p className='text-gray-400 xss:pl-[5%] xs:pl-[1%] mt-2 xss:w-full xs:w-[20%]'>資料夾</p>
        )}
        <Folders
          listMethod={listMethod}
          folders={folders}
          handleCurrentFolder={handleCurrentFolder}
          hoverHandler={hoverHandler}
        />
        {listMethod === ListMethod.Lattice && files && files.length > 0 && (
          <p className='text-gray-400 pl-[1%] mt-2'>檔案</p>
        )}
        <Files listMethod={listMethod} files={files} handleImageDisplay={handleImageDisplay} />
      </div>
    ) : (
      <EmptyContent />
    )
  }

  return isFetching ? <GdriveLikeDiskBackbonePC listMethod={listMethod} /> : <GdriveContent haveContent={haveContent} />
}
