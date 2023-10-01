import { Loading } from 'components/utils'
import { GetServerSideProps } from 'next'
import { CookieParser } from 'hooks/utils'
import { useAuth } from 'hooks/auth'

const cookieName = process.env.USER_AUTH_COOKIE_NAME ?? ''

export default function IndexPage(props: { token: string }) {
  const { token } = props
  const { isAuth } = useAuth({ token: token, isRegisterPage: false })
  return !isAuth ? <Loading /> : <></>
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
