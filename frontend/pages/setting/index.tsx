import { Sort, GdriveLikeDisk, Operator, ImagePlayground, UploadTasks, BreadCrumbs, Hinter } from 'components/disk'
import { GetServerSideProps } from 'next'

import { LayoutHome } from 'components/layout'
import { IgProvider } from 'context'
import { CookieParser, TokenProp } from 'hooks/utils'

import { MdUploadFile, MdOutlineCheck } from 'react-icons/md'

import { AuthInput } from 'components/auth'

export default function SettingPage(props: TokenProp) {
  const { token, current } = props

  return (
    <IgProvider token={token} current={current}>
      <LayoutHome>
        <div className='border-2 border-gray-100 rounded-lg p-4 w-[90%] mx-auto flex flex-col'>
          <p className='text-2xl text-gray-500'>檔案設定</p>
          <div className='border-t-[1px] border-gray-300/70 w-full my-4'></div>
          <div className='flex flex-col mb-6 w-full items-start gap-4 mt-4'>
            <p className='uppercase text-gray-500 font-bold'>信箱</p>
            <div className='flex flex-col md:flex-row md:items-center gap-4'>
              <div className='text-black'>asdfg09487@gmail.com</div>
              <div className='flex items-center'>
                <div className='flex items-center gap-x-1 mr-4 bg-green-100 rounded-md p-1 px-2'>
                  <MdOutlineCheck fill='#16a34a' />
                  已驗證
                </div>
                <button className='border p-1 w-16 rounded-md border-blue-300'>編輯</button>
              </div>
            </div>
          </div>
          <div className='flex flex-col mb-6 w-full items-start gap-4 mt-4'>
            <p className='uppercase text-gray-500 font-bold'>密碼</p>
            <div className='flex flex-col w-full md:flex-row md:items-center gap-4'>
              <div className='w-[250px]'>
                <AuthInput
                  type='password'
                  label=''
                  value={''}
                  onChange={() => {}}
                  validate={(e: string) => {
                    return false
                  }}
                />
              </div>
              {/* <p className='text-gray-300'>************</p> */}
              <div className='flex items-center'>
                <button className='border p-1 w-16 rounded-md border-blue-300'>重設</button>
              </div>
            </div>
          </div>
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
