import clsx from 'clsx'
import { FileType, ListMethod } from 'hooks/disk/useDisk'
import FileTypeElement from 'components/disk/files/file'
import FolderTypeElement from 'components/disk/files/folder'
import { FormatProp } from 'components/disk/files/type'

interface FilesPageProp extends FormatProp {
  data: any[]
}

export default function Files(props: FilesPageProp) {
  const { listMethod, data } = props

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
      {data
        ?.filter((e) => e.type === FileType.Folder)
        .map((e) => (
          <FolderTypeElement listMethod={listMethod} folderName={e.name} />
        ))}
      <p
        className={clsx(
          'w-full p-5 text-gray-400',
          `${listMethod === ListMethod.Lattice ? '' : 'hidden'}`
        )}
      >
        檔案
      </p>
      {data
        ?.filter((e) => e.type === FileType.File)
        .map((e) => (
          <FileTypeElement
            listMethod={listMethod}
            fileName={e.name}
            imgUrl={e.url}
          />
        ))}
    </div>
  )
}
