import clsx from 'clsx'
import { Plus, UploadFolder } from 'public/icon/disk'
import Option from 'components/disk/operator/option'
import { UploadFile, AddFolder } from 'public/icon/disk'
import { Dispatch, SetStateAction } from 'react'
import { Data, FileType } from 'hooks/disk/useDisk'

interface OperatorProps {
  setData: Dispatch<SetStateAction<Data[]>>
  operatorOpen: boolean
  toogleCreateFolder: () => void
  toogleOperatorOpen: () => void
}

export default function Operator(props: OperatorProps) {
  const { setData, operatorOpen, toogleCreateFolder, toogleOperatorOpen } =
    props

  const handleClick = async () => {
    const FileHandlers = await window?.showOpenFilePicker({ multiple: true })
    const AllContents = await Promise.all(
      FileHandlers.map(async (filehandle) => {
        const file = await filehandle.getFile()
        const imgReader = new FileReader()
        imgReader.readAsDataURL(file)
        imgReader.onloadend = () => {
          setData((prev) => [
            ...prev,
            {
              type: FileType.File,
              name: file.name,
              url: imgReader.result ?? '',
              last_modified_data: '2022/12/10',
            },
          ])
        }
      })
    )
  }

  return (
    <div
      className={clsx(
        'fixed bottom-0 right-[5%] w-[300px] h-[300px]',
        'lg:w-[400px] lg:h-[400px]',
        '3xl:right-[5%]'
      )}
    >
      <div
        className={clsx(
          'absolute bottom-[15%] right-[5%] w-[25%] h-[25%] cursor-pointer bg-white/40',
          'lg:right-[10%]',
          'rounded-full hover:bg-gray-300',
          'border-[1px] hover:border-gray-100',
          'transition-all duration-700 ease-in-out',
          'md:right-[10%]',
          'hover:shadow-lg hover:shadow-gray-300 hover:border-none',
          `${operatorOpen ? 'rotate-[360deg]' : ''}`
        )}
        onClick={toogleOperatorOpen}
      >
        <Plus className='w-1/2 h-1/2 m-[25%] opacity-70' />
      </div>
      <ul
        className={clsx(
          'absolute bottom-[19.5%] right-[35%] w-[16%] h-[16%]',
          'md:right-[40%]',
          'transition-all duration-300 ease-out',
          `${operatorOpen ? 'opacity-100' : 'opacity-0'}`
        )}
      >
        <Option
          operatorOpen={operatorOpen}
          angle={''}
          icon={<UploadFile className='w-1/2 h-1/2 m-[25%]' />}
          onClick={handleClick}
        />
        <Option
          operatorOpen={operatorOpen}
          angle={'rotate-[45deg]'}
          icon={
            <UploadFolder className='w-1/2 h-1/2 m-[25%] -rotate-[45deg]' />
          }
          onClick={handleClick}
        />
        <Option
          operatorOpen={operatorOpen}
          angle={'rotate-90'}
          icon={<AddFolder className='w-1/2 h-1/2 m-[25%] -rotate-90' />}
          onClick={toogleCreateFolder}
        />
      </ul>
    </div>
  )
}
