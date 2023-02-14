import { Layout } from 'components/layout'
import { AuthInput, AuthButton, AuthError, AuthSuccess } from 'components/auth'
import clsx from 'clsx'
import useLogin from 'hooks/auth/useLogin'

export default function LoginPage() {
  const {
    isRequest,
    loginInfo,
    handleRegisterInfo,
    isError,
    errMsg,
    handleLogin,
    isSuccess,
    successMsg
  } = useLogin()

  return (
    <>
      <div
        className={clsx(
          'mx-auto flex flex-col mt-[10%] xl:mt-[2%]',
          'w-4/5 xl:w-2/5'
        )}
      >
        <AuthInput
          label='email'
          type='text'
          value={loginInfo.email}
          isError={isError}
          onChange={(e) => {
            handleRegisterInfo('email', e.target.value)
          }}
        />
        <AuthInput
          label='password'
          type='password'
          value={loginInfo.password}
          isError={isError}
          onChange={(e) => {
            handleRegisterInfo('password', e.target.value)
          }}
        />
        <AuthButton
          label='Login'
          isRequest={isRequest || isSuccess}
          onClick={() => {
            handleLogin(loginInfo)
          }}
        />
      </div>
      {isError ? (
        <div
          className={clsx(
            'mx-auto',
            'w-4/5 xl:w-2/5 mt-[20%] xss:mt-[25%] xs:mt-[20%] sm:mt-[15%] md:mt-[15%] lg:mt-[10%] xl:mt-[7%]'
          )}
        >
          <AuthError message={errMsg} />
        </div>
      ) : (
        <></>
      )}
      {isSuccess ? (
        <div
          className={clsx(
            'mx-auto',
            'w-2/5 xl:w-2/5 mt-[20%] xss:mt-[25%] xs:mt-[20%] sm:mt-[15%] md:mt-[15%] lg:mt-[10%] xl:mt-[7%]'
          )}
        >
          <AuthSuccess message={successMsg} />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

LoginPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}
