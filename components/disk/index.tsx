import Search from 'components/disk/search'
import Sort from 'components/disk/sort'
import Files from 'components/disk/files'
import Operator from 'components/disk/operator'

import useDisk, { ListMethod } from 'hooks/disk/useDisk'

export default function Disk() {
  const { listMethod, setListMethod, data, setData } = useDisk()

  const handleListMethod = () => {
    if (listMethod === ListMethod.Lattice) {
      setListMethod(ListMethod.List)
    } else {
      setListMethod(ListMethod.Lattice)
    }
  }

  return (
    <div className='flex h-screen w-[90%] flex-col max-w-[1280px] mx-auto'>
      <Search />
      <Sort listMethod={listMethod} handleListMethod={handleListMethod} />
      <div className='grow overflow-y-auto'>
        <Files listMethod={listMethod} data={data} />
      </div>
      <Operator setData={setData} />
    </div>
  )
}
