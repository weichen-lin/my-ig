import clsx from 'clsx'
import Files from 'components/disk/files/files'
import Folders from 'components/disk/files/folders'
import { FormatProp, ListMethod, GdriveSelectTarget } from 'hooks/disk'
import { DiskDataInterface, CurrentFolder } from 'context'
import type { HoverHandler } from 'hooks/disk/useGdrive'

interface GdriveLikeDiskProps extends FormatProp, HoverHandler {
  data: DiskDataInterface
  handleCurrentFolder: (e: CurrentFolder) => void
  handleImageDisplay: (e: string) => void
  selected: GdriveSelectTarget
  dragged: GdriveSelectTarget
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
  } = props

  const files = data.files ?? []
  const folders = data.folders ?? []

  return (
    <div
      className={clsx(
        'w-[92%] mx-auto pl-[1%] flex items-center justify-start mb-12 select-none',
        `${
          listMethod === ListMethod.Lattice
            ? 'flex-wrap gap-y-2 xs:gap-x-6 md:gap-y-6 mt-3'
            : 'flex-col'
        }`
      )}
    >
      <p
        className={clsx(
          'w-full xs:w-full text-gray-400',
          `${listMethod === ListMethod.Lattice ? '' : 'hidden'}`
        )}
      >
        資料夾
      </p>
      <Folders
        listMethod={listMethod}
        folders={folders}
        handleCurrentFolder={handleCurrentFolder}
        selected={selected.folders}
        dragged={dragged.folders}
        hoverHandler={hoverHandler}
      />
      <p
        className={clsx(
          'w-[90%] xs:w-full text-gray-400',
          `${listMethod === ListMethod.Lattice ? '' : 'hidden'}`
        )}
      >
        檔案
      </p>
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
