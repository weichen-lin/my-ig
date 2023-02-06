import clsx from 'clsx'
import Files from 'components/disk/files/files'
import Folders from 'components/disk/files/folders'
import { FormatProp, ListMethod, SelectionStringList } from 'hooks/disk/type'
import { FileData, FolderData } from 'context/type'

interface FilesPageProp extends FormatProp, SelectionStringList {
  handleImageDisplay: (e: number) => void
  data: { files: FileData[]; folders: FolderData[] }
}

export default function GdriveLikeDisk(props: FilesPageProp) {
  const { listMethod, data, selected, dragged, handleImageDisplay } = props

  return (
    <div
      className={clsx(
        'w-[90%] mx-auto flex items-center justify-start mt-3 mb-12 select-none',
        `${
          listMethod === ListMethod.Lattice
            ? 'flex-wrap gap-y-2 xs:gap-x-6 md:gap-y-6'
            : 'flex-col'
        }`
      )}
    >
      <p
        className={clsx(
          'w-[90%] xs:w-full text-gray-400',
          `${listMethod === ListMethod.Lattice ? '' : 'hidden'}`
        )}
      >
        資料夾
      </p>
      <Folders listMethod={listMethod} folders={data.folders} />
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
        files={data.files}
        handleImageDisplay={handleImageDisplay}
      />
    </div>
  )
}
