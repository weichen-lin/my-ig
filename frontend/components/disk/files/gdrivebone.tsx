import { FolderBackbone } from './folders'
import { LatticeFileBackbone } from './files'
import { ListBackBone } from './listbackbone'
import clsx from 'clsx'
import { ListMethod } from 'store'
import { useIsMobile } from 'hooks/disk'
import { useRecoilValue } from 'recoil'
import { listMethodState } from 'store'

const BACKBONE_NUMBER = 5

const FolderBackbones = (props: { listMethod: ListMethod }) => {
  const { listMethod } = props
  return (
    <div
      className={clsx(
        'flex',
        'transition-all duration-100 ease-out',
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%] my-2'
            : 'w-full flex-col'
        }`,
      )}
    >
      {listMethod === ListMethod.Lattice ? <FolderBackbone /> : <ListBackBone />}
    </div>
  )
}

const FileBackbone = (props: { listMethod: ListMethod }) => {
  const { listMethod } = props

  return (
    <div
      className={clsx(
        'flex',
        'transition-all duration-100 ease-out',
        `${
          listMethod === ListMethod.Lattice
            ? 'w-[250px] xs:w-[44%] md:w-[31%] lg:w-[23%] xl:w-[18%] mb-4'
            : 'w-full flex-col'
        }`,
      )}
    >
      {listMethod === ListMethod.Lattice ? <LatticeFileBackbone /> : <ListBackBone />}
    </div>
  )
}

export const KushareDriveBackbone = () => {
  const listMethod = useRecoilValue(listMethodState)
  const { isFullScreen } = useIsMobile()

  return (
    <div
      className={clsx(
        'w-full flex items-center justify-start select-none px-[5%] xl:px-0',
        `${listMethod === ListMethod.Lattice ? 'flex-wrap gap-y-2 xs:gap-x-6 md:gap-y-2 mt-2' : 'flex-col mt-4'}`,
      )}
      style={{
        animation: isFullScreen ? 'loadingHomepage 0.5s forwards ease-in-out' : '',
      }}
    >
      {listMethod === ListMethod.Lattice && <p className='w-[90%] xs:w-full text-gray-400'>資料夾</p>}
      <div className='flex flex-col xs:flex-row xs:flex-wrap w-full gap-x-4 mx-auto items-center'>
        {Array.from(Array(BACKBONE_NUMBER).keys()).map(e => (
          <FolderBackbones key={`folder-bone-${e}`} listMethod={listMethod} />
        ))}
      </div>
      {listMethod === ListMethod.Lattice && <p className='w-[90%] xs:w-full text-gray-400'>檔案</p>}
      <div className='flex flex-col xs:flex-row xs:flex-wrap w-full gap-x-4 mx-auto items-center'>
        {Array.from(Array(BACKBONE_NUMBER).keys()).map(e => (
          <FileBackbone key={`folder-bone-${e}`} listMethod={listMethod} />
        ))}
      </div>
    </div>
  )
}
