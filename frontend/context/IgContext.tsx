import { createContext, useState, useEffect } from 'react'
import { Loading } from 'components/utils'
import Router from 'next/router'
import axios from 'axios'
import { useHints, Action, Hint } from 'hooks/disk'

export interface User {
  user_id: string
  email: string
  user_name: string
  login_method: string
  avatar_url: string
}

interface IgType {
  userProfile?: User
  handleUserProfile: (key: keyof User, value: any) => void
  isAuth: boolean
  current: string | undefined
  hints: Hint[]
  handleHints: (status: Action, message: string) => void
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

  const [isAuth, setIsAuth] = useState(false)
  const { hints, AddHints } = useHints()

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

  const handleUserProfile = (key: keyof User, value: any) => {
    setUserProfile((prev) => {
      if (prev) {
        return { ...prev, [key]: value }
      } else {
        return undefined
      }
    })
  }

  const handleHints = (status: Action, message: string) => {
    AddHints(message, status)
  }

  return isAuth ? (
    <IgContext.Provider
      value={{
        userProfile,
        handleUserProfile,
        isAuth,
        current,
        hints,
        handleHints,
      }}
    >
      {children}
    </IgContext.Provider>
  ) : null
}
