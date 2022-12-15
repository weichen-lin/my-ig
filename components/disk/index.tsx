import Search from 'components/disk/search'

export default function Disk() {
  return (
    <div className='flex h-screen w-full flex-col'>
      {/* 搜尋框 */}
      <Search />
      {/* 排序及呈現式 */}
      <div></div>
      {/* 資料夾 */}
      <div></div>
      {/* 手機版右下加號 */}
      <div></div>
    </div>
  )
}
