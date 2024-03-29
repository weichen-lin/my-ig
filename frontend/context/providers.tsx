import { useEffect, useState } from 'react'
import { getUserInfo, useFetch } from 'api/'
import { KushareAuth, User } from './contexts'
import Router from 'next/router'
import { Loading } from 'components/utils'

export const KushareAuthProvider = (props: { children: JSX.Element }) => {
  const { children } = props

  const handlerError = () => {
    localStorage.clear()
    Router.push('/login')
  }

  const { data, isLoading } = useFetch<any, User>(getUserInfo, {
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
      {data ? children : <Loading />}
    </KushareAuth.Provider>
  )
}
