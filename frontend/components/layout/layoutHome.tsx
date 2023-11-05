import Search from 'components/disk/search'
import { FullScreenMenu, MobileMenu } from 'components/disk'
import { useIsMobile } from 'hooks/disk'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useCallback, useState } from 'react'
import { KushareAuthProvider } from 'context'
import Image from 'next/image'

export default function LayoutHome(props: { children: JSX.Element }) {
  const { children } = props
  const { isFullScreen } = useIsMobile()
  const [openMenu, setOpenMenu] = useState(false)

  const closeMenu = useCallback(() => {
    setOpenMenu(false)
  }, [])

  return (
    <KushareAuthProvider>
      {isFullScreen ? (
        <div className='bg-slate-300 flex gap-x-5 h-screen w-full justify-center py-[1%] xl:px-4'>
          <FullScreenMenu />
          <div className='flex-col bg-white md:rounded-lg flex max-w-[1280px] w-full px-[2%] py-3'>
            <div className='flex gap-x-8 items-center pt-2 pb-5'>
              <Image src='/icon/layout/logo.png' alt='logo' width={120} height={48} />
              <Search />
            </div>
            {children}
          </div>
        </div>
      ) : (
        <div className='flex flex-col h-screen w-full'>
          <div className='flex px-[5%] gap-x-2 md:gap-x-6 py-2 items-center'>
            <RxHamburgerMenu
              className='hover:bg-slate-300 xl:hidden w-6 h-6 md:w-8 md:h-8'
              onClick={() => setOpenMenu(prev => !prev)}
            />
            <Search />
          </div>
          <MobileMenu isOpen={openMenu} close={closeMenu} />
          {children}
        </div>
      )}
    </KushareAuthProvider>
  )
}
