import { useState, useCallback } from 'react'
import Router from 'next/router'
import { userLogin, LoginBody, useFetch } from 'api'

export default function useLogin() {
  const [loginInfo, setLoginInfo] = useState<LoginBody>({
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

  const handleAuthInfo = (key: keyof LoginBody, value: string) => {
    setLoginInfo((prev) => ({ ...prev, [key]: value }))
  }

  const goRegister = () => {
    Router.push('register')
  }

  const btnDisabled = Object.values(loginInfo).some((e) => e === '') || isLoading

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
