import { Layout } from 'components/layout'
import { AuthInput, AuthButton, AuthStatus } from 'components/auth'
import clsx from 'clsx'
import useRegister from 'hooks/auth/useRegister'

export default function RegisterPage() {
  const {
    isRequest,
    registerInfo,
    handleRegisterInfo,
    emailError,
    pwdError,
    errMsg,
    handleRegister,
    isSuccess,
    successMsg,
    goLogin,
  } = useRegister()

  const btnDisabled = Object.values(registerInfo).every((e) => e === '')

  return (
    <>
      <div
        className={clsx(
          'mx-auto flex flex-col mt-[10%] xl:mt-[2%]',
          'w-4/5 xl:w-2/5'
        )}
      >
        <AuthInput
          isError={emailError}
          label='email'
          type='text'
          value={registerInfo.email}
          onChange={(e) => {
            handleRegisterInfo('email', e.target.value)
          }}
        />
        <AuthInput
          isError={pwdError}
          label='password'
          type='password'
          value={registerInfo.password}
          passwordChecker
          onChange={(e) => {
            handleRegisterInfo('password', e.target.value)
          }}
        />
        <AuthButton
          label='Register'
          isRequest={isRequest}
          onClick={() => {
            handleRegister(registerInfo)
          }}
          disabled={btnDisabled}
        />
        <p className='w-full md:w-2/3 md:mx-auto text-center mt-8 text-gray-700'>
          Already have an account?
          <span
            className='ml-2 text-blue-700 hover:cursor-pointer hover:bg-gray-100'
            onClick={goLogin}
          >
            Sign in
          </span>
        </p>
      </div>
      {emailError || pwdError ? (
        <div
          className={clsx(
            'mx-auto',
            'w-4/5 xl:w-2/5 mt-[20%] xss:mt-[25%] xs:mt-[20%] sm:mt-[15%] md:mt-[15%] lg:mt-[10%] xl:mt-[7%]'
          )}
        >
          <AuthStatus message={errMsg} status='failed' />
        </div>
      ) : (
        <></>
      )}
      {isSuccess && (
        <div
          className={clsx(
            'mx-auto',
            'w-2/5 xl:w-2/5 mt-[20%] xss:mt-[25%] xs:mt-[20%] sm:mt-[15%] md:mt-[15%] lg:mt-[10%] xl:mt-[7%]'
          )}
        >
          <AuthStatus message={successMsg} status='success' />
        </div>
      )}
    </>
  )
}

RegisterPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}
