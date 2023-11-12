import { KushareDrive, Operator, BreadCrumbs, SelectRegion } from 'components/disk'
import { LayoutHome } from 'components/layout'
import { RecoilRoot, RecoilEnv } from 'recoil'
import { GetServerSideProps } from 'next'
import { CookieParser } from 'hooks/utils'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
const cookieName = process.env.USER_AUTH_COOKIE_NAME ?? ''

export default function Drive() {
  return (
    <RecoilRoot>
      <LayoutHome>
        <div className='flex flex-col h-[90%]'>
          <div className='flex flex-wrap w-full items-center gap-y-2 xl:gap-y-5 px-[5%] xl:px-0'>
            <Operator />
            <SelectRegion />
            <BreadCrumbs />
          </div>
          <KushareDrive />
          <ToastContainer />
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
