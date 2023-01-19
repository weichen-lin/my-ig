import clsx from 'clsx'
import FileTypeElement from 'components/disk/files/file'
import FolderTypeElement from 'components/disk/files/folder'
import {
  FormatProp,
  ListMethod,
  DiskData,
  SelectionStringList
} from 'hooks/disk/type'

interface FilesPageProp extends FormatProp, SelectionStringList {
  files: DiskData[]
  folders: DiskData[]
}

export default function Files(props: FilesPageProp) {
  const { listMethod, files, folders, selected, dragged } = props

  return (
    <div
      className={clsx(
        'w-full flex justify-start mt-3 mb-12 select-none',
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
      {folders.map((e) => (
        <FolderTypeElement
          id={e.id}
          listMethod={listMethod}
          folderName={e.name}
          key={`folder_index_${e.id}`}
          selected={selected.has(`selectable-${e.id}`)}
          dragged={dragged.has(`selectable-${e.id}`)}
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
      {files.map((e) => (
        <FileTypeElement
          id={e.id}
          listMethod={listMethod}
          fileName={e.name}
          imgUrl={e.url}
          key={`file_index_${e.id}`}
          selected={selected.has(`selectable-${e.id}`)}
          dragged={dragged.has(`selectable-${e.id}`)}
        />
      ))}
    </div>
  )
}
