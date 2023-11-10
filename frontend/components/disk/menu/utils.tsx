import { useState, useCallback, useContext } from 'react'
import Router, { useRouter } from 'next/router'
import clsx from 'clsx'
import fetcher from 'api/fetcher'
import { KushareAuth } from 'context'
import { Icon } from '@iconify/react'
import { uploadAvatar, useFetch } from 'api'

export interface MenuItemProps {
  IconName: string
  name: string
  handleRoute?: () => void
  current?: boolean
}

const tokenName = process.env.NEXT_PUBLIC_COOKIE_NAME

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
  const { IconName, name, handleRoute, current } = props
  return handleRoute ? (
    <div
      className={clsx(
        'w-[97.5%] py-2 flex justify-start items-center',
        `${current ? 'w-[100%] border-r-4 border-blue-500 pl-[1.25%]' : 'hover:bg-slate-200 hover:cursor-pointer'}`,
      )}
      onClick={handleRoute}
    >
      <Icon icon={IconName} className='w-7 h-7 mx-3' />
      <span className={`${current ? 'text-blue-500' : ''}`}>{name}</span>
    </div>
  ) : (
    <div className='w-[97.5%] py-2 flex justify-start items-center'>
      <Icon icon={IconName} className='w-7 h-7 mx-3' />
      <span className='select-none'>{name}</span>
    </div>
  )
}

export const Menu = () => {
  const [isRouting, setIsRouting] = useState(false)
  const { user, isAuth, handleUser } = useContext(KushareAuth)
  const { run } = useFetch(uploadAvatar, {
    onSuccess: res => {
      handleUser('avatarUrl', res)
    },
  })
  const router = useRouter()

  const MenuRouting = useCallback(
    (menu: { pathname: string }) => {
      router.events.on('routeChangeStart', () => {
        setIsRouting(true)
      })

      router.events.on('routeChangeComplete', () => {
        setIsRouting(false)
      })
      router.push(`${menu.pathname}`)

      router.events.off('routeChangeStart', () => {
        setIsRouting(true)
      })

      router.events.off('routeChangeComplete', () => {
        setIsRouting(false)
      })
    },
    [router],
  )

  const router_split = router.pathname.split('/')

  const current = router_split.length > 1 ? router_split[1] : ''

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
              formData.append('file', file, file.name)
              formData.append('test', 'test')
              run(formData)
            }
            img.onerror = e => {
              console.log(e)
            }
          }
        }),
      )
    } catch (e) {
      console.log('cancel select')
    }
  }

  const handleLogout = async () => {
    try {
      fetcher.delete('/user/logout', { withCredentials: true }).then(() => {
        localStorage.removeItem(tokenName || 'token')
        Router.push('login')
      })
    } catch {
      Router.push('login')
    }
  }

  const Menus = [
    {
      IconName: 'ic:round-home',
      name: '首頁',
      pathname: 'home',
    },
    {
      IconName: 'ic:twotone-share',
      name: '分享',
      pathname: 'share',
    },
    {
      IconName: 'ic:baseline-settings',
      name: '設定',
      pathname: 'setting',
    },
  ]

  console.log({ user })

  const Avatar = () => {
    return (
      <div className='flex flex-col items-center gap-y-4'>
        <div className='overflow-hidden w-24 h-24 rounded-full border-2 flex items-center justify-center'>
          {user && user.avatarUrl ? (
            <img src={user?.avatarUrl} className='rounded-full' alt='avatar'></img>
          ) : (
            <Icon icon='pixelarticons:user' className='w-16 h-16' />
          )}
        </div>
        <p className='text-lg text-center w-full px-4 truncate max-w-[180px] 4xl:max-w-[260px]'>
          {user?.name ?? <span className='text-gray-400 text-sm select-none'>未設定使用者名稱</span>}
        </p>
        <div className='relative w-[100px] h-16 mx-auto'>
          <button
            className={clsx(
              'w-full absolute top-0 left-0 enabled:active:top-1 rounded-md',
              'border border-gray-100 bg-blue-100 p-1 px-4 shadow-md',
              'flex items-center justify-center gap-x-2 cursor-pointer',
              'disabled:opacity-50 disabled:cursor-not-allowed',
            )}
            onClick={e => {
              e.preventDefault()
              handleFileUpload(false)
            }}
            disabled={!user?.isValidate}
          >
            <Icon icon='ic:outline-upload-file' className='w-5 h-5' />
            <span className='text-gray-600 font-medium'>上傳</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {!isAuth ? <Avatar /> : <MenuBackbone />}
      <div className='border-t-[1px] border-gray-300/40 w-full'></div>
      {Menus.map(menu => (
        <MenuItem
          IconName={menu.IconName}
          name={menu.name}
          handleRoute={() => {
            if (menu.pathname !== current) {
              MenuRouting(menu)
            }
          }}
          current={menu.pathname === current}
          key={`menu_${menu.name}`}
        />
      ))}
      <div className='border-t-[1px] border-gray-300/40 w-full'></div>
      <MenuItem IconName='ic:baseline-cloud' name='儲存空間' />
      {!isAuth && (
        <>
          <meter className='w-full px-3' min='0' max='15' value='5'></meter>
          <p className='text-gray-500 text-sm text-left w-full px-3 select-none'>已使用 5 GB，共 15 GB</p>
        </>
      )}
      <div className='flex-1'></div>
      <MenuItem IconName='ic:outline-logout' name='登出' handleRoute={handleLogout} />
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
