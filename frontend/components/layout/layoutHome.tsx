import Search from 'components/disk/search'
import { Loading, Dialog } from 'components/utils'
import { Hinter, FullScreenMenu, MobileMenu } from 'components/disk'
import { useIsMobile } from 'hooks/disk'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useCallback, useState } from 'react'

import { useGdrive, GdriveProvider } from 'context'
interface LayoutProps {
  children: JSX.Element
}

const LayoutHomePC = ({ children }: LayoutProps) => {
  const { openDialog, currentDialog, handleCloseDialog } = useGdrive()

  return (
    <div className='bg-slate-300 flex gap-x-1 md:pt-[1%] h-screen w-full justify-center'>
      <FullScreenMenu />
      <div className='flex-col md:h-[98%] bg-white md:rounded-lg flex pt-1 max-w-[1280px] w-full justify-around mr-3'>
        <div className='flex w-[90%] mx-auto h-[10%] gap-x-8 items-center'>
          <div className='xss:hidden md:block h-12'>
            <img className='h-full mx-auto' src='/icon/layout/logo.png'></img>
          </div>
          <Search />
        </div>
        {children}
      </div>
    </div>
  )
}

const LayoutHomeMobile = (props: { children: JSX.Element }) => {
  const { children } = props
  const [openMenu, setOpenMenu] = useState(false)

  const closeMenu = useCallback(() => {
    setOpenMenu(false)
  }, [])

  return (
    <div className='flex flex-col h-screen w-full'>
      <div className='flex w-[90%] mx-auto h-[10%] items-center'>
        <RxHamburgerMenu
          className='w-7 h-7 mt-[6px] mr-2 p-1 hover:bg-slate-300 xl:hidden md:w-9 md:h-9'
          onClick={() => setOpenMenu((prev) => !prev)}
        />
        <Search />
      </div>
      <MobileMenu isOpen={openMenu} close={closeMenu} />
      <Hinter />
      {children}
    </div>
  )
}

export default function LayoutHome(props: LayoutProps) {
  const { children } = props
  const { isFullScreen } = useIsMobile()

  return (
    <GdriveProvider>
      {isFullScreen ? (
        <LayoutHomePC children={children} />
      ) : (
        <LayoutHomeMobile children={children} />
      )}
    </GdriveProvider>
  )
}
