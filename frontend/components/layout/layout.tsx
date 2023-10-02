import clsx from 'clsx'

export default function Layout(props: { children: JSX.Element }) {
  const { children } = props
  return (
    <div className='w-full h-screen flex flex-col justify-start gap-y-12'>
      <div>
        <img className={clsx('mx-auto xss:mt-24 xl:mt-48', 'h-[80px] md:h-[120px]')} src='/icon/layout/logo.png'></img>
      </div>
      {children}
      <div className='fixed bottom-0 w-full text-center p-2'>© WeiChen Lin 2023</div>
    </div>
  )
}
