import Search from 'components/disk/search'
import { useIsMobile } from 'hooks/disk'
import { RxHamburgerMenu } from 'react-icons/rx'
import { IgProvider } from 'context/IgContext'
import { GetServerSideProps } from 'next'

interface LayoutProps {
  children: JSX.Element
  token: string | null
}

const LayoutAuthPC = ({ children }: { children: JSX.Element }) => {
  return (
    <div className='bg-slate-300 flex gap-x-1 md:pt-[1%] h-screen w-full justify-center'>
      <div className='flex-col md:h-[98%] bg-white md:rounded-lg flex gap-y-4 max-w-[1280px] w-full'>
        <div className='flex w-[90%] mx-auto h-[10%]'>
          <div className='xss:hidden md:block mr-4 h-12 mt-3'>
            <img className='h-full mx-auto' src='/icon/layout/logo.png'></img>
          </div>
          <Search />
        </div>
        {children}
      </div>
    </div>
  )
}

const LayoutAuthMobile = (props: { children: JSX.Element }) => {
  const { children } = props

  return (
    <div className='flex flex-col h-screen w-full'>
      <div className='flex w-[90%] mx-auto h-[10%] items-center'>
        <RxHamburgerMenu className='w-7 h-7 mr-2 p-1 hover:bg-slate-300 xl:hidden md:w-9 md:h-9' />
        <Search />
      </div>
      {children}
    </div>
  )
}

export default function LayoutAuth(props: LayoutProps) {
  const { children, token } = props
  const { isFullScreen } = useIsMobile()

  if (!token) return null

  return (
    <IgProvider token={token}>
      {isFullScreen ? (
        <LayoutAuthPC children={children} />
      ) : (
        <LayoutAuthMobile children={children} />
      )}
    </IgProvider>
  )
}
