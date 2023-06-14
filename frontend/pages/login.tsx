import { Layout } from 'components/layout'
import { AuthInput, AuthButton, AuthStatus } from 'components/auth'
import clsx from 'clsx'
import useLogin from 'hooks/auth/useLogin'

import { FcGoogle } from 'react-icons/fc'
import { IoLogoGithub, IoLogoFacebook, IoIosMail } from 'react-icons/io'
import { GetServerSideProps } from 'next'

import { Loading } from 'components/utils'

const IconClass =
  'w-[40px] h-[40px] mx-1 p-1 hover:bg-gray-200 hover:cursor-pointer hover:rounded-md'

const IconClassFacebook =
  'w-[40px] h-[40px] mx-1 py-[1px] hover:bg-gray-200 hover:cursor-pointer hover:rounded-md'

interface LoginPageSSRProps {
  query: string
}

interface OAuth {
  Gituhb: GithubOAuth
}

interface GithubOAuth {
  code: string
}

export default function LoginPage(props: LoginPageSSRProps) {
  const oAuth = props.query
  if (oAuth) return <Loading />

  const {
    isRequest,
    loginInfo,
    handleAuthInfo,
    isError,
    errMsg,
    handleLogin,
    isSuccess,
    successMsg,
    goRegister,
  } = useLogin()

  const btnDisabled = Object.values(loginInfo).some((e) => e === '')

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
            handleAuthInfo('email', e.target.value)
          }}
        />
        <AuthInput
          label='password'
          type='password'
          value={loginInfo.password}
          isError={isError}
          onChange={(e) => {
            handleAuthInfo('password', e.target.value)
          }}
        />
        <AuthButton
          label='登入'
          isRequest={isRequest || isSuccess}
          onClick={() => {
            if (btnDisabled) return
            handleLogin(loginInfo)
          }}
          disabled={btnDisabled}
        />
        <div
          className={clsx(
            'w-full md:w-2/3 mx-auto flex justify-center items-center mt-12'
          )}
        >
          <FcGoogle className={IconClass} />
          <IoLogoFacebook className={IconClassFacebook} fill='#385997' />
          <IoLogoGithub className={IconClass} />
          <div className='border-r-[1px] border-gray-500 h-full mx-8'></div>
          <IoIosMail className={IconClass} onClick={goRegister} />
        </div>
      </div>
      {isError && (
        <div
          className={clsx(
            'mx-auto',
            'w-4/5 xl:w-2/5 mt-[20%] xss:mt-[25%] xs:mt-[20%] sm:mt-[15%] md:mt-[15%] lg:mt-[10%] xl:mt-[7%]'
          )}
        >
          <AuthStatus message={errMsg} status='failed' />
        </div>
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

LoginPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      query: context.query,
    },
  }
}
