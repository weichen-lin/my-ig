import clsx from 'clsx'
import { Menu } from './utils'

export default function MobileMenu(props: { isOpen: boolean; close: () => void }) {
  const { isOpen, close } = props

  return (
    <div className='relative'>
      {isOpen && (
        <div
          className={clsx('fixed bottom-0 left-0 w-full h-screen bg-slate-900 opacity-30 z-10 grayscale')}
          onClick={close}
        ></div>
      )}
      <div
        className={clsx(
          'fixed bottom-0 left-0 w-[200px] h-screen bg-white z-20 py-4',
          'flex flex-col items-center gap-y-2 py-2',
          'transition-all duration-300 ease-linear',
          `${isOpen ? 'translate-x-0' : '-translate-x-[200px]'}`,
        )}
      >
        <Menu />
      </div>
    </div>
  )
}
