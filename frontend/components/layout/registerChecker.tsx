import Router from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function RegisterChecker(props: {
  token: string | null
  children: JSX.Element
}) {
  const { token, children } = props
  const [checkLogin, setCheckLogin] = useState(false)

  useEffect(() => {
    const checkIsLogin = async () => {
      return axios
        .get('http://localhost:8080/user/userinfo', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          Router.push('/home')
        })
        .catch(() => {
          setCheckLogin(true)
        })
    }
    checkIsLogin()
  }, [])

  return checkLogin ? children : null
}
