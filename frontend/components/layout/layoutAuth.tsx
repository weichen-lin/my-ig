import Search from 'components/disk/search'
import useAuth from 'hooks/auth/useAuth'
import { Loading } from 'components/utils'
import { Hinter } from 'components/disk'
import { useIsMobile } from 'hooks/disk'
import clsx from 'clsx'

interface LayoutProps {
  children: JSX.Element
}

export default function LayoutAuth({ children }: LayoutProps) {
  // const { isAuth } = useAuth()

  const isMobile = useIsMobile()

  return (
    <div className='bg-slate-100 flex gap-x-4'>
      <div className='flex-none bg-red-100'>1312</div>
      <div className='flex-1 flex h-screen w-screen flex-col max-w-[1280px] mx-auto relative'>
        <div className='h-[98%] my-[1%] bg-white rounded-lg flex flex-col gap-y-4'>
          <div className='flex w-[90%] mx-auto'>
            <div className='xss:hidden md:block mr-4 h-12 mt-3'>
              <img className='h-full mx-auto' src='/icon/layout/logo.png'></img>
            </div>
            <Search />
          </div>
          {children}
        </div>
      </div>
      <div className='flex-none bg-red-100'>1312</div>
      {!isMobile && <Hinter />}
    </div>
  )
}
