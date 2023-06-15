import Search from 'components/disk/search'
import useAuth from 'hooks/auth/useAuth'
import { Loading } from 'components/utils'
import { Hinter, Cover } from 'components/disk'
import { useIsMobile } from 'hooks/disk'
import clsx from 'clsx'

interface LayoutProps {
  children: JSX.Element
}

export default function LayoutAuth({ children }: LayoutProps) {
  // const { isAuth } = useAuth()

  const isMobile = useIsMobile()

  return (
    <div className='bg-slate-300 flex gap-x-1 md:pt-[1%] h-screen w-full'>
      {!isMobile && (
        <div className='flex-auto mx-3'>
          <div className='flex-col h-[98%] bg-white rounded-lg flex gap-y-4 max-w-[300px]'></div>
        </div>
      )}
      <div className='flex-col md:h-[98%] bg-white md:rounded-lg flex gap-y-4 max-w-[1280px] w-full'>
        <div className='flex w-[90%] mx-auto h-[10%]'>
          <div className='xss:hidden md:block mr-4 h-12 mt-3'>
            <img className='h-full mx-auto' src='/icon/layout/logo.png'></img>
          </div>
          <Search />
        </div>
        {children}
      </div>
      {!isMobile && (
        <div className='flex-auto mx-3'>
          <div className='flex-col h-[98%] bg-white rounded-lg flex gap-y-4 max-w-[300px]'></div>
        </div>
      )}
      {!isMobile && <Hinter />}
      <Cover />
    </div>
  )
}
