import { useState, useEffect } from 'react'
import axios from 'axios'
import { APIS } from 'api/apis'
import Router from 'next/router'

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      Router.push('/login')
      return
    }
    axios
      .get(
        `${process.env.NEXT_PUBLIC_BACKEND_PROTOCOL}://${process.env.NEXT_PUBLIC_BACKEND_HOST}:${process.env.NEXT_PUBLIC_BACKEND_PORT}${APIS.AUTH}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      .then((res) => {
        if (res.data?.token) {
          localStorage.setItem('accessToken', res?.data?.token)
        }
        setIsAuth(true)
      })
      .catch(() => {
        localStorage.removeItem('accessToken')
        Router.push('/login')
      })
  }, [])

  return { isAuth }
}
