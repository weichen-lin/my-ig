import axios, { InternalAxiosRequestConfig } from 'axios'

import { APIS } from 'api/apis'

const fetcher = axios.create({ baseURL: 'http://localhost:8080' })

fetcher.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken && config.url !== APIS.AUTH) {
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  }

  if (!accessToken) {
    try {
      const res = await axios.get(`http://localhost:8080${APIS.AUTH}`, {
        withCredentials: true,
      })

      const accessToken = res.data.token
      localStorage.setItem('accessToken', accessToken)
      config.headers.Authorization = `Bearer ${accessToken}`
      return config
    } catch {
      return Promise.reject('Authorized Failed!')
    }
  }

  return config
})

export default fetcher
