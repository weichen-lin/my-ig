import Search from 'components/disk/search'
import useAuth from 'hooks/auth/useAuth'
import { Loading } from 'components/utils'
import { Hinter, FullScreenMenu, MobileMenu } from 'components/disk'
import { useIsMobile } from 'hooks/disk'
import clsx from 'clsx'
import { RxHamburgerMenu } from 'react-icons/rx'
import { useCallback, useState } from 'react'

interface LayoutProps {
  children: JSX.Element
}

const LayoutAuthPC = ({ children }: LayoutProps) => {
  const isLoading = true
  return (
    <div className='bg-slate-300 flex gap-x-1 md:pt-[1%] h-screen w-full justify-center'>
      <FullScreenMenu isLoading={isLoading} />
      <div className='flex-col md:h-[98%] bg-white md:rounded-lg flex gap-y-4 max-w-[1280px] w-full'>
        <div className='flex w-[90%] mx-auto h-[10%]'>
          <div className='xss:hidden md:block mr-4 h-12 mt-3'>
            <img className='h-full mx-auto' src='/icon/layout/logo.png'></img>
          </div>
          <Search />
        </div>
        {children}
      </div>
      <FullScreenMenu isLoading={isLoading} />
    </div>
  )
}

const LayoutAuthMobile = (props: { children: JSX.Element }) => {
  const { children } = props
  const [openMenu, setOpenMenu] = useState(false)

  const closeMenu = useCallback(() => {
    setOpenMenu(false)
  }, [])

  return (
    <div className='flex flex-col h-screen w-full'>
      <div className='flex w-[90%] mx-auto h-[10%] items-center'>
        <RxHamburgerMenu
          className='w-7 h-7 mr-2 p-1 hover:bg-slate-300 xl:hidden md:w-9 md:h-9'
          onClick={() => setOpenMenu((prev) => !prev)}
        />
        <Search />
      </div>
      <MobileMenu isOpen={openMenu} close={closeMenu} />
      {children}
    </div>
  )
}

export default function LayoutHome(props: LayoutProps) {
  const { children } = props
  const { isFullScreen } = useIsMobile()

  return isFullScreen ? (
    <LayoutAuthPC children={children} />
  ) : (
    <LayoutAuthMobile children={children} />
  )
}