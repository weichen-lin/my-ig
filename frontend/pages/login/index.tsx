import { GuestChecker, Layout } from 'components/layout'
import { AuthInput, AuthButton, AuthStatus } from 'components/auth'
import { useLogin } from 'hooks/auth'
import { CookieParser } from 'hooks/utils'
import { GetServerSideProps } from 'next'
import { FcGoogle } from 'react-icons/fc'
import { IoLogoGithub, IoLogoFacebook, IoIosMail } from 'react-icons/io'

const IconClass =
  'w-[40px] h-[40px] mx-1 p-1 hover:bg-gray-200 hover:cursor-pointer hover:rounded-md'

const IconClassFacebook =
  'w-[40px] h-[40px] mx-1 py-[1px] hover:bg-gray-200 hover:cursor-pointer hover:rounded-md'

export default function LoginPage(props: { token: string }) {
  const { token } = props

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
    <GuestChecker token={token}>
      <Layout>
        <>
          <div className='mx-auto flex flex-col w-4/5 md:min-w-[350px] max-w-[350px] gap-y-8'>
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
              onClick={handleLogin}
              disabled={btnDisabled}
            />
            <div className='w-full md:w-2/3 mx-auto lg:min-w-[300px] flex justify-center items-center'>
              <FcGoogle className={IconClass} />
              <IoLogoFacebook className={IconClassFacebook} fill='#385997' />
              <IoLogoGithub className={IconClass} />
              <div className='border-r-[1px] border-gray-500 h-full mx-8'></div>
              <IoIosMail className={IconClass} onClick={goRegister} />
            </div>
          </div>
          {errMsg && (
            <div className='mx-auto w-4/5 md:min-w-[350px] max-w-[350px]'>
              <AuthStatus message={errMsg} status='failed' />
            </div>
          )}
          {successMsg && (
            <div className='mx-auto w-4/5 md:min-w-[350px] max-w-[350px]'>
              <AuthStatus message={successMsg} status='success' />
            </div>
          )}
        </>
      </Layout>
    </GuestChecker>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookie = req.headers.cookie
  const token = CookieParser({ cookie, name: 'my-ig-token' })

  return {
    props: {
      token,
    },
  }
}
