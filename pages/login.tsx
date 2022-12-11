import Layout from 'components/layout'
import Login from 'components/login'

export default function LoginPage() {
  return <Login />
}

LoginPage.getLayout = function getLayout(page: JSX.Element) {
  return <Layout>{page}</Layout>
}
