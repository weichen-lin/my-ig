import clsx from 'clsx'
import { useEffect, useState } from 'react'
import {
  CiHome,
  CiShare2,
  CiSettings,
  CiCloudOn,
  CiLogout,
} from 'react-icons/ci'
import { IconType } from 'react-icons'
import Router from 'next/router'

interface MenuItemProps {
  Icon: IconType
  name: string
  handleRoute?: () => void
}

export default function FullScreenMenu() {
  const [isRouting, setIsRouting] = useState(false)

  const handleRoute = (route: string) => {
    setIsRouting(true)
    const Id = setTimeout(() => {
      Router.push(route).finally(() => {
        clearTimeout(Id)
        setIsRouting(false)
      })
    }, 2000)
  }

  return (
    <div className='flex-col h-[98%] bg-white rounded-lg flex gap-y-2 max-w-[300px] py-4 mx-2 flex-auto items-center'>
      <div className='rounded-full overflow-hidden w-24 h-24'>
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYWSJXT-Og2fhBhVQjF0lQtRbFaL-ZbROWQ&usqp=CAU'
          className='w-full h-full'
        ></img>
      </div>
      <p className='text-lg text-center w-full px-4 truncate max-w-[130px] 4xl:max-w-[260px]'>
        WeiChen LinWeiChen Lin
      </p>
      <MenuItem
        Icon={CiHome}
        name='首頁'
        handleRoute={() => handleRoute('/home')}
      />
      <MenuItem
        Icon={CiShare2}
        name='分享'
        handleRoute={() => handleRoute('/share')}
      />
      <MenuItem
        Icon={CiSettings}
        name='設定'
        handleRoute={() => handleRoute('/setting')}
      />
      <div className='border-t-[1px] border-gray-300/40 w-full'></div>
      <MenuItem Icon={CiCloudOn} name='儲存空間' />
      <meter className='w-full px-3' min='0' max='15' value='5'></meter>
      <p className='text-gray-500 text-sm text-left w-full px-3'>
        已使用 5 GB，共 15 GB
      </p>
      <div className='flex-1'></div>
      <MenuItem
        Icon={CiLogout}
        name='登出'
        handleRoute={() => handleRoute('/login')}
      />
      {isRouting && <Switcher />}
    </div>
  )
}

const MenuItem = (props: MenuItemProps) => {
  const { Icon, name, handleRoute } = props
  return (
    <div
      className='w-full py-2 flex justify-start items-center hover:bg-slate-200 hover:cursor-pointer'
      onClick={() => {
        if (handleRoute) {
          handleRoute()
        }
      }}
    >
      <Icon className='w-7 h-7 mx-3' />
      <span className=''>{name}</span>
    </div>
  )
}

const Switcher = () => {
  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-slate-300 z-10 opacity-60'>
      <div
        className='absolute top-0 left-0 w-screen h-screen bg-slate-700'
        style={{ animation: 'top_to_bottom 5s forwards ease' }}
      ></div>
    </div>
  )
}
