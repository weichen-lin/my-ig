import { Layout } from 'components/layout'
import { AuthInput, AuthButton, AuthStatus } from 'components/auth'
import { useLogin, useAuth } from 'hooks/auth'
import { GetServerSideProps } from 'next'
import { FcGoogle } from 'react-icons/fc'
import { IoLogoGithub, IoLogoFacebook, IoIosMail } from 'react-icons/io'
import { Loading } from 'components/utils'
import { RecoilEnv } from 'recoil'
import { CookieParser } from 'hooks/utils'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

const IconClass = 'w-[40px] h-[40px] mx-1 p-1 hover:bg-gray-200 hover:cursor-pointer hover:rounded-md'

const IconClassFacebook = 'w-[40px] h-[40px] mx-1 py-[1px] hover:bg-gray-200 hover:cursor-pointer hover:rounded-md'

const cookieName = process.env.USER_AUTH_COOKIE_NAME ?? ''

export default function LoginPage(props: { token: string }) {
  const { token } = props
  const { checkAuth } = useAuth({ token: token, needRouting: false })

  const { isRequest, loginInfo, handleAuthInfo, error, run, successMsg, goRegister, btnDisabled } = useLogin()

  const errMsg = '帳號或密碼錯誤，請重新輸入'

  return (
    <Layout>
      {!checkAuth ? (
        <Loading />
      ) : (
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
          <AuthButton label='登入' isRequest={isRequest} onClick={() => run(loginInfo)} disabled={btnDisabled} />
          <div className='w-full md:w-2/3 mx-auto lg:min-w-[300px] flex justify-center items-center'>
            <FcGoogle className={IconClass} />
            <IoLogoFacebook className={IconClassFacebook} fill='#385997' />
            <IoLogoGithub className={IconClass} />
            <div className='border-r-[1px] border-gray-500 h-full mx-8'></div>
            <IoIosMail className={IconClass} onClick={goRegister} />
          </div>
          {error && (
            <div className='mx-auto w-4/5 md:min-w-[350px] max-w-[350px]'>
              <AuthStatus message={errMsg} status='failed' />
            </div>
          )}
          {successMsg && (
            <div className='mx-auto w-4/5 md:min-w-[350px] max-w-[350px]'>
              <AuthStatus message={successMsg} status='success' />
            </div>
          )}
        </div>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookie = req.headers.cookie
  const token = CookieParser({ cookie, name: cookieName })

  return {
    props: {
      token,
    },
  }
}
