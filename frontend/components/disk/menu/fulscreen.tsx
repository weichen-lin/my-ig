import clsx from 'clsx'
import { Menu } from './utils'
import { SidebarProvider } from 'context/providers'

function FullScreenMenu() {
  return (
    <SidebarProvider>
      <div
        className={clsx(
          'flex-col h-[98%] bg-white rounded-lg flex gap-y-2',
          'py-4 mx-3 flex-auto items-center',
          'min-w-[250px] max-w-[300px]'
        )}
      >
        <Menu />
      </div>
    </SidebarProvider>
  )
}
export default FullScreenMenu
