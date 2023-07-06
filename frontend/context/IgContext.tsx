import { createContext, useState, useEffect, useCallback } from 'react'
import Router from 'next/router'
import axios from 'axios'
import { useHints, Action, Hint } from 'hooks/disk'
import fetcher from 'api/fetcher'

export interface User {
  user_id: string
  email: string
  user_name: string
  login_method: string
  avatar_url: string
}

interface AuthContextType {
  userProfile?: User
  handleUserProfile: (key: keyof User, value: any) => void
  isAuth: boolean
  hints: Hint[]
  handleHints: (status: Action, message: string) => void
}

interface TokenCheckerProps {
  children: JSX.Element
  token: string | null
}

export const IgContext = createContext<AuthContextType>({
  userProfile: {
    user_id: '',
    email: '',
    user_name: '',
    login_method: '',
    avatar_url: '',
  },
  handleUserProfile: (key, value) => {},
  isAuth: false,
  hints: [],
  handleHints: (status, message) => {},
})

export const IgProvider = (props: TokenCheckerProps) => {
  const { children, token } = props
  const { hints, AddHints } = useHints()

  const [userProfile, setUserProfile] = useState<User>({
    user_id: '',
    email: '',
    user_name: '',
    login_method: '',
    avatar_url: '',
  })
  const [isAuth, setIsAuth] = useState(false)

  const handleUserProfile = (key: keyof User, value: any) => {
    setUserProfile((prev) => ({ ...prev, [key]: value }))
  }

  const handleHints = (status: Action, message: string) => {
    AddHints(message, status)
  }

  useEffect(() => {
    const authUser = async () => {
      if (!token) {
        return Router.push('/login')
      }

      try {
        const res = await axios.get('http://localhost:8080/user/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        if (res.status === 200) {
          setIsAuth(true)
          setUserProfile(res.data)
        }
      } catch {
        localStorage.clear()
        return Router.push('/login')
      }
    }

    authUser()
  }, [])

  return (
    <IgContext.Provider
      value={{
        userProfile,
        handleUserProfile,
        isAuth,
        hints,
        handleHints,
      }}
    >
      {children}
    </IgContext.Provider>
  )
}
