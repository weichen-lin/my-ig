import { Loading } from 'components/utils'
import { GetServerSideProps } from 'next'
import { useCookie } from 'hooks/utils'
import LayoutTest from 'components/layout/LayoutTest'

export default function IndexPage() {
  return <Loading />
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
