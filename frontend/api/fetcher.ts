import axios, { InternalAxiosRequestConfig } from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const fetcher = axios.create({ baseURL: baseURL })

fetcher.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const tokenName = process.env.NEXT_PUBLIC_COOKIE_NAME
  if (!tokenName) {
    return Promise.reject('No Cookie Name!')
  }

  const accessToken = localStorage.getItem(tokenName)

  if (accessToken && config.url !== '/user/auth') {
    config.headers.Authorization = accessToken
    return config
  }

  if (!accessToken) {
    try {
      const res = await axios.get(`${baseURL}/user/auth`, {
        withCredentials: true,
      })

      const accessToken = res.data

      localStorage.setItem(tokenName, accessToken)
      config.headers.Authorization = accessToken
      return config
    } catch {
      return Promise.reject('Authorized Failed!')
    }
  }

  return config
})

export default fetcher
