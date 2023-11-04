import clsx from 'clsx'
import { Menu } from './utils'

function FullScreenMenu() {
  return (
    <div
      className={clsx('flex-col bg-white rounded-lg flex gap-y-2', 'py-4 items-center', 'min-w-[250px] max-w-[300px]')}
    >
      <Menu />
    </div>
  )
}
export default FullScreenMenu
