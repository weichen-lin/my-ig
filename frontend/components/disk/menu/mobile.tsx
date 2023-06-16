import clsx from 'clsx'
import { useState } from 'react'
import {
  CiHome,
  CiShare2,
  CiSettings,
  CiCloudOn,
  CiLogout,
} from 'react-icons/ci'
import { IconType } from 'react-icons'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(true)
  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className='relative'>
      <div
        className={clsx(
          'fixed bottom-0 left-0 w-full h-screen bg-slate-700 opacity-20'
        )}
        onClick={handleOpen}
      ></div>
      <div
        className={clsx(
          'fixed bottom-0 left-0 w-[200px] h-screen bg-white z-10',
          'flex flex-col items-center',
          'transition-all duration-300 ease-linear',
          `${isOpen ? 'translate-x-0' : '-translate-x-[200px]'}`
        )}
      >
        <div className='rounded-full overflow-hidden w-24 h-24 my-4'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYWSJXT-Og2fhBhVQjF0lQtRbFaL-ZbROWQ&usqp=CAU'
            className='w-full h-full'
          ></img>
        </div>
        <p className='text-lg text-center w-full px-4 truncate max-w-[130px] 4xl:max-w-[260px] my-2'>
          WeiChen LinWeiChen Lin
        </p>
        <div className='border-t-[1px] border-gray-300/40 w-full'></div>
        <MenuItem Icon={CiHome} name='首頁' />
        <MenuItem Icon={CiShare2} name='分享' />
        <MenuItem Icon={CiSettings} name='設定' />
        <div className='border-t-[1px] border-gray-300/40 w-full'></div>
        <MenuItem Icon={CiCloudOn} name='儲存空間' />
        <meter className='w-full px-4' min='0' max='15' value='5'></meter>
        <p className='text-gray-500 text-sm text-left w-full pl-4'>
          已使用 5 GB，共 15 GB
        </p>
        <div className='flex-1'></div>
        <MenuItem Icon={CiLogout} name='登出' />
      </div>
    </div>
  )
}

const MenuItem = (props: { Icon: IconType; name: string }) => {
  const { Icon, name } = props
  return (
    <div className='w-full py-3 flex justify-start items-center'>
      <Icon className='w-7 h-7 mx-3' />
      <span className=''>{name}</span>
    </div>
  )
}
