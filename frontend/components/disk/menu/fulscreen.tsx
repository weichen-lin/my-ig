import { Menu } from './utils'

export default function FullScreenMenu(props: { isLoading: boolean }) {
  const { isLoading } = props

  return (
    <div className='flex-col h-[98%] bg-white rounded-lg flex gap-y-2 max-w-[300px] py-4 mx-2 flex-auto items-center'>
      <Menu isLoading={isLoading} />
    </div>
  )
}
