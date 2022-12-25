import Search from 'components/disk/search'
import Sort from 'components/disk/sort'
import Files from 'components/disk/files'
import Operator from 'components/disk/operator'
import AddFolderPage from 'components/disk/addfolder'

import useDisk, { ListMethod } from 'hooks/disk/useDisk'
import useOperator from 'hooks/disk/useOperator'

export default function Disk() {
  const { listMethod, setListMethod, data, setData } = useDisk()

  const handleListMethod = () => {
    if (listMethod === ListMethod.Lattice) {
      setListMethod(ListMethod.List)
    } else {
      setListMethod(ListMethod.Lattice)
    }
  }

  const {
    creatFolderOpen,
    toogleCreateFolder,
    operatorOpen,
    toogleOperatorOpen,
  } = useOperator()

  return (
    <div className='flex h-screen w-[90%] flex-col max-w-[1280px] mx-auto'>
      <Search />
      <Sort listMethod={listMethod} handleListMethod={handleListMethod} />
      <div className='grow overflow-y-auto'>
        <Files listMethod={listMethod} data={data} />
      </div>
      <Operator
        setData={setData}
        toogleCreateFolder={toogleCreateFolder}
        operatorOpen={operatorOpen}
        toogleOperatorOpen={toogleOperatorOpen}
      />
      <AddFolderPage
        creatFolderOpen={creatFolderOpen}
        toogleCreateFolder={toogleCreateFolder}
      />
    </div>
  )
}
