import { useState, useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router'

interface AuthProps {
  token: string | null
  needRouting: boolean
}

export default function useAuth(props: AuthProps) {
  const { token, needRouting } = props
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const authUser = () => {
      if (!token) {
        needRouting && Router.push('/login')
        setIsAuth(true)
        return
      }

      return axios
        .get('http://localhost:8080/user/userinfo', {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })
        .then((e) => Router.push('/home'))
        .catch((e) => {
          localStorage.clear()
          needRouting && Router.push('/login')
        })
    }
    authUser()
  }, [])

  return { isAuth }
}
