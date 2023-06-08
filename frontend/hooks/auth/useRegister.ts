import { useState, useCallback } from 'react'
import axios from 'axios'
import { APIS } from 'api/apis'
import Router from 'next/router'
import { RegisterResponse, RegisterStatus } from 'api/errors'

export type RegisterKeys = 'email' | 'password'

export interface RegisterBody extends Record<RegisterKeys, string> {
  email: string
  password: string
}

export default function useRegister() {
  const [isRequest, setIsRequest] = useState(false)
  const [registerInfo, setRegisterInfo] = useState<RegisterBody>({
    email: '',
    password: '',
  })
  const [emailError, setEmailError] = useState(false)
  const [pwdError, setPwdError] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const handleRegisterInfo = (key: keyof RegisterBody, value: string) => {
    setRegisterInfo((prev) => ({ ...prev, [key]: value }))
  }

  const checkRegisterInfo = (req: RegisterBody) => {
    const emailRegex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    if (!emailRegex.test(req.email)) {
      setEmailError(true)
      setErrMsg('email 格式錯誤')
      return false
    }

    if (!req.password) {
      setPwdError(true)
      setErrMsg('請填寫密碼')
      return false
    }

    return true
  }

  const resetError = useCallback(() => {
    setEmailError(false)
    setPwdError(false)
    setErrMsg('')
  }, [])

  const handleRegister = (req: RegisterBody) => {
    setIsRequest(true)

    if (!checkRegisterInfo(req)) {
      setIsRequest(false)
      return
    }

    resetError()

    axios
      .post(APIS.USER_REGISTER, {
        email: req.email,
        password: req.password,
      })
      .then((res) => {
        resetError()
        setIsSuccess(true)
        setSuccessMsg('註冊成功')
        const data = res.data
        if (data.token) localStorage.setItem('accessToken', data.token)
        setTimeout(() => {
          Router.push('/')
        }, 1500)
      })
      .catch((err) => {
        const status = err?.response?.data?.status as RegisterStatus
        if (status) {
          setEmailError(true)
          setPwdError(true)
          setErrMsg(RegisterResponse[status])
        }
      })

    setIsRequest(false)
  }

  const goLogin = () => Router.push('login')

  return {
    isRequest,
    registerInfo,
    handleRegisterInfo,
    emailError,
    pwdError,
    errMsg,
    handleRegister,
    isSuccess,
    successMsg,
    goLogin,
  }
}
