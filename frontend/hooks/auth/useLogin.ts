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
  const [isError, setIsError] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const handleAuthInfo = (key: keyof LoginBody, value: string) => {
    setLoginInfo((prev) => ({ ...prev, [key]: value }))
  }

  const checkLoginInfo = (req: LoginBody) => {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    if (!emailRegex.test(req.email)) {
      setIsError(true)
      setErrMsg(AuthErrorMsgs.LOGIN_INVALID)
      return false
    }

    if (!req.password || !req.email) {
      setIsError(true)
      setErrMsg(AuthErrorMsgs.LOGIN_INVALID)
      return false
    }
    return true
  }

  const resetError = useCallback(() => {
    setIsError(false)
    setErrMsg('')
  }, [])

  const handleLogin = (req: LoginBody) => {
    setIsRequest(true)

    if (!checkLoginInfo(req)) {
      setIsRequest(false)
      return
    }

    resetError()

    axios
      .post(APIS.USER_LOGIN, {
        email: req.email,
        password: req.password,
      })
      .then((res) => {
        resetError()
        setIsSuccess(true)
        setSuccessMsg('登入成功')
        const data = res.data
        if (data.token) localStorage.setItem('accessToken', data.token)
        setTimeout(() => {
          Router.push('/')
        }, 1500)
      })
      .catch(() => {
        setIsError(true)
        setErrMsg(AuthErrorMsgs.LOGIN_INVALID)
      })

    setIsRequest(false)
  }

  const goRegister = () => {
    Router.push('register')
  }

  return {
    isRequest,
    loginInfo,
    handleAuthInfo,
    isError,
    errMsg,
    handleLogin,
    isSuccess,
    successMsg,
    goRegister,
  }
}
