import { KushareDrive, Operator, BreadCrumbs, HintContainer } from 'components/disk'
import { LayoutHome } from 'components/layout'
import { RecoilRoot, RecoilEnv } from 'recoil'
import { GetServerSideProps } from 'next'
import { CookieParser } from 'hooks/utils'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
const cookieName = process.env.USER_AUTH_COOKIE_NAME ?? ''

export default function Drive() {
  return (
    <RecoilRoot>
      <LayoutHome>
        <div className='flex flex-col h-[90%]'>
          <div className='flex flex-wrap w-[92%] items-center mx-auto'>
            <Operator />
            <BreadCrumbs />
          </div>
          <KushareDrive />
          <HintContainer />
        </div>
      </LayoutHome>
    </RecoilRoot>
  )
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
