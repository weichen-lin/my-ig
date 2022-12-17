import { ArrowIcon, Lattice, List } from 'public/icon/disk'

interface SortProps {
  listMethod: number
  handleListMethod: () => void
}

export default function Sort(props: SortProps) {
  const { listMethod, handleListMethod } = props
  return (
    <div className='w-[90%] h-7 mx-[5%] flex justify-between mb-2'>
      <div className='text-lg flex cursor-pointer'>
        排序方式
        <ArrowIcon className='w-[18px] h-[18px] m-[5px]' />
      </div>
      <div
        className='hover:bg-slate-200 rounded-full cursor-pointer'
        onClick={handleListMethod}
      >
        {listMethod > 0 ? (
          <Lattice className='h-[18px] m-[5px]' />
        ) : (
          <List className='w-[18px] h-[18px] m-[5px]' />
        )}
      </div>
    </div>
  )
}
