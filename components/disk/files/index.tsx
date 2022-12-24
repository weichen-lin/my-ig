import clsx from 'clsx';
import { ListMethod } from 'hooks/disk/useDisk';
import FileType from 'components/disk/files/file';
import FolderType from 'components/disk/files/folder';
import { FormatProp } from 'components/disk/files/type';

export default function Files(props: FormatProp) {
  const { listMethod } = props;

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
      <FolderType
        listMethod={listMethod}
        folderName='測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試'
      />
      <FolderType
        listMethod={listMethod}
        folderName='測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試'
      />
      <p
        className={clsx(
          'w-full p-5 text-gray-400',
          `${listMethod === ListMethod.Lattice ? '' : 'hidden'}`
        )}
      >
        檔案
      </p>
      <FileType
        listMethod={listMethod}
        fileName='test FILE NAME'
        imgUrl={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB_lpjTSZzRSWUMhUH6XPZ0VWseidGXdIRnQ&usqp=CAU'
        }
      />
      <FileType
        listMethod={listMethod}
        fileName='test FILE NAME'
        imgUrl={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB_lpjTSZzRSWUMhUH6XPZ0VWseidGXdIRnQ&usqp=CAU'
        }
      />
      <FileType
        listMethod={listMethod}
        fileName='test FILE NAME'
        imgUrl={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHu07nG6F3K81EjL5yAZ69_oZjOPj122YRYg&usqp=CAU'
        }
      />
      <FileType
        listMethod={listMethod}
        fileName='test FILE NAME'
        imgUrl={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB_lpjTSZzRSWUMhUH6XPZ0VWseidGXdIRnQ&usqp=CAU'
        }
      />
      <FileType
        listMethod={listMethod}
        fileName='test FILE NAME'
        imgUrl={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB_lpjTSZzRSWUMhUH6XPZ0VWseidGXdIRnQ&usqp=CAU'
        }
      />
      <FileType
        listMethod={listMethod}
        fileName='test FILE NAME'
        imgUrl={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrpwK0AKVaemlL0GQMmOHJYkCy20VDrGa6n6_pkAQa5YTuBsOPm_QJrnK9RMdHVL4n6xM&usqp=CAU'
        }
      />
      <FileType
        listMethod={listMethod}
        fileName='test FILE NAME'
        imgUrl={
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB_lpjTSZzRSWUMhUH6XPZ0VWseidGXdIRnQ&usqp=CAU'
        }
      />
    </div>
  );
}
