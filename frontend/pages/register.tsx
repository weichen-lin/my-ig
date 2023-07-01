import { Layout, RegisterChecker } from 'components/layout'
import { CookieParser } from 'hooks/utils'
import {
  AuthInput,
  AuthButton,
  AuthStatus,
  EmailChecker,
  PasswordChecker,
} from 'components/auth'
import clsx from 'clsx'
import { useRegister } from 'hooks/auth'
import { GetServerSideProps } from 'next'

export default function RegisterPage(props: { token: string }) {
  const { token } = props

  const {
    isRequest,
    registerInfo,
    handleRegisterInfo,
    errMsg,
    handleRegister,
    successMsg,
    goLogin,
    btnDisabled,
    validateEmail,
    validatePwd,
  } = useRegister()

  return (
    <RegisterChecker token={token}>
      <Layout>
        <>
          <div className='w-4/5 md:min-w-[350px] max-w-[350px] mx-auto flex flex-col gap-y-8 justify-between'>
            <AuthInput
              label='email'
              type='text'
              value={registerInfo.email}
              validate={validateEmail}
              onChange={(e) => {
                handleRegisterInfo('email', e.target.value)
              }}
              Error={EmailChecker}
            />
            <AuthInput
              label='password'
              type='password'
              value={registerInfo.password}
              validate={validatePwd}
              onChange={(e) => {
                handleRegisterInfo('password', e.target.value)
              }}
              Error={PasswordChecker}
            />
            <AuthButton
              label='註冊'
              isRequest={isRequest}
              onClick={handleRegister}
              disabled={btnDisabled}
            />
            <p className='w-full md:w-2/3 md:mx-auto text-center text-gray-700'>
              已經有帳號了嗎？
              <span
                className='ml-2 text-blue-700 hover:cursor-pointer hover:bg-gray-100'
                onClick={goLogin}
              >
                點此登入
              </span>
            </p>
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
    </RegisterChecker>
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
