import { Loading } from 'components/utils'
import { GetServerSideProps } from 'next'
import { CookieParser } from 'hooks/utils'
import { GuestChecker } from 'components/layout'
import { IgProvider } from 'context'

export default function IndexPage(props: { token: string }) {
  const { token } = props

  return (
    <GuestChecker token={token}>
      <Loading />
    </GuestChecker>
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
