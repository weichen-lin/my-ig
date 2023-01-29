import clsx from 'clsx'
import LoginInput from 'components/login/input'
import LoginButton from 'components/login/button'
import LoginError from 'components/login/loginError'

export default function Login() {
  return (
    <div className='w-full h-screen flex flex-col justify-center'>
      <div className='w-full mx-auto'>
        <img
          className={clsx('mx-auto', 'h-[80px] md:h-[120px]')}
          src='/icon/layout/logo.png'
        ></img>
      </div>
      <div
        className={clsx(
          'mx-auto flex flex-col mt-[10%] xl:mt-[2%]',
          'w-4/5 xl:w-2/5'
        )}
      >
        <LoginInput label='username' type='email' />
        <LoginInput label='password' type='password' />
        <LoginButton />
      </div>
      <div
        className={clsx(
          'mx-auto',
          'w-4/5 xl:w-2/5 mt-[25%] md:mt-[15%] lg:mt-[10%] xl:mt-[6%]'
        )}
      >
        <LoginError message='帳號或密碼錯誤，請重新輸入' />
      </div>
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
