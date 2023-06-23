import { useState, useCallback } from 'react'
import axios from 'axios'
import { APIS, AuthErrorMsgs } from 'api/apis'
import Router from 'next/router'

export type LoginKeys = 'email' | 'password'

export interface LoginBody extends Record<LoginKeys, string> {
  email: string
  password: string
}

export default function useLogin() {
  const [isRequest, setIsRequest] = useState(false)
  const [loginInfo, setLoginInfo] = useState<LoginBody>({
    email: '',
    password: '',
  })
  const [errMsg, setErrMsg] = useState<string | null>('')
  const [successMsg, setSuccessMsg] = useState<string | null>('')

  const handleAuthInfo = (key: keyof LoginBody, value: string) => {
    setLoginInfo((prev) => ({ ...prev, [key]: value }))
  }

  const resetError = useCallback(() => {
    setErrMsg('')
  }, [])

  const handleLogin = (req: LoginBody) => {
    setIsRequest(true)
    resetError()

    axios
      .post(`http://localhost:8080${APIS.USER_LOGIN}`, loginInfo)
      .then((e) => {
        setSuccessMsg('登入成功！')
        setTimeout(() => {
          Router.push('/home')
        }, 1500)
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          const msg = err.response?.data
          setErrMsg(msg)
        } else {
          setErrMsg('發生未知錯誤，請聯繫開發人員')
        }
      })
      .finally(() => setIsRequest(false))
  }

  const goRegister = () => {
    Router.push('register')
  }

  const btnDisabled =
    Object.values(loginInfo).some((e) => e === '') || isRequest

  return {
    isRequest,
    loginInfo,
    handleAuthInfo,
    errMsg,
    handleLogin,
    successMsg,
    goRegister,
    btnDisabled,
  }
}
