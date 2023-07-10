import { createContext } from 'react'
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
  refresh: () => {},
  isAuth: false,
  hints: [],
  handleHints: (status, message) => {},
})

export const IgProvider = (props: TokenCheckerProps) => {
  const { children, token } = props

  const { hints, AddHints } = useHints()

  const { data, isLoading, refresh } = useFetch<any, User>(getUserInfo, {
    onError: () => {
      localStorage.clear()
      Router.push('/login')
    },
    needInitialRun: true,
  })

  console.log(isLoading)

  const handleHints = (status: Action, message: string) => {
    AddHints(message, status)
  }

  return (
    <IgContext.Provider
      value={{
        userProfile: data,
        refresh,
        isAuth: isLoading,
        hints,
        handleHints,
      }}
    ></IgContext.Provider>
  )
}
