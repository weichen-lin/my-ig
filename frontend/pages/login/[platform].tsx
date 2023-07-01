import { Layout } from 'components/layout'
import { GetServerSideProps } from 'next'

import { Loading } from 'components/utils'

import { useOAuth, oAuth } from 'hooks/auth'

interface LoginPageSSRProps {
  query: oAuth
}

export default function OauthPage(props: LoginPageSSRProps) {
  const { query } = props

  useOAuth(query)

  return <Loading />
}

OauthPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query)
  return {
    props: {
      query,
    },
  }
}
