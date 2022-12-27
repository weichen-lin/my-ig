import clsx from 'clsx'
import FileTypeElement from 'components/disk/files/file'
import FolderTypeElement from 'components/disk/files/folder'
import { FormatProp, ListMethod, DiskData, FileType } from 'hooks/disk/type'

interface FilesPageProp extends FormatProp {
  isOnDrag: boolean
  files: DiskData[]
  folders: DiskData[]
  handleOndrag: (e: number) => void
  handleDragEnter: () => void
  handleDragEnd: () => void
}

const checkIdAtInterval = (id: number, min: number, max: number) => {
  return id >= min && id <= max
}

export default function Files(props: FilesPageProp) {
  const {
    listMethod,
    isOnDrag,
    files,
    folders,
    handleOndrag,
    handleDragEnter,
    handleDragEnd
  } = props

  return (
    <div
      className={clsx(
        'w-full flex justify-start mt-3',
        `${
          listMethod === ListMethod.Lattice
            ? 'flex-wrap mx-auto gap-x-6 gap-y-4'
            : 'flex-col'
        }`
      )}
    >
      <p
        className={clsx(
          'w-full p-5 text-gray-400',
          `${listMethod === ListMethod.Lattice ? '' : 'hidden'}`
        )}
      >
        資料夾
      </p>
      {folders.map((e, index) => (
        <FolderTypeElement
          id={e.id}
          listMethod={listMethod}
          folderName={e.name}
          isOnDrag={isOnDrag}
          handleOndrag={() => handleOndrag(FileType.Folder)}
          handleDragEnter={handleDragEnter}
          handleDragEnd={handleDragEnd}
          key={`folder_index_${index}`}
        />
      ))}
      <p
        className={clsx(
          'w-full p-5 text-gray-400',
          `${listMethod === ListMethod.Lattice ? '' : 'hidden'}`
        )}
      >
        檔案
      </p>
      {files.map((e, index) => (
        <FileTypeElement
          listMethod={listMethod}
          fileName={e.name}
          imgUrl={e.url}
          key={`file_index_${index}`}
        />
      ))}
    </div>
  )
}
