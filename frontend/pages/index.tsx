import { Loading } from 'components/utils'
import { GetServerSideProps } from 'next'
import { useCookie } from 'hooks/utils'
import { LayoutCheckToken } from 'components/layout'

export default function IndexPage(props: { token: string }) {
  const { token } = props

  return (
    <LayoutCheckToken token={token}>
      <Loading />
    </LayoutCheckToken>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookie = req.headers.cookie
  const token = useCookie({ cookie, name: 'my-ig-token' })

  return {
    props: {
      token,
    },
  }
}
