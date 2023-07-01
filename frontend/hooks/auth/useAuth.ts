import { useState, useEffect } from 'react'
import axios from 'axios'
import { APIS } from 'api/apis'
import Router from 'next/router'

export default function useAuth(token: string) {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const authUser = () => {
      if (!token) {
        Router.push('/login')
        return
      }

      return axios
        .get('http://localhost:8080/user/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((e) => Router.push('/home'))
        .catch((e) => Router.push('/login'))
    }
    authUser()
  }, [])

  return { isAuth }
}
