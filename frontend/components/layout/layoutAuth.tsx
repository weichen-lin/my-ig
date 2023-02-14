import Search from 'components/disk/search'
import useAuth from 'hooks/auth/useAuth'
import { Loading } from 'components/utils'

interface LayoutProps {
  children: JSX.Element
}

export default function LayoutAuth({ children }: LayoutProps) {
  const { isAuth } = useAuth()
  return (
    <div className='flex h-screen w-screen flex-col max-w-[1280px] mx-auto relative'>
      <div className='flex w-[90%] mx-auto'>
        <div className='xss:hidden md:block mr-4 h-12 mt-3'>
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
