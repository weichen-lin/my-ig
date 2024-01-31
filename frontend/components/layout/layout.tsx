export default function Layout(props: { children: JSX.Element }) {
  const { children } = props
  return (
    <div className='w-full h-screen flex flex-col'>
      <div className='flex flex-col flex-1 items-center justify-center gap-y-12'>
        <img className='h-[80px] md:h-[120px]' src='/icon/layout/logo.png'></img>
        {children}
      </div>
      <div className='w-full text-center p-2'>© WeiChen Lin 2024</div>
    </div>
  )
}
