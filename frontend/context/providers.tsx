import { useEffect, useState } from 'react'
import { getUserInfo, useFetch } from 'api/'
import { KushareAuth } from './contexts'

export interface User {
  user_id: string
  email: string
  user_name: string
  login_method: string
  avatar_url: string
}

interface TokenCheckerProps {
  token: string | null
  current: string | null
  children: JSX.Element
}

export const KushareAuthProvider = (props: { children: JSX.Element }) => {
  const { children } = props

  const handlerError = () => {
    localStorage.clear()
    // Router.push('/login')
  }

  const { data, isLoading, refresh } = useFetch<any, User>(getUserInfo, {
    onError: handlerError,
    needInitialRun: true,
  })

  const [user, setUser] = useState<User | null>(null)

  const handleUser = (key: keyof User, data: string) => {
    setUser(prev => {
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
      setUser(data)
    }
  }, [data])

  return (
    <KushareAuth.Provider
      value={{
        user,
        isAuth: isLoading,
        handleUser,
      }}
    >
      {children}
    </KushareAuth.Provider>
  )
}
