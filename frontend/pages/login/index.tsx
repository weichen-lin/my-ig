import { Layout } from 'components/layout'
import { AuthInput, AuthButton, AuthStatus } from 'components/auth'
import clsx from 'clsx'
import { useLogin } from 'hooks/auth'

import { FcGoogle } from 'react-icons/fc'
import { IoLogoGithub, IoLogoFacebook, IoIosMail } from 'react-icons/io'

const IconClass =
  'w-[40px] h-[40px] mx-1 p-1 hover:bg-gray-200 hover:cursor-pointer hover:rounded-md'

const IconClassFacebook =
  'w-[40px] h-[40px] mx-1 py-[1px] hover:bg-gray-200 hover:cursor-pointer hover:rounded-md'

export default function LoginPage() {
  const {
    isRequest,
    loginInfo,
    handleAuthInfo,
    errMsg,
    handleLogin,
    successMsg,
    goRegister,
    btnDisabled,
  } = useLogin()

  return (
    <>
      <div
        className={clsx(
          'mx-auto flex flex-col mt-[10%] sm:mt-[4%] xl:mt-[2%]',
          'w-4/5 xl:w-2/5 gap-y-8'
        )}
      >
        <AuthInput
          label='email'
          type='text'
          value={loginInfo.email}
          onChange={(e) => {
            handleAuthInfo('email', e.target.value)
          }}
        />
        <AuthInput
          label='password'
          type='password'
          value={loginInfo.password}
          onChange={(e) => {
            handleAuthInfo('password', e.target.value)
          }}
        />
        <AuthButton
          label='登入'
          isRequest={isRequest}
          onClick={() => {
            handleLogin(loginInfo)
          }}
          disabled={btnDisabled}
        />
        <div
          className={clsx(
            'w-full md:w-2/3 mx-auto flex justify-center items-center mt-12 sm:mt-4 md:mt-1'
          )}
        >
          <FcGoogle className={IconClass} />
          <IoLogoFacebook className={IconClassFacebook} fill='#385997' />
          <IoLogoGithub className={IconClass} />
          <div className='border-r-[1px] border-gray-500 h-full mx-8'></div>
          <IoIosMail className={IconClass} onClick={goRegister} />
        </div>
      </div>
      {errMsg && (
        <div
          className={clsx(
            'mx-auto',
            'w-4/5 xl:w-2/5 xss:mt-[15%] xs:mt-[10%] sm:mt-[5%] md:mt-[3%]'
          )}
        >
          <AuthStatus message={errMsg} status='failed' />
        </div>
      )}
      {successMsg && (
        <div
          className={clsx(
            'mx-auto',
            'w-4/5 xl:w-2/5 xss:mt-[15%] xs:mt-[10%] sm:mt-[5%] md:mt-[3%]'
          )}
        >
          <AuthStatus message={successMsg} status='success' />
        </div>
      )}
    </>
  )
}

LoginPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}
