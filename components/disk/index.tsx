import Search from 'components/disk/search'
import Sort from 'components/disk/sort'
import Files from 'components/disk/files'

import useDisk, { ListMethod } from 'hooks/disk/useDisk'

export default function Disk() {
  const { listMethod, setListMethod } = useDisk()

  const handleListMethod = () => {
    if (listMethod === ListMethod.Lattice) {
      setListMethod(ListMethod.List)
    } else {
      setListMethod(ListMethod.Lattice)
    }
  }

  return (
    <div className='flex h-screen w-full flex-col'>
      {/* 搜尋框 */}
      <Search />
      {/* 排序及呈現式 */}
      <Sort listMethod={listMethod} handleListMethod={handleListMethod} />
      {/* 資料夾 */}
      <div className='grow overflow-scroll'>
        <Files listMethod={listMethod} />
      </div>
      {/* 手機版右下加號 */}
      <div></div>
    </div>
  )
}
