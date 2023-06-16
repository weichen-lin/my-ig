import Search from 'components/disk/search'
import useAuth from 'hooks/auth/useAuth'
import { Loading } from 'components/utils'
import { Hinter, MobileMenu, FullScreenMenu } from 'components/disk'
import { useIsMobile } from 'hooks/disk'
import clsx from 'clsx'

interface LayoutProps {
  children: JSX.Element
}

const LayoutAuthPC = ({ children }: LayoutProps) => {
  return (
    <div className='bg-slate-300 flex gap-x-1 md:pt-[1%] h-screen w-full justify-center'>
      <FullScreenMenu />
      <div className='flex-col md:h-[98%] bg-white md:rounded-lg flex gap-y-4 max-w-[1280px] w-full'>
        <div className='flex w-[90%] mx-auto h-[10%]'>
          <div className='xss:hidden md:block mr-4 h-12 mt-3'>
            <img className='h-full mx-auto' src='/icon/layout/logo.png'></img>
          </div>
          <Search />
        </div>
        {children}
      </div>
      <FullScreenMenu />
      <Hinter />
    </div>
  )
}

const LayoutAuthMobile = (props: { children: JSX.Element }) => {
  const { children } = props

  return (
    <div className='flex flex-col h-screen w-full'>
      <div className='flex w-[90%] mx-auto h-[10%]'>
        <Search />
      </div>
      {children}
      <MobileMenu />
    </div>
  )
}

export default function LayoutAuth(props: LayoutProps) {
  const { children } = props
  const { isMobile, isFullScreen } = useIsMobile()
  return isFullScreen ? (
    <LayoutAuthMobile children={children} />
  ) : (
    <LayoutAuthPC children={children} />
  )
}
