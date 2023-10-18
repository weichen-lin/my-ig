import { Loading } from 'components/utils'
import { GetServerSideProps } from 'next'
import { CookieParser } from 'hooks/utils'
import { useAuth } from 'hooks/auth'
import { RecoilEnv } from 'recoil'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

const cookieName = process.env.USER_AUTH_COOKIE_NAME ?? ''

export default function IndexPage(props: { token: string }) {
  const { token } = props
  const { checkAuth } = useAuth({ token: token, needRouting: true })
  return !checkAuth ? <Loading /> : <></>
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
