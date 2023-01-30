import Layout from 'components/layout'
import {
  AuthInput,
  AuthButton,
  AuthError,
  AuthBackBone,
  AuthSuccess
} from 'components/auth'
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
    successMsg
  } = useRegister()

  return (
    <AuthBackBone
      currentChildren={
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
              onChange={(e) => {
                handleRegisterInfo('password', e.target.value)
              }}
            />
            <AuthInput
              isError={pwdError}
              label='confirmed_password'
              type='password'
              value={registerInfo.confirmed_password}
              onChange={(e) => {
                handleRegisterInfo('confirmed_password', e.target.value)
              }}
            />
            <AuthButton
              label='Register'
              isRequest={isRequest}
              onClick={() => {
                handleRegister(registerInfo)
              }}
            />
          </div>
          {emailError || pwdError ? (
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
      }
    />
  )
}

RegisterPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}
