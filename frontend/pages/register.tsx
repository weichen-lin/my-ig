import { Layout } from 'components/layout'
import { CookieParser } from 'hooks/utils'
import { AuthInput, AuthButton, AuthStatus, EmailChecker, PasswordChecker } from 'components/auth'
import { useRegister, useAuth } from 'hooks/auth'
import { GetServerSideProps } from 'next'
import { Loading } from 'components/utils'
import { RecoilEnv } from 'recoil'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

const cookieName = process.env.NEXT_PUBLIC_COOKIE_NAME ?? ''

export default function RegisterPage(props: { token: string }) {
  const { token } = props
  const { checkAuth } = useAuth({ token: token, needRouting: false })

  const {
    isRequest,
    registerInfo,
    handleRegisterInfo,
    error,
    run,
    successMsg,
    goLogin,
    btnDisabled,
    validateEmail,
    validatePwd,
  } = useRegister()

  return !checkAuth ? (
    <Loading />
  ) : (
    <Layout>
      <div className='w-4/5 md:min-w-[350px] max-w-[350px] flex flex-col gap-y-8'>
        <AuthInput
          label='email'
          type='text'
          value={registerInfo.email}
          validate={validateEmail}
          onChange={e => {
            handleRegisterInfo('email', e.target.value)
          }}
          Error={EmailChecker}
        />
        <AuthInput
          label='password'
          type='password'
          value={registerInfo.password}
          validate={validatePwd}
          onChange={e => {
            handleRegisterInfo('password', e.target.value)
          }}
          Error={PasswordChecker}
        />
        <AuthButton
          label='註冊'
          isRequest={isRequest}
          onClick={() => {
            run(registerInfo)
          }}
          disabled={btnDisabled}
        />
        <p className='w-full text-center text-gray-700'>
          已經有帳號了嗎？
          <span className='ml-2 text-blue-700 hover:cursor-pointer hover:text-gray-700' onClick={goLogin}>
            點此登入
          </span>
        </p>
        {error && <AuthStatus message={''} status='failed' />}
        {successMsg && <AuthStatus message={successMsg} status='success' />}
      </div>
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
