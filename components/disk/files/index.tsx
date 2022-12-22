import { Folder, Dots } from 'public/icon/disk'
import clsx from 'clsx'
import { ListMethod } from 'hooks/disk/useDisk'

interface FilesProps {
  listMethod: number
}

export default function Files(props: FilesProps) {
  const { listMethod } = props

  return (
    <div
      className={clsx(
        'w-full flex justify-start mt-3',
        `${listMethod === ListMethod.Lattice ? 'flex-wrap' : 'flex-col'}`
      )}
    >
      <p className='w-full p-5 text-gray-400'>資料夾</p>
      <div
        className={clsx(
          `${
            listMethod === ListMethod.Lattice
              ? 'w-[225px] h-[45px] flex-col'
              : 'w-full h-[72px] md:m-auto md:w-[90%]'
          }`,
          'border-2 rounded-lg',
          'cursor-pointer',
          'transition-all duration-300 ease-out',
          'hover:bg-slate-200'
        )}
      >
        <div className='flex'>
          <Folder
            className={clsx(
              `${
                listMethod === ListMethod.Lattice ? 'w-9 p-2 ml-2' : 'w-9 m-5'
              }`,
              'transition-all duration-300 ease-out'
            )}
          />
          <div className='flex-1 text-base py-[10px] pl-2 truncate'>
            測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試
          </div>
        </div>
      </div>
      <p className='w-full p-5 text-gray-400'>檔案</p>
      <div
        className={clsx(
          `${
            listMethod === ListMethod.Lattice
              ? 'w-[225px] h-[225px] flex-col'
              : 'w-full h-[72px] md:m-auto md:w-[90%]'
          }`,
          'flex justify-evenly cursor-pointer bg-red-300',
          'transition-all duration-300 ease-out',
          'hover:bg-slate-200'
        )}
      >
        <div
          className={clsx(
            'rounded-lg overflow-hidden',
            `${
              listMethod === ListMethod.Lattice
                ? 'w-full h-[200px]'
                : 'w-[52px] m-[12px]'
            }`
          )}
        >
          <img src='https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg'></img>
        </div>
        <div className='flex-1 text-base py-[10px] pl-2 truncate'>
          測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試測試
        </div>
      </div>
    </div>
  )
}

/**
 * <div
        className={clsx(
          `${
            listMethod === ListMethod.Lattice
              ? 'w-1/2 h-[240px] flex-col lg:w-1/3'
              : 'w-full h-[72px] md:m-auto md:w-[90%]'
          }`,
          'flex justify-evenly cursor-pointer',
          'transition-all duration-300 ease-out',
          'hover:bg-slate-200'
        )}
      >
        <Folder
          className={clsx(
            `${
              listMethod === ListMethod.Lattice
                ? 'w-1/3 mx-auto h-1/2'
                : 'w-9 m-5'
            }`,
            'transition-all duration-300 ease-out'
          )}
        />
        {listMethod === ListMethod.Lattice ? (
          <>
            <div className='w-full h-12 flex justify-center'>
              <p className='w-1/2 ml-[25%] text-center text-xl p-[10px] bg-slate-100 rounded-lg'>
                測試
              </p>
              <Dots className='rotate-90 w-1/5 h-12 opacity-75 p-[10px]' />
            </div>
          </>
        ) : (
          <>
            <div className='grow h-full flex justify-between'>
              <div className='flex flex-col h-full p-[9px]'>
                <div className='w-1/2 text-xl mb-[2px]'>測試</div>
                <div className='text-base'>2022/12/10</div>
              </div>
              <Dots className='rotate-90 h-[28px] opacity-75 my-[20px] md:mx-[10px]' />
            </div>
          </>
        )}
      </div>
      <div
        className={clsx(
          `${
            listMethod === ListMethod.Lattice
              ? 'w-1/2 h-[240px] flex-col lg:w-1/3'
              : 'w-full h-[72px] md:m-auto md:w-[90%]'
          }`,
          'flex justify-evenly cursor-pointer',
          'transition-all duration-300 ease-out',
          'hover:bg-slate-200'
        )}
      >
        <div
          className={clsx(
            'rounded-lg overflow-hidden',
            `${
              listMethod === ListMethod.Lattice
                ? 'w-full h-1/2'
                : 'w-[52px] m-[12px]'
            }`
          )}
        >
          <img src='https://upload.wikimedia.org/wikipedia/commons/5/58/Shiba_inu_taiki.jpg'></img>
        </div>
        {listMethod === ListMethod.Lattice ? (
          <>
            <div className='w-full h-12 flex justify-center'>
              <p className='w-1/2 ml-[25%] text-center text-xl p-[10px] bg-slate-100 rounded-lg'>
                測試
              </p>
              <Dots className='rotate-90 w-1/5 h-12 opacity-75 p-[10px]' />
            </div>
          </>
        ) : (
          <>
            <div className='grow h-full flex justify-between'>
              <div className='flex flex-col h-full p-[9px]'>
                <div className='w-1/2 text-xl mb-[2px]'>測試</div>
                <div className='text-base'>2022/12/10</div>
              </div>
              <Dots className='rotate-90 h-[28px] opacity-75 my-[20px] md:mx-[10px]' />
            </div>
          </>
        )}
      </div>
 */
