import { History } from './plugins/history'

export default function Editor() {
  return (
    <div className='w-full border-b-[1px] flex h-12 rounded-t-xl '>
      <History />
    </div>
  )
}
