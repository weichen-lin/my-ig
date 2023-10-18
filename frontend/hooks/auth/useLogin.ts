import { useState } from 'react'
import Router from 'next/router'
import { userLogin, AuthBody, useFetch } from 'api'

export default function useLogin() {
  const [loginInfo, setLoginInfo] = useState<AuthBody>({
    email: '',
    password: '',
  })
  const [successMsg, setSuccessMsg] = useState<string | null>('')

  const { error, isLoading, run } = useFetch(userLogin, {
    onSuccess: () => {
      setSuccessMsg('登入成功！')
      setTimeout(() => {
        Router.push('/home')
      }, 1500)
    },
  })

  const handleAuthInfo = (key: keyof AuthBody, value: string) => {
    setLoginInfo(prev => ({ ...prev, [key]: value }))
  }

  const goRegister = () => {
    Router.push('register')
  }

  const btnDisabled = Object.values(loginInfo).some(e => e === '') || isLoading

  return {
    isRequest: isLoading,
    loginInfo,
    handleAuthInfo,
    error,
    run,
    successMsg,
    goRegister,
    btnDisabled,
  }
}
