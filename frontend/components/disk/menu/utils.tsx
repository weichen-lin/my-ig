import { IconType } from 'react-icons'
import { CiHome, CiShare2, CiSettings, CiCloudOn, CiLogout } from 'react-icons/ci'
import { useState, useContext, useEffect, memo } from 'react'
import Router, { useRouter } from 'next/router'
import { IgContext } from 'context'
import clsx from 'clsx'
import { MdUploadFile } from 'react-icons/md'
import fetcher from 'api/fetcher'

export interface MenuItemProps {
  Icon: IconType
  name: string
  handleRoute?: () => void
  current?: boolean
}

export const Switcher = () => {
  return (
    <div className='absolute top-0 left-0 w-screen h-screen bg-slate-300 z-10 opacity-60'>
      <div
        className='absolute top-0 left-0 w-screen h-screen bg-slate-700'
        style={{ animation: 'top_to_bottom 3s forwards ease' }}
      ></div>
    </div>
  )
}

export const MenuItem = (props: MenuItemProps) => {
  const { Icon, name, handleRoute, current } = props
  return handleRoute ? (
    <div
      className={clsx(
        'w-[97.5%] py-2 flex justify-start items-center',
        `${current ? 'w-[100%] border-r-4 border-blue-500 pl-[1.25%]' : 'hover:bg-slate-200 hover:cursor-pointer'}`
      )}
      onClick={handleRoute}
    >
      <Icon className='w-7 h-7 mx-3' fill={`${current ? '#3B82F6' : ''}`} />
      <span className={`${current ? 'text-blue-500' : ''}`}>{name}</span>
    </div>
  ) : (
    <div className='w-[97.5%] py-2 flex justify-start items-center'>
      <Icon className='w-7 h-7 mx-3' />
      <span className='select-none'>{name}</span>
    </div>
  )
}

export const Menu = () => {
  const [isRouting, setIsRouting] = useState(false)

  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setIsRouting(true)
    })

    router.events.on('routeChangeComplete', () => {
      setIsRouting(false)
    })
  }, [])

  const router_split = router.pathname.split('/')

  const current = router_split.length > 1 ? router_split[1] : ''

  const kushareContext = useContext(IgContext)

  const { refresh, handleHints, userProfile, isAuth } = kushareContext

  const handleFileUpload = async (multiple: boolean) => {
    try {
      const FileHandlers = await window?.showOpenFilePicker({
        multiple: multiple,
      })

      await Promise.all(
        FileHandlers.map(async (filehandle, index) => {
          const file = await filehandle.getFile()

          const imgReader = new FileReader()
          imgReader.readAsDataURL(file)
          imgReader.onloadend = () => {
            const img = new Image()
            img.src = imgReader.result as string
            img.onload = () => {
              const formData = new FormData()
              formData.append('myfile', file, file.name)
              fetcher
                .post('http://localhost:8080/file', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                })
                .then(() => {
                  refresh()
                  handleHints('success', '上傳成功')
                })
                .catch((err) => console.log(err))
            }
            img.onerror = (e) => {
              kushareContext?.handleHints('success', '上傳格式錯誤')
            }
          }
        })
      )
    } catch (e) {
      console.log('cancel select')
    }
  }

  const handleLogout = async () => {
    try {
      fetcher.delete('/user/logout', { withCredentials: true }).then(() => {
        localStorage.removeItem('accessToken')
        Router.push('login')
      })
    } catch {}
  }

  const Menus = [
    {
      Icon: CiHome,
      name: '首頁',
      pathname: 'home',
    },
    {
      Icon: CiShare2,
      name: '分享',
      pathname: 'share',
    },
    {
      Icon: CiSettings,
      name: '設定',
      pathname: 'setting',
    },
  ]

  const Avatar = () => {
    return (
      <div className='flex flex-col items-center gap-y-4'>
        <div className='overflow-hidden w-24 h-24'>
          <img src={userProfile?.avatar_url} className='w-full h-full rounded-full border-2'></img>
        </div>
        <p className='text-lg text-center w-full px-4 truncate max-w-[180px] 4xl:max-w-[260px]'>
          {userProfile?.user_name ?? <span className='text-gray-400 text-sm select-none'>未設定使用者名稱</span>}
        </p>
        <div className='relative w-[100px] h-16 mx-auto'>
          <div
            className='w-full absolute top-0 left-0 active:top-1 rounded-md border border-gray-100 bg-blue-100 p-1 px-4 shadow-md'
            onClick={(e) => {
              e.preventDefault()
              handleFileUpload(false)
            }}
          >
            <div className='flex items-center gap-2 cursor-pointer'>
              <MdUploadFile className='w-6 h-6 ' />
              <span className='text-gray-600 font-medium'>上傳</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {!isAuth ? <Avatar /> : <MenuBackbone />}
      <div className='border-t-[1px] border-gray-300/40 w-full'></div>
      {Menus.map((menu) => (
        <MenuItem
          Icon={menu.Icon}
          name={menu.name}
          handleRoute={() => {
            if (menu.pathname !== current) {
              Router.push(`${menu.pathname}`)
            }
          }}
          current={menu.pathname === current}
          key={`menu_${menu.name}`}
        />
      ))}
      <div className='border-t-[1px] border-gray-300/40 w-full'></div>
      <MenuItem Icon={CiCloudOn} name='儲存空間' />
      {kushareContext?.isAuth && (
        <>
          <meter className='w-full px-3' min='0' max='15' value='5'></meter>
          <p className='text-gray-500 text-sm text-left w-full px-3 select-none'>已使用 5 GB，共 15 GB</p>
        </>
      )}
      <div className='flex-1'></div>
      <MenuItem Icon={CiLogout} name='登出' handleRoute={handleLogout} />
      {isRouting && <Switcher />}
    </>
  )
}

const MenuBackbone = () => {
  return (
    <>
      <div className='rounded-full overflow-hidden w-24 h-24'>
        <div className='w-24 h-24 bg-slate-200 animate-pulse'></div>
      </div>
      <div className='w-[70%] h-8 animate-pulse bg-slate-200 my-2 rounded-xl'></div>
    </>
  )
}
