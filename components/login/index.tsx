import { Logo } from 'public/icon/layout'
import clsx from 'clsx'
import Image from 'next/image'
import LoginInput from 'components/login/input'

export default function Login() {
  return (
    <div className='flex w-full h-screen flex-col'>
      <div className={clsx('flex w-1/2 h-[60px] mx-auto pt-4')}>
        <Image
          src='/icon/layout/logoImg.png'
          alt='logo'
          width={60}
          height={60}
        ></Image>
        <Logo className='w-full h-full ml-4' />
      </div>
      <div className='pt-12 w-2/3 mx-auto flex flex-col'>
        <LoginInput label='username' />
        <LoginInput label='password' />
      </div>
    </div>
  )
}

// sm	640px	@media (min-width: 640px) { ... }
// md	768px	@media (min-width: 768px) { ... }
// lg	1024px	@media (min-width: 1024px) { ... }
// xl	1280px	@media (min-width: 1280px) { ... }
// 2xl	1536px	@media (min-width: 1536px) { ... }
