import clsx from 'clsx'
import Search from 'components/disk/search'
import useAuth from 'hooks/auth/useAuth'
import { Loading, Transition } from 'components/utils'

interface LayoutProps {
  children: JSX.Element
}

export default function LayoutAuth({ children }: LayoutProps) {
  const { isAuth } = useAuth()
  return (
    <div className='flex h-screen w-[90%] flex-col max-w-[1280px] mx-auto relative'>
      <div className='flex'>
        <div className='w-[20%] mx-auto h-12 mt-3'>
          <img className='h-full mx-auto' src='/icon/layout/logo.png'></img>
        </div>
        <Search />
      </div>
      {isAuth ? (
        children
      ) : (
        <div className='flex-1'>
          <Loading />
        </div>
      )}
    </div>
  )
}
