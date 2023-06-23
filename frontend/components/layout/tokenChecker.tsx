import { Loading } from 'components/utils'
import Router from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function LayoutCheckToken(props: {
  token: string | null
  children: JSX.Element
}) {
  const { token, children } = props
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
        .then(() => {
          setIsAuth(true)
        })
        .catch(() => {
          Router.push('/login')
        })
    }
    authUser()
  }, [])

  return isAuth ? children : <Loading />
}
