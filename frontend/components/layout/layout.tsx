import clsx from 'clsx'

interface LayoutProps {
  children: JSX.Element
}

export default function Layout(props: LayoutProps) {
  const { children } = props
  return (
    <div className='w-full h-screen flex flex-col justify-start'>
      <div>
        <img
          className={clsx('mx-auto mt-48', 'h-[80px] md:h-[120px]')}
          src='/icon/layout/logo.png'
        ></img>
      </div>
      {children}
      <div className='fixed bottom-0 w-full text-center p-2'>
        © WeiChen Lin 2023
      </div>
    </div>
  )
}
