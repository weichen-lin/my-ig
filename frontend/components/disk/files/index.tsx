import clsx from 'clsx'
import Files from 'components/disk/files/files'
import Folders from 'components/disk/files/folders'
import { FormatProp, ListMethod, GdriveSelectTarget } from 'hooks/disk'
import { DiskDataInterface, CurrentFolder } from 'context'
import type { HoverHandler } from 'hooks/disk/useGdrive'
import { GdriveLikeDiskBackbonePC } from './gdrivebone'
import { IgContext } from 'context'
import { useContext } from 'react'
import Image from 'next/image'

interface GdriveLikeDiskProps extends FormatProp, HoverHandler {
  data: DiskDataInterface
  handleCurrentFolder: (e: CurrentFolder) => void
  handleImageDisplay: (e: string) => void
  selected: GdriveSelectTarget
  dragged: GdriveSelectTarget
  isLoading: boolean
}

export default function GdriveLikeDisk(props: any) {
  const {
    listMethod,
    selected,
    dragged,
    handleImageDisplay,
    handleCurrentFolder,
    hoverHandler,
  } = props

  const kushareContext = useContext(IgContext)

  const files = kushareContext?.diskData.files
  const folders = kushareContext?.diskData.folders

  const haveContent =
    (files && files.length > 0) || (folders && folders.length > 0)

  const GdriveHaveContent = () => {
    return (
      <div
        className={clsx(
          'overflow-y-auto w-[92%] mx-auto pl-[1%] flex items-center mb-2 select-none h-full relative',
          `${
            listMethod === ListMethod.Lattice
              ? 'flex-wrap gap-y-2 xs:gap-x-6 md:gap-y-6 mt-3 flex-row'
              : 'flex-col w-full'
          }`
        )}
      >
        {listMethod === ListMethod.Lattice && folders && folders.length > 0 && (
          <p className='w-[90%] xs:w-full text-gray-400'>資料夾</p>
        )}
        <Folders
          listMethod={listMethod}
          folders={folders}
          handleCurrentFolder={handleCurrentFolder}
          hoverHandler={hoverHandler}
        />
        {listMethod === ListMethod.Lattice && files && files.length > 0 && (
          <p className='w-[90%] xs:w-full text-gray-400'>檔案</p>
        )}
        <Files
          listMethod={listMethod}
          files={files}
          handleImageDisplay={handleImageDisplay}
        />
      </div>
    )
  }

  return kushareContext?.isFetching ? (
    <GdriveLikeDiskBackbonePC listMethod={listMethod} />
  ) : haveContent ? (
    <GdriveHaveContent />
  ) : (
    <div className='w-full flex flex-col items-center bg-red-200'>
      <img
        src='static/empty.jpg'
        className='w-[350px] h-[300px] bg-red-200'
      ></img>
      <div className='text-gray-700'>
        此位置目前無創建任何資料夾或是上傳任何圖片。
      </div>
    </div>
  )
}
