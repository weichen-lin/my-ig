import { useState, useCallback } from 'react'
import axios from 'axios'
import Router from 'next/router'
import { PwdValidate } from './utils'
import { useFetch } from 'hooks/utils'
import { register } from 'api/apis'

export type RegisterKeys = 'email' | 'password'

export interface RegisterBody extends Record<RegisterKeys, string> {
  email: string
  password: string
}

const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

export default function useRegister() {
  const [registerInfo, setRegisterInfo] = useState<RegisterBody>({
    email: '',
    password: '',
  })
  const [successMsg, setSuccessMsg] = useState<null | string>(null)

  const { isLoading, error, run } = useFetch(register, {
    onSuccess: () => {
      setSuccessMsg('註冊成功')
      setTimeout(() => {
        Router.push('/home')
      }, 1000)
    },
  })

  const handleRegisterInfo = (key: keyof RegisterBody, value: string) => {
    setRegisterInfo((prev) => ({ ...prev, [key]: value }))
  }

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

  const btnDisabled = !checkRegisterInfo(registerInfo) || isLoading

  return {
    isRequest: isLoading,
    registerInfo,
    handleRegisterInfo,
    error,
    run,
    successMsg,
    goLogin,
    btnDisabled,
    validateEmail,
    validatePwd,
  }
}
