import { createContext, useState, useEffect } from 'react'
import { Loading } from 'components/utils'
import Router from 'next/router'
import axios from 'axios'

export interface User {
  user_id: string
  email: string
  user_name: string
  login_method: string
  avatar_url: string
}

interface IgType {
  userProfile?: User
  handleUserProfile: (user: User) => void
  isAuth: boolean
  currentMenu: string | undefined
}

interface TokenCheckerProps {
  children: JSX.Element
  token: string | null
  current: string
}

export const IgContext = createContext<IgType | null>(null)

export const IgProvider = (props: TokenCheckerProps) => {
  const { children, token, current } = props

  const [userProfile, setUserProfile] = useState<User | undefined>(undefined)
  const [currentMenu, setCurrentMenu] = useState<string | undefined>(current)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const authUser = () => {
      if (!token) {
        return Router.push('/login')
      }

      return axios
        .get('http://localhost:8080/user/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          setIsAuth(true)
          setUserProfile(res.data)
        })
        .catch(() => {
          Router.push('/login')
        })
    }
    authUser()
  }, [])

  const handleUserProfile = (user: User) => {
    setUserProfile(user)
  }

  return isAuth ? (
    <IgContext.Provider
      value={{ userProfile, handleUserProfile, isAuth, currentMenu }}
    >
      {children}
    </IgContext.Provider>
  ) : null
}
