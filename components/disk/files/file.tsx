import clsx from 'clsx';
import { FilesProps } from 'components/disk/files/type';
import { ListMethod } from 'hooks/disk/useDisk';

export default function FileType(props: FilesProps) {
  const { listMethod, imgUrl, fileName } = props;

  return (
    <div
      className={clsx(
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[200px] lg:w-[225px] h-[200px] lg:h-[225px] flex-col border-2'
            : 'w-full h-12'
        }`,
        'flex cursor-pointer rounded-lg relative',
        'transition-all duration-200 ease-out',
        'hover:bg-slate-200'
      )}
    >
      <div
        className={clsx(
          'overflow-hidden rounded-t-lg',
          `${
            listMethod === ListMethod.Lattice
              ? 'w-full h-[180px]'
              : 'w-6 h-6 m-3'
          }`
        )}
      >
        <img src={imgUrl}></img>
      </div>
      <div
        className={clsx(
          'truncate text-base py-[10.5px] grow px-2',
          `${listMethod === ListMethod.Lattice ? 'text-center' : 'text-left'}`
        )}
      >
        {fileName}
      </div>
      <div
        className={clsx(
          'absolute h-[2px] w-full bg-slate-100 bottom-0',
          `${listMethod === ListMethod.Lattice ? 'hidden' : ''}`
        )}
      ></div>{' '}
    </div>
  );
}
