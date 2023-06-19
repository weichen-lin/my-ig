import { LayoutAuth } from 'components/layout'
import { Loading } from 'components/utils'
import { useAuth } from 'hooks/auth'

export default function IndexPage() {
  const { isAuth } = useAuth()

  return <Loading />
}

IndexPage.getLayout = function getLayout(page: JSX.Element) {
  return <LayoutAuth>{page}</LayoutAuth>
}
