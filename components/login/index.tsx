import { Logo } from 'public/icon/layout'
import clsx from 'clsx'
import Image from 'next/image'
import LoginInput from 'components/login/input'
import LoginButton from 'components/login/button'

export default function Login() {
  return (
    <div className='w-full h-screen'>
      <div className='h-4/5 flex flex-col pt-[20%]'>
        <div
          className={clsx('flex w-1/2 h-[60px] mx-auto pt-4 lg:justify-center')}
        >
          <Image
            src='/icon/layout/logoImg.png'
            alt='logo'
            width={60}
            height={60}
          ></Image>
          <Logo className='w-full h-full ml-4 lg:w-2/3 lg:ml-1 xl:w-1/2' />
        </div>
        <div className='w-2/3 h-2/3 mx-auto flex flex-col mt-4 justify-center xl:w-1/2'>
          <LoginInput label='username' />
          <LoginInput label='password' />
          <LoginButton />
        </div>
        <div className='fixed bottom-0 w-full text-center p-2'>
          © WeiChen Lin 2022
        </div>
      </div>
    </div>
  )
}

// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }
