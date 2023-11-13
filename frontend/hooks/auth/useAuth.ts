import { useState, useEffect } from 'react'
import axios from 'axios'
import Router from 'next/router'

interface AuthProps {
  token: string | null
  needRouting: boolean
}

const authUserUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/user/info`

export default function useAuth(props: AuthProps) {
  const { token, needRouting } = props
  const [checkAuth, setCheckAuth] = useState(false)

  useEffect(() => {
    const authUser = async () => {
      if (!token) {
        needRouting && Router.push('/login')
        setCheckAuth(true)
        return
      }

      try {
        const res = await axios.get(authUserUrl, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        })

        if (res.status === 200) {
          Router.push('/home')
        }
      } catch {
        localStorage.clear()
        needRouting ? Router.push('/login') : setCheckAuth(true)
      }
    }
    authUser()
  }, [])

  return { checkAuth }
}
