import { useEffect, useState } from 'react'
import Router from 'next/router'
import { useHints, Action } from 'hooks/disk'
import { getUserInfo, useFetch } from 'api/'
import { IgContext, User } from './contexts'

interface KushareRootProps {
  token: string | null
  current: string | null
  children: JSX.Element
}

export const IgProvider = (props: KushareRootProps) => {
  const { children } = props

  const handlerError = () => {
    localStorage.clear()
    // Router.push('/login')
  }

  const { AddHints } = useHints()

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
        handleHints,
        handleUserProfile,
      }}
    >
      {authCheck && children}
    </IgContext.Provider>
  )
}
