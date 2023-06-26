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

import { MdUploadFile, MdOutlineCheck } from 'react-icons/md'

export default function SettingPage(props: TokenProp) {
  const { token, current } = props

  return (
    <LayoutHome>
      <div className='border-2 border-gray-100 rounded-lg p-4 w-[90%] mx-auto flex flex-col'>
        <p className='text-2xl text-gray-500'>Profile Setting</p>
        <div className='border-t-[1px] border-gray-300/70 w-full my-2'></div>
        <div className='mx-auto my-4 flex flex-col gap-y-4 items-center justify-center'>
          <img
            src='https://www.computerhope.com/jargon/g/guest-user.png'
            className='w-32 h-32'
          ></img>
          <div className='relative w-[100px] h-16 mx-auto'>
            <div className='w-full absolute active:top-1 rounded-md border border-gray-100 bg-blue-100 p-1 px-4 shadow-md'>
              <label
                htmlFor='upload'
                className='flex items-center gap-2 cursor-pointer'
              >
                <MdUploadFile className='w-6 h-6 ' />
                <span className='text-gray-600 font-medium'>上傳</span>
              </label>
              <input id='upload' type='file' className='hidden' />
            </div>
          </div>
        </div>
        <div className='flex flex-col mb-6 w-full items-start gap-4'>
          <p className='uppercase text-gray-500 font-bold'>Contact Email</p>
          <div className='flex flex-col md:flex-row md:items-center gap-4'>
            <div className='text-black'>asdfg09487@gmail.com</div>
            <div className='flex items-center'>
              <div className='flex items-center gap-x-1 mr-4 bg-green-100 rounded-md p-1 px-2'>
                <MdOutlineCheck fill='#16a34a' />
                已驗證
              </div>
              <button className='border p-1 w-16 rounded-md border-blue-300'>
                Edit
              </button>
            </div>
          </div>
        </div>
        {/* <div className='flex flex-col mb-6 w-1/2'>
          <p className='uppercase text-gray-500 mb-4'>Full Name</p>
          <div className='flex flex-col'>
            <div className='text-black '>asdfg09487@gmail.com</div>
            <button className='border p-1 w-16 mt-4 rounded-md border-blue-300'>
              Edit
            </button>
          </div>
        </div>
        <div className='flex flex-col mb-6 w-1/2'>
          <p className='uppercase text-gray-500 mb-4'>Password</p>
          <div className='flex flex-col'>
            <div className='text-black '>asdfg09487@gmail.com</div>
            <button className='border p-1 w-16 mt-4 rounded-md border-blue-300'>
              Edit
            </button>
          </div>
        </div> */}
      </div>
    </LayoutHome>
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
