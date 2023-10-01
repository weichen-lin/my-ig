import { createContext, useEffect, useState, useContext } from 'react'
import Router from 'next/router'
import { useHints, Action, Hint } from 'hooks/disk'
import { getUserInfo, useFetch } from 'api/'

export interface User {
  user_id: string
  email: string
  user_name: string
  login_method: string
  avatar_url: string
}

interface AuthContextType {
  userProfile: User | null
  refresh: () => void
  isAuth: boolean
  hints: Hint[]
  handleHints: (status: Action, message: string) => void
  handleUserProfile: (key: keyof User, data: string) => void
}

interface TokenCheckerProps {
  token: string | null
  current: string | null
  children: JSX.Element
}

export const IgContext = createContext<AuthContextType>({
  userProfile: null,
  refresh: () => {},
  isAuth: false,
  hints: [],
  handleHints: (status, message) => {},
  handleUserProfile: (key, data) => {},
})

export const IgProvider = (props: TokenCheckerProps) => {
  const { children } = props

  const handlerError = () => {
    localStorage.clear()
    Router.push('/login')
  }

  const { hints, AddHints } = useHints()

  const { data, isLoading, refresh } = useFetch<any, User>(getUserInfo, {
    onError: handlerError,
    needInitialRun: true,
  })

  const handleHints = (status: Action, message: string) => {
    AddHints(message, status)
  }

  const authCheck = data && !isLoading

  const [userProfile, setUserProfile] = useState<User | null>(null)

  const handleUserProfile = (key: keyof User, data: string) => {
    setUserProfile((prev) => {
      if (prev) {
        return {
          ...prev,
          [key]: data,
        }
      } else {
        return null
      }
    })
  }

  useEffect(() => {
    if (data) {
      setUserProfile(data)
    }
  }, [data])

  return (
    <IgContext.Provider
      value={{
        userProfile,
        refresh,
        isAuth: isLoading,
        hints,
        handleHints,
        handleUserProfile,
      }}
    >
      {authCheck && children}
    </IgContext.Provider>
  )
}

export default function useIgContext() {
  return useContext(IgContext)
}
