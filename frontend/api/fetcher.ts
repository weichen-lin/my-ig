import Router from 'next/router'

import axios, { InternalAxiosRequestConfig } from 'axios'

import { APIS } from 'api/apis'

const fethcher = axios.create({ baseURL: 'http://localhost:8080' })

fethcher.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken')

  if (accessToken && config.url !== APIS.AUTH) {
    config.headers!.Authorization = `Bearer ${accessToken}`
    return config
  }

  return config
})

export default fethcher
