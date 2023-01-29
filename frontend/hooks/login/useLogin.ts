import { useState } from 'react'
import fetcher from 'api/fetcher'

export default function useLogin() {
  const [error, setError] = useState(false)
  const [errorMsg, setErrMsg] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  fetcher
    .get('auth')
    .then((e) => e)
    .catch((e) => e)

  return { error, isLogin }
}
