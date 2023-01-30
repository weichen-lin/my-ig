import clsx from 'clsx'

interface LayoutProps {
  children: JSX.Element
}

export default function Layout(props: LayoutProps) {
  const { children } = props
  return (
    <div className='w-full h-screen flex flex-col justify-center'>
      <div className='w-full mx-auto'>
        <img
          className={clsx('mx-auto', 'h-[80px] md:h-[120px]')}
          src='/icon/layout/logo.png'
        ></img>
      </div>
      {children}
      <div className='fixed bottom-0 w-full text-center p-2'>
        © WeiChen Lin 2022
      </div>
    </div>
  )
}

// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }
