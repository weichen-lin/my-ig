import clsx from 'clsx'

export const ListBackBone = () => {
  return (
    <div
      className={clsx(
        'flex items-center border-b-2 cursor-wait',
        'w-full h-12 animate-pulse border-slate-100'
      )}
    >
      <div className='flex flex-1 h-full items-center'>
        <div className='h-6 w-6 mx-2 rounded-sm bg-slate-100'></div>
        <div className='ml-4 w-[200px] xs:w-[300px] bg-slate-100 h-2/3'></div>
      </div>
      <div className='w-[200px] px-2 bg-slate-100 hidden md:block h-2/3'></div>
    </div>
  )
}
