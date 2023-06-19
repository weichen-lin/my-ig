import { Layout } from 'components/layout'
import {
  AuthInput,
  AuthButton,
  AuthStatus,
  EmailChecker,
  PasswordChecker,
} from 'components/auth'
import clsx from 'clsx'
import { useRegister } from 'hooks/auth'

export default function RegisterPage() {
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
    <>
      <div
        className={clsx(
          'mx-auto flex flex-col mt-[10%] xl:mt-[2%] gap-y-8',
          'w-4/5 xl:w-2/5'
        )}
      >
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
        <p className='w-full md:w-2/3 md:mx-auto text-center mt-8 text-gray-700'>
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
        <div
          className={clsx(
            'mx-auto',
            'w-4/5 xl:w-2/5 mt-[20%] xss:mt-[25%] xs:mt-[20%] sm:mt-[15%] md:mt-[15%] lg:mt-[10%] xl:mt-[7%]'
          )}
        >
          <AuthStatus message={errMsg} status='failed' />
        </div>
      )}
      {successMsg && (
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
