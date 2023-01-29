import { useState } from 'react'

export default function useLogin() {
  const [error, setError] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
}
