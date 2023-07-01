import { useState, useCallback } from 'react'
import axios from 'axios'
import { APIS } from 'api/apis'
import Router from 'next/router'
import { PwdValidate } from './utils'

export type RegisterKeys = 'email' | 'password'

export interface RegisterBody extends Record<RegisterKeys, string> {
  email: string
  password: string
}

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export default function useRegister() {
  const [isRequest, setIsRequest] = useState(false)
  const [registerInfo, setRegisterInfo] = useState<RegisterBody>({
    email: '',
    password: '',
  })
  const [errMsg, setErrMsg] = useState<null | string>(null)
  const [successMsg, setSuccessMsg] = useState<null | string>(null)

  const handleRegisterInfo = (key: keyof RegisterBody, value: string) => {
    setRegisterInfo((prev) => ({ ...prev, [key]: value }))
  }

  const resetStatus = useCallback(() => {
    setErrMsg(null)
    setSuccessMsg(null)
    setIsRequest(false)
  }, [])

  const goLogin = () => Router.push('login')

  const validateEmail = useCallback((email: string) => {
    return emailRegex.test(email)
  }, [])

  const validatePwd = useCallback((value: string) => {
    const results = PwdValidate(value)
    return results.every((e) => e)
  }, [])

  const checkRegisterInfo = (req: RegisterBody) => {
    if (!validateEmail(req.email) || !validatePwd(req.password)) {
      return false
    }
    return true
  }

  const handleRegister = () => {
    setIsRequest(true)

    if (!checkRegisterInfo(registerInfo)) {
      resetStatus()
      setErrMsg('Email 或密碼輸入格式有誤')
      return
    }

    axios
      .post(
        `http://localhost:8080${APIS.USER_REGISTER}`,
        {
          email: registerInfo.email,
          password: registerInfo.password,
        },
        {
          withCredentials: true,
        }
      )
      .then(() => {
        resetStatus()
        setSuccessMsg('註冊成功')
        setTimeout(() => {
          Router.push('/home')
        }, 1500)
      })
      .catch((err) => {
        resetStatus()
        if (axios.isAxiosError(err)) {
          const msg = err.response?.data
          setErrMsg(msg)
        } else {
          setErrMsg('發生未知錯誤，請聯繫開發人員')
        }
      })
  }

  const btnDisabled = !checkRegisterInfo(registerInfo) || isRequest

  return {
    isRequest,
    registerInfo,
    handleRegisterInfo,
    errMsg,
    handleRegister,
    successMsg,
    goLogin,
    btnDisabled,
    validateEmail,
    validatePwd,
  }
}
