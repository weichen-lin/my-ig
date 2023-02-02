import Sort from 'components/disk/sort'
import Files from 'components/disk/files'
import Operator from 'components/disk/operator'
import AddFolderPage from 'components/disk/addfolder'
import ImagePlayground from 'components/disk/images'

import useDisk from 'hooks/disk/useDisk'
import useOperator from 'hooks/disk/useOperator'
import useGdrive from 'hooks/disk/useGdrive'
import useScroll from 'hooks/utils/useScroll'
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

  const { isScrollDown, handleOnScroll } = useScroll()

  return (
    <>
      <Sort listMethod={listMethod} handleListMethod={handleListMethod} />
      <div
        className='grow overflow-y-auto'
        ref={root}
        onScroll={handleOnScroll}
      >
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
        isScrollDown={isScrollDown}
      />
      <AddFolderPage
        creatFolderOpen={creatFolderOpen}
        toogleCreateFolder={toogleCreateFolder}
      />
      <ImagePlayground data={data.filter((e) => e.type === FileType.File)} />
    </>
  )
}
