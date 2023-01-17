import Search from 'components/disk/search'
import Sort from 'components/disk/sort'
import Files from 'components/disk/files'
import Operator from 'components/disk/operator'
import AddFolderPage from 'components/disk/addfolder'
import ImagePlayground from 'components/disk/images'

import useDisk from 'hooks/disk/useDisk'
import useOperator from 'hooks/disk/useOperator'
import useGdrive from 'hooks/disk/useGdrive'
import { FileType } from 'hooks/disk/type'

export default function Disk() {
  const { listMethod, handleListMethod, data } = useDisk()

  const {
    creatFolderOpen,
    toogleCreateFolder,
    operatorOpen,
    toogleOperatorOpen
  } = useOperator()

  const { root, selected, dragged } = useGdrive()

  return (
    <div className='flex h-screen w-[90%] flex-col max-w-[1280px] mx-auto relative'>
      <Search />
      <Sort listMethod={listMethod} handleListMethod={handleListMethod} />
      <div className='grow overflow-y-auto' ref={root}>
        <Files
          listMethod={listMethod}
          files={data.filter((e) => e.type === FileType.File)}
          folders={data.filter((e) => e.type === FileType.Folder)}
          selected={selected}
          dragged={dragged}
        />
      </div>
      <Operator
        toogleCreateFolder={toogleCreateFolder}
        operatorOpen={operatorOpen}
        toogleOperatorOpen={toogleOperatorOpen}
      />
      <AddFolderPage
        creatFolderOpen={creatFolderOpen}
        toogleCreateFolder={toogleCreateFolder}
      />
      <ImagePlayground data={data.filter((e) => e.type === FileType.File)} />
    </div>
  )
}
