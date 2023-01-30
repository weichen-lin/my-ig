import { useState } from 'react'

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(false)

  setTimeout(() => {
    setIsAuth(true)
  }, 2000)
  return { isAuth }
}
