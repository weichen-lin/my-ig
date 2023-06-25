import {
  Sort,
  GdriveLikeDisk,
  Operator,
  ImagePlayground,
  UploadTasks,
  BreadCrumbs,
  Hinter,
} from 'components/disk'
import { GetServerSideProps } from 'next'

import { LayoutHome } from 'components/layout'
import { IgProvider } from 'context'
import { CookieParser, TokenProp } from 'hooks/utils'

export default function SettingPage(props: TokenProp) {
  const { token, current } = props

  return (
    <IgProvider token={token} current={current}>
      <LayoutHome>
        <div className='border-2 border-gray-100 rounded-lg p-4 w-[90%] mx-auto'>
          <p className='font-semibold'>Profile</p>
          <div className='border-t-[1px] border-gray-300/70 w-full my-2'></div>
        </div>
      </LayoutHome>
    </IgProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const url = req.url

  const cookie = req.headers.cookie
  const token = CookieParser({ cookie, name: 'my-ig-token' })

  return {
    props: {
      token,
      current: url?.split('/').pop(),
    },
  }
}
