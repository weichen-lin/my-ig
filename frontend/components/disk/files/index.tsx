import clsx from 'clsx'
import Files from 'components/disk/files/files'
import Folders from 'components/disk/files/folders'
import { FormatProp, ListMethod, GdriveSelectTarget } from 'hooks/disk'
import { DiskDataInterface, CurrentFolder } from 'context'
import type { HoverHandler } from 'hooks/disk/useGdrive'
import { GdriveLikeDiskBackbonePC } from './gdrivebone'

interface GdriveLikeDiskProps extends FormatProp, HoverHandler {
  data: DiskDataInterface
  handleCurrentFolder: (e: CurrentFolder) => void
  handleImageDisplay: (e: string) => void
  selected: GdriveSelectTarget
  dragged: GdriveSelectTarget
  isLoading: boolean
}

export default function GdriveLikeDisk(props: GdriveLikeDiskProps) {
  const {
    listMethod,
    data,
    selected,
    dragged,
    handleImageDisplay,
    handleCurrentFolder,
    hoverHandler,
    isLoading,
  } = props

  const files = data.files ?? []
  const folders = data.folders ?? []

  return isLoading ? (
    <GdriveLikeDiskBackbonePC listMethod={listMethod} />
  ) : (
    <div
      className={clsx(
        'overflow-y-scroll w-[92%] mx-auto pl-[1%] flex items-center justify-start mb-12 select-none bg-teal-400',
        `${
          listMethod === ListMethod.Lattice
            ? 'flex-wrap gap-y-2 xs:gap-x-6 md:gap-y-6 mt-3 flex-row'
            : 'flex-col'
        }`
      )}
    >
      {listMethod === ListMethod.Lattice && (
        <p className='w-[90%] xs:w-full text-gray-400'>資料夾</p>
      )}
      <Folders
        listMethod={listMethod}
        folders={folders}
        handleCurrentFolder={handleCurrentFolder}
        selected={selected.folders}
        dragged={dragged.folders}
        hoverHandler={hoverHandler}
      />
      {listMethod === ListMethod.Lattice && (
        <p className='w-[90%] xs:w-full text-gray-400'>檔案</p>
      )}
      <Files
        listMethod={listMethod}
        files={files}
        handleImageDisplay={handleImageDisplay}
        selected={selected.files}
        dragged={dragged.files}
      />
    </div>
  )
}
